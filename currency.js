const http = require('http');

// Get a list of currencies
function getCurrencies() {
    const currencies = http.get('http://api.fixer.io/latest', (response) => {
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

module.exports.getCurrencies = getCurrencies;

// Get currency rates against a base

// Get an exact currency change 1:1