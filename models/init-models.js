var DataTypes = require("sequelize").DataTypes;
var _aereolineas = require("./aereolineas");
var _beneficios = require("./beneficios");
var _clases = require("./clases");
var _familiastarifarias = require("./familiastarifarias");
var _familiastarifarias_beneficios = require("./familiastarifarias_beneficios");
var _familiastarifarias_clases = require("./familiastarifarias_clases");
var _proveedores = require("./proveedores");
var _proveedores_aereolineas = require("./proveedores_aereolineas");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var aereolineas = _aereolineas(sequelize, DataTypes);
  var beneficios = _beneficios(sequelize, DataTypes);
  var clases = _clases(sequelize, DataTypes);
  var familiastarifarias = _familiastarifarias(sequelize, DataTypes);
  var familiastarifarias_beneficios = _familiastarifarias_beneficios(sequelize, DataTypes);
  var familiastarifarias_clases = _familiastarifarias_clases(sequelize, DataTypes);
  var proveedores = _proveedores(sequelize, DataTypes);
  var proveedores_aereolineas = _proveedores_aereolineas(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  aereolineas.belongsToMany(proveedores, { as: 'codigo_proveedor_proveedores', through: proveedores_aereolineas, foreignKey: "codigo_aerolinea", otherKey: "codigo_proveedor" });
  beneficios.belongsToMany(familiastarifarias, { as: 'id_familiastarifarias_familiastarifaria', through: familiastarifarias_beneficios, foreignKey: "id_beneficios", otherKey: "id_familiastarifarias" });
  clases.belongsToMany(familiastarifarias, { as: 'id_familiastarifarias_familiastarifarias_familiastarifarias_clases', through: familiastarifarias_clases, foreignKey: "codigo_clases", otherKey: "id_familiastarifarias" });
  familiastarifarias.belongsToMany(beneficios, { as: 'id_beneficios_beneficios', through: familiastarifarias_beneficios, foreignKey: "id_familiastarifarias", otherKey: "id_beneficios" });
  familiastarifarias.belongsToMany(clases, { as: 'codigo_clases_clases', through: familiastarifarias_clases, foreignKey: "id_familiastarifarias", otherKey: "codigo_clases" });
  proveedores.belongsToMany(aereolineas, { as: 'codigo_aerolinea_aereolineas', through: proveedores_aereolineas, foreignKey: "codigo_proveedor", otherKey: "codigo_aerolinea" });
  familiastarifarias.belongsTo(aereolineas, { as: "codigo_aereolinea_aereolinea", foreignKey: "codigo_aereolinea"});
  aereolineas.hasMany(familiastarifarias, { as: "familiastarifaria", foreignKey: "codigo_aereolinea"});
  proveedores_aereolineas.belongsTo(aereolineas, { as: "codigo_aerolinea_aereolinea", foreignKey: "codigo_aerolinea"});
  aereolineas.hasMany(proveedores_aereolineas, { as: "proveedores_aereolineas", foreignKey: "codigo_aerolinea"});
  familiastarifarias_beneficios.belongsTo(beneficios, { as: "id_beneficios_beneficio", foreignKey: "id_beneficios"});
  beneficios.hasMany(familiastarifarias_beneficios, { as: "familiastarifarias_beneficios", foreignKey: "id_beneficios"});
  familiastarifarias_clases.belongsTo(clases, { as: "codigo_clases_clase", foreignKey: "codigo_clases"});
  clases.hasMany(familiastarifarias_clases, { as: "familiastarifarias_clases", foreignKey: "codigo_clases"});
  familiastarifarias_beneficios.belongsTo(familiastarifarias, { as: "id_familiastarifarias_familiastarifaria", foreignKey: "id_familiastarifarias"});
  familiastarifarias.hasMany(familiastarifarias_beneficios, { as: "familiastarifarias_beneficios", foreignKey: "id_familiastarifarias"});
  familiastarifarias_clases.belongsTo(familiastarifarias, { as: "id_familiastarifarias_familiastarifaria", foreignKey: "id_familiastarifarias"});
  familiastarifarias.hasMany(familiastarifarias_clases, { as: "familiastarifarias_clases", foreignKey: "id_familiastarifarias"});
  proveedores_aereolineas.belongsTo(proveedores, { as: "codigo_proveedor_proveedore", foreignKey: "codigo_proveedor"});
  proveedores.hasMany(proveedores_aereolineas, { as: "proveedores_aereolineas", foreignKey: "codigo_proveedor"});
  aereolineas.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(aereolineas, { as: "aereolineas", foreignKey: "id_usuario"});
  beneficios.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(beneficios, { as: "beneficios", foreignKey: "id_usuario"});
  clases.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(clases, { as: "clases", foreignKey: "id_usuario"});
  familiastarifarias.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(familiastarifarias, { as: "familiastarifaria", foreignKey: "id_usuario"});
  familiastarifarias_beneficios.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(familiastarifarias_beneficios, { as: "familiastarifarias_beneficios", foreignKey: "id_usuario"});
  familiastarifarias_clases.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(familiastarifarias_clases, { as: "familiastarifarias_clases", foreignKey: "id_usuario"});
  proveedores.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(proveedores, { as: "proveedores", foreignKey: "id_usuario"});
  proveedores_aereolineas.belongsTo(usuario, { as: "id_usuario_usuario", foreignKey: "id_usuario"});
  usuario.hasMany(proveedores_aereolineas, { as: "proveedores_aereolineas", foreignKey: "id_usuario"});

  return {
    aereolineas,
    beneficios,
    clases,
    familiastarifarias,
    familiastarifarias_beneficios,
    familiastarifarias_clases,
    proveedores,
    proveedores_aereolineas,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
