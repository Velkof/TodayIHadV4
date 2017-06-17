module.exports = {
    app: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 9000,
        isProduction: process.env.NODE_ENV === 'production',
        publicPath: process.env.PUBLIC_PATH || __dirname + '../../public',
    }
};