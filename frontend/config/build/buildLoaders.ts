import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
      },
      {
        loader: 'file-loader',
      },
    ],
    type: 'javascript/auto',
    issuer: {
      and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
    },
  };

  const cssLoader = {
    test: /\.css$/,
    use: [
      "style-loader",
      "css-loader"
    ],
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          compilerOptions: {noEmit: false},
        }
      }
    ],
    exclude: /node_modules/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2|woff|otf)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  return [fileLoader, svgLoader, typescriptLoader, cssLoader];
}
