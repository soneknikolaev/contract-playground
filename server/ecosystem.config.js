module.exports = {
    apps: [
      {
        name: "backend",
        exec_mode: "cluster",
        instances: "1",
        script: "./src/index.js",
        args: "start",
        env: {
            CLIENT_URL: 'https://d1x4lavaosasmn.cloudfront.net'
        },
      },
    ],
  };