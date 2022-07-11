const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movie_genre', {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'genre',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'movie_genre',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "movie_genre_pkey",
        unique: true,
        fields: [
          { name: "movie_id" },
          { name: "genre_id" },
        ]
      },
    ]
  });
};
