// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({ target: 'http://localhost:3001' });
const path = require('path');

/** @type {import('snowpack').SnowpackUserConfig} */
module.exports = {
  mount: {
    public: {
      url: '/',
      static: true,
    },
    src: {
      url: '/dist',
    },
    [path.resolve(__dirname, '../shared/rest')]: '/shared/rest',
    [path.resolve(__dirname, '../shared/types')]: '/shared/types',
  },
  alias: {
    '@shared/rest': '../shared/rest/src',
    '@shared/types': '../shared/types/src',
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
      src: '/api/.*',
      dest: (req, res) => {
        proxy.web(req, res);
      },
    },
    {
      match: "routes",
      src: ".*",
      dest: "/index.html",
    },
  ]
};
