const randomstring = require('randomstring');

const generateCategoryId = async() => {
    return `cat-${randomstring.generate({
        capitalization : 'lowercase',
        charset        : 'alphabetic',
        length         : 10,
        readable       : true,
    })}`;
}

module.exports = {
    generateCategoryId
}