const app = require("./app");
const config = require("./app/config");

//start server
const PORT = config.app.port;
app.Listen(PORT, () => {
    console.log(`Server is running on port $(PORT), `);
});