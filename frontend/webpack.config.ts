import path from 'path';
import {BuildWebpackConfig} from './config/build/buildWebpackConfig';
import {BuildMode, BuildPaths} from './config/build/types/config';

// export default config;
export default () => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  const mode = process.env.MODE as BuildMode || 'development';
  const PORT = Number(process.env.PORT) || 3000;

  const isDev = mode === 'development';

  return BuildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
  });
};
