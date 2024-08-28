const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const BookmarkController = require("./controller/bookmarkcontroller");

app.use(express.json()); // 
app.use(express.urlencoded({ extended: true })); // 

app.use(cors());

app.use("/", BookmarkController);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});