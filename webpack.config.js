// setup entry point and output file dir
// load required node function
const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
// note: change css extract and minimizer to latest components
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// console.log(path.join(__dirname, 'public'));
module.exports = (env) => {
    const isProduction = env === 'production';

    console.log('env', env);
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
            }]

        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: 'styles.css',
                chunkFilename: 'chunk.css',
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                // `...`
                new CssMinimizerPlugin(),
            ],
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    };
};
