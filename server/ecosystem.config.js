module.exports = {
    apps: [
      {
        name: "backend",
        exec_mode: "cluster",
        instances: "1",
        script: "./src/index.js",
        args: "start"
      },
    ],
  };