const BeancountNsApp = require('./app')
const Config = require('./config/config.json')
const port = 3001

BeancountNsApp(Config, port);
