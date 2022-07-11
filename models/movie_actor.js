const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movie_actor', {
    actor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'actor',
        key: 'id'
      }
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movie_actor',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "movie_actor_pkey",
        unique: true,
        fields: [
          { name: "actor_id" },
          { name: "movie_id" },
        ]
      },
    ]
  });
};
