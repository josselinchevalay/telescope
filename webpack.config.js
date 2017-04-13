const Path = require('path');
const app = Path.join(__dirname, 'app');
const test = Path.join(__dirname, 'test');
const dist = Path.join(__dirname, 'dist');

module.exports = {
    entry: `${app}/**/*.js`,

    output: {
        filename: 'bundle.js',
        path: dist,
    },
};