require('utils.js')

if (file_exists('./config.js'))
	require('./config.js')

PORT             = 3000
DOMAIN           = 'localhost'
SERVER_SECRET    = '12345678abcdef'

