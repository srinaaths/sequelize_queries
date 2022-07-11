const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('genre', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'genre',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "genre_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
