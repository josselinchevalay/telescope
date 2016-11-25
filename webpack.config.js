var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/app/index.ts",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['./dist']),
        new CopyWebpackPlugin([
            {from:'./src/main.js', to:'./'},
            {from:'./node_modules/react/dist/react.js', to:'./components/react/'},
            {from:'./node_modules/react-dom/dist/react-dom.js', to:'./components/react-dom/'},
            {from:'./bower_components/photon/dist/css/photon.min.css', to:'./components/photon/'},
            {from:'./bower_components/photon/dist/fonts/', to:'./components/fonts'},
            {from:'./node_modules/ipfs-api/dist/index.min.js', to:'./components/ipfs/'}
        ]),
        new HtmlWebpackPlugin({
            injects: ['./components/react/react.js', './components/react-dom/react-dom.js', './components/ipfs/index.min.js'],
            bundle: "./bundle.js",
            template: './src/index.ejs', // Load a custom template (ejs by default see the FAQ for details) 
        })
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "ipfs-api":"IpfsApi"
    },node:{
        "fs":"empty",
        "child_process":"empty",
        "ipfs-api":"empty"
    }
};