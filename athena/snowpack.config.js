// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

const httpProxy = require('http-proxy');
const path = require('path');

/** @type {import('snowpack').SnowpackUserConfig} */
module.exports = {
  workspaceRoot: path.join(path.resolve(__dirname), '..'),
  mount: {
    public: {
      url: '/',
      static: true,
    },
    src: {
      url: '/dist',
    },
  },
  alias: {
    "@auth": "./src/auth",
    "@components": "./src/components",
    "@functions": "./src/functions",
    "@hooks": "./src/hooks",
    "@pages": "./src/pages",
    "@routes": "./src/routes",
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    ['@snowpack/plugin-webpack', {
      outputPattern: {
        assets: 'static/assets/[name].[contenthash:8].[ext]',
        css: 'static/css/[name].[contenthash:8].css',
        js: 'static/js/[name].[contenthash:8].js',
      }
    }],
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 3000
  },
  buildOptions: {
    out: 'dist',
  },
  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/index.html",
    },
  ]
};
