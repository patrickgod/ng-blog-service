const express = require("express");
const cors = require("cors");
const sql = require("./sql");
const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
    origin: ["http://localhost:4200", "http://localhost:4000"]
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(8000, () => {
    console.log("Server is started and listening.");
    sql.init();
});

app.get("/", function(request, response) {
    response.send("Hello Node.js! :)");
});

require("./articles.js")(app, sql);
require("./dashboard.js")(app, sql);