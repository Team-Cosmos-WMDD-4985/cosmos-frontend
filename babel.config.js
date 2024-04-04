module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // If you have other plugins, they go here
      'react-native-reanimated/plugin', // Add this line at the end
    ],
  };
};
