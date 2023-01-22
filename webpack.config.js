const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js',
        catalog: './catalog.js',
        admin: './admin.js',
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot: true,
        static: {
            directory: './dist',
            watch: true
        }
    }
};

// Start work
// module.exports = {
//     context: path.resolve(__dirname, 'src'),
//     entry: './index.js',
//     output: {
//         filename: './js/main.js',
//         path: path.resolve(__dirname, 'dist')
//     },
//     devServer: {
//         hot: true,
//         static: {
//             directory: './dist',
//             watch: true
//         }
//     }
// };