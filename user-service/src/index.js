const { app, startDependencies } = require("./app");

const PORT = process.env.port || 3000;

async function startServer() {
  await startDependencies()
  this.server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer()