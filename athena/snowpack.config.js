// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

const httpProxy = require('http-proxy');
const SubresourceIntegrity = require('webpack-subresource-integrity');
const proxy = httpProxy.createServer({ target: 'http://localhost:3001' });

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
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    ['@snowpack/plugin-webpack', {
      /**
       * 
       * @param {import('webpack').Configuration} config 
       * @returns 
       */
      extendConfig: (config) => {
        config.plugins.push(new SubresourceIntegrity({ enabled: true, hashFuncNames: ['sha384'] }));
        config.output.crossOriginLoading = 'anonymous';
        return config;
      },
      sourceMap: false,
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
  ],
};
