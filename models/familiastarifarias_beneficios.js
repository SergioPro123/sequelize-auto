const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('familiastarifarias_beneficios', {
    id_familiastarifarias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'familiastarifarias',
        key: 'id_familiastarifarias'
      }
    },
    id_beneficios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'beneficios',
        key: 'id_beneficios'
      }
    },
    descripcion: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: "A"
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    incluido: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    tableName: 'familiastarifarias_beneficios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_familiastarifarias" },
          { name: "id_beneficios" },
        ]
      },
      {
        name: "id_beneficios",
        using: "BTREE",
        fields: [
          { name: "id_beneficios" },
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
