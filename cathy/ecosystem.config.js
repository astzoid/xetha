module.exports = {
  apps: [{
    name: "xetha-backend",
    script: "./dist/src/",
    env: {
      NODE_ENV: "production"
    },
  }],
};