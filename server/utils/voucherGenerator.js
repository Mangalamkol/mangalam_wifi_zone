const randomstring = require('randomstring');

exports.generate = () => {
    return randomstring.generate({
        length: 10,
        charset: 'alphanumeric',
        capitalization: 'uppercase'
    });
};