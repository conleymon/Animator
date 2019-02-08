
module.exports = {
    name: 'client',
    target: 'web',
    resolve: {
      modules: [
        './',
        './node_modules',
        './src_modules',
        './src',
        './src/js',
        './src/css',
        './tests',
      ],
      extensions: [ '.tsx', '.ts', '.js', '.jsx','css','scss' ]
    },
    entry: ['./src/animator.js'],
    output: {
      path: __dirname+'/dist/js/',
      filename: 'app_build.js'
    },

    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use:[
            {
              loader:'babel-loader',
              options: {
                presets: ['react','env']
              }
            },
          ],
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          exclude: [/node_modules/],
          loaders:['style-loader','css-loader','postcss-loader','sass-loader'],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'url-loader',
          options:{
            limit:10000
          }
        }
      ]
    },
    watch:true,
  }
  