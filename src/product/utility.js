const randomstring = require('randomstring');

const generateProductId = async() => {
    return `prd-${randomstring.generate({
        capitalization : 'lowercase',
        charset        : 'alphabetic',
        length         : 10,
        readable       : true,
    })}`;
}

module.exports = {
    generateProductId
}