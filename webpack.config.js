const path = require('path');

class CustomResolverPlugin {
  _isAbsoluteOrRelativePath(request) {
    return request.startsWith("/") || request.startsWith("./") || request.startsWith("..");
  }

  apply(resolver) {
    const hookToFireOnceFinished = resolver.ensureHook("resolve");

    resolver
      .getHook("resolve")
      .tapAsync("NpmResolverPlugin", (resolveRequest, resolveContext, callback) => {
        debugger
        const { request, pathAlreadyResolved } = resolveRequest;

        if (this._isAbsoluteOrRelativePath(request) || pathAlreadyResolved) {
          callback();

          return;
        }

        try {
            const modulePath = path.join(__dirname, 'external_modules', 'current_version_start', request, 'current_version_end', request);
            resolver.doResolve(
              hookToFireOnceFinished,
              { ...resolveRequest, path: modulePath, request, pathAlreadyResolved:true },
              null,
              resolveContext,
              callback
            );
        } catch {
          callback();
        }
      });
  }
}

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'webworker',
  resolve:{
    extensions: ['.js', '.jsx', '.json', '.jsw', '.w.js'],
    plugins: [new CustomResolverPlugin()],
  },
  devtool: false,
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};