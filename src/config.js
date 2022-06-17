const config = {
  production: {
    APIKEY: 'BlouCpJnyIhWDwteO6mYyS4iIOV8scGsxtE3dDYZ7S'
  },
  default: {
    APIKEY: 'BlouCpJnyIhWDwteO6mYyS4iIOV8scGsxtE3dDYZ7S',
  },
};

export default function getConf(env) {
  return config[env] || config.default;
};
