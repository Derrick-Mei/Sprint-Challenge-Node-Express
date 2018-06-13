const express = require("express");
const cors = require("cors");
const server = express();

//import subroutes
const actionRoutes = require("./action");
const projectRoutes = require("./project");

server.use(express.json());
server.use(cors());

//Where to use subroutes
server.use("/actions", actionRoutes);
server.use("/projects", projectRoutes);

//Basic GET
server.get("/", (req, res) => {
    res.send("Welcome to Derrick's Node Sprint Server");
});

const port = 5002;
server.listen(port, () => {
    return console.log(`\nDerrick's server running on port ${port}\n`);
});
