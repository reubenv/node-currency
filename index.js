const argv = require('yargs').argv
const currency = require('./currency');

if (argv.currencies) {
    currency.getCurrencies();
};

if (argv.from && argv.to) {
    currency.exchangeRate(argv.from, argv.to);
};