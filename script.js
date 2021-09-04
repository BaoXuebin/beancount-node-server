#!/usr/bin/env node
const { Command } = require('commander');
const BeancountNsApp = require('./app');
const Config = require('./config/config.json')

const port = 3001
const program = new Command();

// options
program
  .version('1.1.0', '-v, --version')
  .option('-p, --port [type]', `beancount-ns port [${port}]`)
  .option('-dp, --dataPath [type]', `config dataPath [${Config.dataPath}]`)
  .option('-c, --operatingCurrency [type]', `config operatingCurrency [${Config.operatingCurrency}]`)
  .option('-d, --startDate [type]', `config startDate [${Config.startDate}]`)
  .option('-b, --isBak [type]', `config isBak [${Config.isBak}]`)
  .parse(process.argv);

// npm script
program
  .command('start')
  .description('start beancount-ns');

program
  .command('config')
  .description('show default config')
  .action(() => {
    console.log(JSON.stringify(Config))
  });

const options = program.opts();
if (options.isBak) {
  options.isBak = JSON.parse(options.isBak)
}

BeancountNsApp(Object.assign(Config, options), options.port || port)