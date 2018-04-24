module.exports = {
	app: {
		port: '8001',
		nonSecurePort: '8000',
		domain: 'localhost',
		mode: 'http'
	},
	database: {
		url: 'mongodb://192.168.23.185:27017/emailmakertingdb'
	},
	environment: {
		env: 'development'
	},
	mailconfig : {
		service: 'gmail',
	    auth: {
	        user: '',
	        pass: ''
	    }
	},
	recaptcha : {
		sitekey : '',
		secretkey: ''
	},
	noThreads: '2',
	libreoffice: 'libreoffice',
	ssl: {
		privateKey: '',
		certificate: '',
	}
}