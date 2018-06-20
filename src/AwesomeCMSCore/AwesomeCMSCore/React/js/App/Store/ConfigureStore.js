if (process.env.NODE_ENV === 'production') {
    module.exports = import('./ConfigureStore.Prod');
} else {
    module.exports = import('./ConfigureStore.Dev');
}