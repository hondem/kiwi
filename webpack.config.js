module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output:{
        path: __dirname,
        filename: 'dist/js/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: './',
    }
};
