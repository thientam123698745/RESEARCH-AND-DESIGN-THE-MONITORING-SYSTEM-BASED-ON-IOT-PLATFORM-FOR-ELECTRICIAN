module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@common': './src/components/common',
          '@assets': './src/assets',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@types': './src/types',
          src: './src',
        },
      },
    ],
  ],
};
