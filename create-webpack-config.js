const path = require('path');
const merge = require('webpack-merge');
const { uniq, get } = require('lodash');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config, { dev }) => merge(config, {
  devtool: dev ? 'inline-source-map' : 'source-map',
  module: merge(config.module, {
    rules: (get(config, 'module.rules', [])).concat([
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: { symbolId: !dev ? '[hash:8]' : '[name]-[hash:8]' },
          },
          'svgo-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          (dev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
          }),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: !dev
                  ? '[hash:base64:16]'
                  : '[folder]__[local]--[hash:base64:8]',
                auto: true,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './',
              },
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          (dev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
          }),
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './',
              },
            },
          },
        ],
        exclude: /\.module\.css$/,
      },
    ]),
  }),
  resolve: merge((get(config, 'config.resolve', {})), {
    extensions: uniq(get(config, 'resolve.extensions', []).concat(['.tsx', '.ts', '.js', '.json'])),
    alias: merge(get(config, 'resolve.alias', {}), {
      containers: path.resolve(__dirname, './src/containers'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      src: path.resolve(__dirname, './src'),
    }),
  }),
  plugins: get(config, 'plugins', []).concat([
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, './tsconfig.json'),
      },
      eslint: {
        enabled: true,
        files: '../src/**/*.ts*',
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]),
});
