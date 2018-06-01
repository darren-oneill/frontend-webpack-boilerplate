const ExtractTextPlugin = require('extract-text-webpack-plugin'); // For use with LESS/CSS
const autoprefixer = require('autoprefixer'); // PostCSS plugin

module.exports = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: 'dist/main.js'
  },
  module: {
    rules: [
      // JS rules go here
      // Use Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // LESS rules go here
      // Use the loader to compile LESS to CSS
      // Need to use Extract Text Plugin here because Webpack
      // only understands JS. This extracts the CSS
      // and converts it to a .css text file
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [autoprefixer('last 10 version')]
              }
            },
            {
              loader: "less-loader"
            },
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css'
    })
  ]
};