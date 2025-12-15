module.exports = {
  apps: [
    {
      name: "mangalam-server",
      script: "index.js",
      cwd: "./server",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 18000
      }
    }
  ]
}