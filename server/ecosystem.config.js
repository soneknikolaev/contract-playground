module.exports = {
    apps: [
      {
        name: "backend",
        exec_mode: "cluster",
        instances: "1",
        script: "./src/index.js",
        args: "start",
        env: {
            API_KEY: 'MHV3WSMMH9B23IDC3P441E1ZUHUV5PXMIK', 
            CLIENT_URL: 'https://d1x4lavaosasmn.cloudfront.net'
        },
      },
    ],
  };