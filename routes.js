const {getAllUsers} = require('./controllers.js')

module.exports = [
	{
		method: 'GET',
		path: '/',
		handler: getAllUsers
	}
]