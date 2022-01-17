module.exports = {
  webpackDevMiddleware: (config) => {
    //   Poll files every 300ms in the project directory to update
    config.watchOptions.poll = 300;
    return config;
  },
};
