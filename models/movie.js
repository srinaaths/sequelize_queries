const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movie', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    director_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'director',
        key: 'id'
      }
    },
    country_of_origin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movie',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "movie_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
