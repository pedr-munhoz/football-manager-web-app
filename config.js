const configs = {
  development: {
    apiBaseUrl: 'http://localhost:8090',
  },
};

const nodeEnv = process.env.NODE_ENV;

module.exports = configs[nodeEnv];
