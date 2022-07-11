const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rating', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rating',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rating_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
