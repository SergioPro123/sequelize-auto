const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('familiastarifarias', {
    id_familiastarifarias: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo_aereolinea: {
      type: DataTypes.STRING(3),
      allowNull: false,
      references: {
        model: 'aereolineas',
        key: 'codigo_aereolinea'
      }
    },
    codigo_proveedor: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    codigo_interno: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: "A"
    },
    fecha_insercion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_usuario'
      }
    }
  }, {
    sequelize,
    tableName: 'familiastarifarias',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_familiastarifarias" },
        ]
      },
      {
        name: "id_usuario",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
      {
        name: "codigo_aereolinea",
        using: "BTREE",
        fields: [
          { name: "codigo_aereolinea" },
        ]
      },
    ]
  });
};
