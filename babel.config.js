module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // plugins: [
    //   'my-custom-babel-plugin',
    // ],
  };
};
