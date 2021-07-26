const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('familiastarifarias_clases', {
    codigo_clases: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'clases',
        key: 'codigo_clases'
      }
    },
    id_familiastarifarias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'familiastarifarias',
        key: 'id_familiastarifarias'
      }
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
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'familiastarifarias_clases',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigo_clases" },
          { name: "id_familiastarifarias" },
        ]
      },
      {
        name: "id_familiastarifarias",
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
    ]
  });
};
