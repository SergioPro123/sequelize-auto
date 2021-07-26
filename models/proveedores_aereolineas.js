const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proveedores_aereolineas', {
    codigo_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'proveedores',
        key: 'codigo_proveedor'
      }
    },
    codigo_aerolinea: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'aereolineas',
        key: 'codigo_aereolinea'
      }
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
    tableName: 'proveedores_aereolineas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigo_proveedor" },
          { name: "codigo_aerolinea" },
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
        name: "codigo_aerolinea",
        using: "BTREE",
        fields: [
          { name: "codigo_aerolinea" },
        ]
      },
    ]
  });
};
