const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        game: path.resolve(__dirname, 'src/js/game.js'),
        index: path.resolve(__dirname, 'src/js/index.js'),
        gameOver: path.resolve(__dirname, 'src/js/gameOver.js')
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name][contenthash].js',
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public/'),
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        watchFiles: ['src/**/*'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource', // Modern Webpack feature
                generator: {
                    filename: 'assets/[name][contenthash][ext]', // Custom output path
                },
            },
            {
                test: /\.mp3$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]', // Output file naming
                            outputPath: 'assets/', // Directory for sound files
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['game'],
            filename: 'game.html',
            template: './src/game.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
            chunks: ['gameOver'],
            filename: 'gameOver.html',
            template: './src/gameOver.html'
        })
    ],
};
