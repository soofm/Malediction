const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const commonConfig = () => ({
  module: {
    rules: [
      {
        test: /\.ts(x?)?$/,
        use: 'ts-loader',
        include: /src/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
})

const mainConfig = {
  ...commonConfig(),
  entry: { main: './src/main' },
  target: 'electron-main'
}

const preloadConfig = {
  ...commonConfig(),
  entry: { preload: './src/preload' },
  target: 'electron-preload'
}

const rendererConfig = {
  ...commonConfig(),
  entry: {
    renderer: './src/renderer/index.tsx'
  },
  target: 'electron-renderer',
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          chunks: 'initial',
          name: 'react',
          test: /react/
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/assets/index.html'
    }),
    new CopyPlugin({
      patterns: [{ from: './src/assets/*.css', flatten: true }]
    })
  ]
}

module.exports = [mainConfig, preloadConfig, rendererConfig]
