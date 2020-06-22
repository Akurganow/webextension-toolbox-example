module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 3,
      features: {
        'nesting-rules': true,
        'autoprefixer': true,
      },
    }),
    require('cssnano')({
      preset: ['default', { discardComments: { removeAll: true } }],
    }),
  ],
}
