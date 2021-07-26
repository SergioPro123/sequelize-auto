"use strict"
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json');
const models = {}
const exportOrder = {}

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync('models')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && (file !== 'index.js');
  })
  .forEach(file => {
      if(file.toString() != "init-models.js"){
        const model = require(path.join(__dirname,'./models', file))(sequelize, Sequelize);
    
        console.log("*******",model.name)
        models[model.name] = model;
      }
    
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);

  // Z here means current timezone, _not_ UTC
  // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

var jsgraphs = require('js-graph-algorithms');
var g = new jsgraphs.DiGraph(Object.keys(models).length); 

var node1  = -1

Object.keys(models).forEach(model => {
    node1++;
    console.log(model)
    g.node(node1).label = models[model].tableName;
    let attributes = models[model].tableAttributes;

    for(let column in attributes) {
        delete attributes[column].Model;
        delete attributes[column].fieldName;
        delete attributes[column].field;
        for(let property in attributes[column]) {
            if(property.startsWith('_')) {
                delete attributes[column][property];
            }
        }

        if(typeof attributes[column]['type'] !== 'undefined') {

            if(typeof attributes[column]['type']['options'] !== 'undefined' && typeof attributes[column]['type']['options'].toString === 'function') {
                attributes[column]['type']['options'] = attributes[column]['type']['options'].toString(sequelize);
            }

            if(typeof attributes[column]['type'].toString === 'function') {
                attributes[column]['type'] = attributes[column]['type'].toString(sequelize);
            }

        }
        if(typeof attributes[column]['references'] !== 'undefined') {
            var refModel = attributes[column]['references'].model
            var node2 = Object.keys(models).indexOf(refModel.tableName)
            g.addEdge(node1, node2)
            console.log(`Model associated with other model: ${refModel.tableName}`)
        }

    }

    let dbschema = JSON.stringify(attributes, null, 4);
    let tableName = models[model].tableName;
    let indexes = ['\n'];

    console.log(models)

    if(models[model].options.indexes && models[model].options.indexes.length) {

        models[model].options.indexes.forEach((obj) => {

            indexes.push('        .then(() => {');
            indexes.push('            return queryInterface.addIndex(');
            indexes.push(`                '${tableName}',`);
            indexes.push(`                ['${obj.fields.join("','")}']`);

            let opts = {};
            if(obj.name) {
                opts.indexName = obj.name;
            }
            if(obj.unique === true) {
                opts.indicesType = 'UNIQUE';
            }
            if(obj.method === true) {
                opts.indexType = obj.method;
            }
            if(Object.keys(opts).length) {
                indexes.push(`                , ${JSON.stringify(opts)}`)
            }

            indexes.push('            )');
            indexes.push('        })');

        });

    }

    dbschema = dbschema.split('\n').map((line) => '            ' + line).join('\n');

    let template = `'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('${tableName}', ${dbschema},
        {
          schema: '${models[model]._schema}'
        })${indexes.join('\n')}
        
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable({tableName: '${tableName}', schema: '${models[model]._schema}'});
    }
};`
    exportOrder[node1] = {tableName: models[model].tableName, template: template}

});

var ts = new jsgraphs.TopologicalSort(g);
 
var order = ts.order().reverse();
console.log(order);

order.forEach((item, index) => {
    let exporter = exportOrder[item]
    let d = new Date();
    let index_pad = String(index).padStart(3, '0')
    let filename = [d.getFullYear(), d.getMonth()+1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((num) => num <= 60 && (num + 100).toString().substring(1) || num)
    .join('') + `-${index_pad}-${exporter.tableName}`;
    
    fs.writeFileSync(`./migrations/generated/${filename}.js`, exporter.template);    
});