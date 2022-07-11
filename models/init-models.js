var DataTypes = require("sequelize").DataTypes;
var _actor = require("./actor");
var _director = require("./director");
var _genre = require("./genre");
var _movie = require("./movie");
var _movie_actor = require("./movie_actor");
var _movie_genre = require("./movie_genre");
var _rating = require("./rating");

function initModels(sequelize) {
  var actor = _actor(sequelize, DataTypes);
  var director = _director(sequelize, DataTypes);
  var genre = _genre(sequelize, DataTypes);
  var movie = _movie(sequelize, DataTypes);
  var movie_actor = _movie_actor(sequelize, DataTypes);
  var movie_genre = _movie_genre(sequelize, DataTypes);
  var rating = _rating(sequelize, DataTypes);

  actor.belongsToMany(movie, { as: 'movie_id_movies', through: movie_actor, foreignKey: "actor_id", otherKey: "movie_id" });
  genre.belongsToMany(movie, { as: 'movie_id_movie_movie_genres', through: movie_genre, foreignKey: "genre_id", otherKey: "movie_id" });
  movie.belongsToMany(actor, { as: 'actor_id_actors', through: movie_actor, foreignKey: "movie_id", otherKey: "actor_id" });
  movie.belongsToMany(genre, { as: 'genre_id_genres', through: movie_genre, foreignKey: "movie_id", otherKey: "genre_id" });
  movie_actor.belongsTo(actor, { as: "actor", foreignKey: "actor_id"});
  actor.hasMany(movie_actor, { as: "movie_actors", foreignKey: "actor_id"});
  movie.belongsTo(director, { as: "director", foreignKey: "director_id"});
  director.hasMany(movie, { as: "movies", foreignKey: "director_id"});
  movie_genre.belongsTo(genre, { as: "genre", foreignKey: "genre_id"});
  genre.hasMany(movie_genre, { as: "movie_genres", foreignKey: "genre_id"});
  movie_actor.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(movie_actor, { as: "movie_actors", foreignKey: "movie_id"});
  movie_genre.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(movie_genre, { as: "movie_genres", foreignKey: "movie_id"});
  rating.belongsTo(movie, { as: "movie", foreignKey: "movie_id"});
  movie.hasMany(rating, { as: "ratings", foreignKey: "movie_id"});

  return {
    actor,
    director,
    genre,
    movie,
    movie_actor,
    movie_genre,
    rating,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
