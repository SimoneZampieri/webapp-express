const express = require("express");
const app = express();
const port = env.PORT || 3000;

//middlewares
const errorsHandler = require("./middlewares/errorHand");
const notFound = require("./middlewares/notFound");

//parsing body
app.use(express.json());

app.listen(port, () => {
  console.log(`In ascolto sulla porta ${port}`);
});

//rotta 1
app.get("/", (req, res) => {
  res.send("Lista Film");
});

app.use(errorsHandler);
app.use(notFound);
