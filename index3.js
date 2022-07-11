const Hapi = require('hapi')

const Sequelize = require('sequelize')
const { Op } = require('sequelize')
const actorModel = require('./models/actor.js')
const directorModel = require('./models/director.js')
const genreModel = require('./models/genre.js')
const movieModel = require('./models/movie.js')
const movie_actorModel = require('./models/movie_actor.js')
const movie_genreModel = require('./models/movie_genre.js')
const ratingModel = require('./models/rating.js')

const sequelize = new Sequelize('dup_db', 'srinaaths', '', {
	dialect: 'postgres'
})

const actor = actorModel(sequelize, Sequelize.DataTypes)
const director = directorModel(sequelize, Sequelize.DataTypes)
const genre = genreModel(sequelize, Sequelize.DataTypes)
const movie = movieModel(sequelize, Sequelize.DataTypes)
const movie_actor = movie_actorModel(sequelize, Sequelize.DataTypes)
const movie_genre = movie_genreModel(sequelize, Sequelize.DataTypes)
const rating = ratingModel(sequelize, Sequelize.DataTypes)

const init = () => {
	actor.belongsToMany(movie, { as: 'movie_id_movies', through: movie_actor, foreignKey: "actor_id", otherKey: "movie_id" });
	genre.belongsToMany(movie, { as: 'movie_id_movie_movie_genre', through: movie_genre, foreignKey: "genre_id", otherKey: "movie_id" });
	movie.belongsToMany(actor, { as: 'actor_id_actors', through: movie_actor, foreignKey: "movie_id", otherKey: "actor_id" });
	movie.belongsToMany(genre, { as: 'genre_id_genres', through: movie_genre, foreignKey: "movie_id", otherKey: "genre_id" });
	movie_actor.belongsTo(actor, { as: "actor", foreignKey: "actor_id" });
	actor.hasMany(movie_actor, { as: "movie_actors", foreignKey: "actor_id" });
	movie.belongsTo(director, { as: "director", foreignKey: "director_id" });
	director.hasMany(movie, { as: "movies", foreignKey: "director_id" });
	movie_genre.belongsTo(genre, { as: "genre", foreignKey: "genre_id" });
	genre.hasMany(movie_genre, { as: "movie_genre", foreignKey: "genre_id" });
	movie_actor.belongsTo(movie, { as: "movie", foreignKey: "movie_id" });
	movie.hasMany(movie_actor, { as: "movie_actors", foreignKey: "movie_id" });
	movie_genre.belongsTo(movie, { as: "movie", foreignKey: "movie_id" });
	movie.hasMany(movie_genre, { as: "movie_genre", foreignKey: "movie_id" });
	rating.belongsTo(movie, { as: "movie", foreignKey: "movie_id" });
	movie.hasMany(rating, { as: "ratings", foreignKey: "movie_id" });
}
init()

sequelize.sync()
	// .then(() => {
	// 	actor.findAll()
	// 	.then(data => {
	// 		data.forEach(ele => console.log(ele.toJSON()))
	// 	})
	// })
	.then(() => {
		movie.findAll({
			where: {
				director_id: 5
			},
			include: [{
				model: director,
				as: 'director',
				required: true,
				attributes: ['id']
			},
			{
				model: movie_genre,
				as: 'movie_genre',
				required: true,
				attributes: [],
				include: {
					model: genre,
					as: 'genre',
					attributes: ['name'],
					where: {
						name: 'Action'
					},
					attributes: ['name']
				}
			}],
			attributes: ['name']
		})
			.then((data) => {
				data.forEach(ele => console.log(ele.toJSON()))
			})
			.catch(err => console.log(err))
	})
	.catch(err => console.log(err))

const fetchAllActors = async (req, reply) => {
	try {
		const allActors = await actor.findAll();
		console.log(allActors)
		reply(allActors).code(200)
	}
	catch (err) {
		console.log(err)
	}
}

const q1 = async (req, reply) => {
	try {
		console.log('called')
		const data = await rating.findAll({
			attributes: ['movie_id', [sequelize.fn('AVG', sequelize.col('rating')), 'ratingggg']],
			include: [{
				attributes: ['name'],
				model: movie,
				as: 'movie',
				required: true,
			}],
			group: ['movie_id', 'movie.id'],
			order: [[sequelize.fn('AVG', sequelize.col('rating.rating')), 'DESC']]
		})
		reply(data);
	}
	catch (err) {
		console.log(err)
	}
}

const q2 = async (req, reply) => {
	const directorName = req.params.name;
	console.log(directorName)
	try {
		const data = movie.findAll({
			attributes: ['name', 'release_year'],
			include: {
				model: director,
				as: 'director',
				required: true,
				attributes: ['name'],
				where: {
					name: directorName
				}
			},
			where: {
				release_year: {
					[Op.and]: {
						[Op.gte]: 1995,
						[Op.lte]: 2015,
					}
				},
			}
		})
		reply(data)
	}
	catch (err) {
		console.log(err)
	}
}

const q3 = async (req, reply) => {
	const directorName = req.params.name;
	console.log(directorName)
	try {
		const data = await movie.findAll({
			attributes: ['name'],
			include: [{
				model: director,
				as: 'director',
				attributes: ['name'],
				where: {
					name: directorName
				}
			}, {
				model: movie_genre,
				as: 'movie_genre'
			},
			{
				model: genre,
				as: 'genre'
			}],
			group: ['genre.id']
		})
	}
	catch (err) {
		console.log(err)
	}
}

module.exports = { fetchAllActors, q1, q2, q3 }