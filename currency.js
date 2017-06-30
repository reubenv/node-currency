const http = require('http');
const url = 'http://api.fixer.io/latest'

// Get a list of currencies
function getCurrencies() {
    const currencies = http.get(url, (response) => {
        if (response.statusCode === 200) {
            let responseData = '';
            response.on('data', (chunk) => responseData += chunk);

            response.on('end', () => {
                let currencyData = JSON.parse(responseData);
                let currencyList = [];
                currencyList.push(currencyData.base);
                for (key in currencyData.rates) {
                    if (currencyData.rates.hasOwnProperty(key)) {
                        currencyList.push(key);
                    }
                };
                let currencyListString = currencyList.sort().join(', ');
                console.log(`You can view exchange rates for the following currencies: ${currencyListString}`);
            });
        } else {
            console.error = response.statusCode;
        }
    });
}

function getExchange(base = 'USD', target = 'EUR') {
    const exchange = http.get(`${url}?base=${base}&symbols=${target}`, (response) => {
        if (response.statusCode === 200) {
            let responseData = '';
            response.on('data', (chunk) => responseData += chunk);

            response.on('end', () => {
                let currencyData = JSON.parse(responseData);
                console.log(`The current exchange rate for one (1) ${currencyData.base} to ${target} is ${currencyData.rates[target]}`);
            });
        } else {
            console.error = response.statusCode;
        }
    });
};

module.exports.getCurrencies = getCurrencies;
module.exports.exchangeRate = getExchange;

// Get currency rates against a base

// Get an exact currency change 1:1