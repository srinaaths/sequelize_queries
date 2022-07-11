const Sequelize = require('sequelize')
const Hapi = require('hapi')

const mockData = require('./MOCK_DATA.json')

const {getAllUsers} = require('./controllers.js')
const routes = require('./routes.js')

const {fetchAllActors, q1, q2} = require('./index3.js')

const sequelize = new Sequelize('seq-queries', 'srinaaths', '', {
	dialect: 'postgres'
})

const User = sequelize.define('user', {
	id: {
		type: Sequelize.DataTypes.INTEGER,
		primaryKey: true
	},
	first_name: {
		type: Sequelize.DataTypes.STRING
	},
	last_name: {
		type: Sequelize.DataTypes.STRING
	}
}, {
	freezeTableName: true,
	timestamps: false
})

sequelize.sync()
.then((data) => {
	return User.bulkCreate(mockData)
})
.then((data) => {
	console.log('success')
})
.catch(err => console.log(err))

const server = new Hapi.Server();

server.connection({
	port: 8080
})

server.start(err => {
	if(err)
		throw err
	console.log('server started')
})

server.route(routes)

const getUsers = (req, reply) => {
	reply(User.findAll({
		where: {
			id: 5
		},
		attributes: ['first_name', 'last_name']
	}))
}

server.route([{
	method: 'GET',
	path: '/get',
	handler: fetchAllActors
}, {
	method: 'GET',
	path: '/q1',
	handler: q1
}, {
	method: 'GET',
	path: '/q2/{name}',
	handler: q2
}])

module.exports = {User}