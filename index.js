const express = require("express")
const morgan = require("morgan")
const morganBody = require("morgan-body")
const bodyParser = require("body-parser")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const notifications = require("./routes/notifications")
const app = express()
app.use(bodyParser.json())

morganBody(app)

app.get("/", function (req, res) {
  res.send("Hello World!")
})

app.use("/notifications", notifications)

app.post("/upload", upload.none(), (req, res) => {
  res.sendStatus(200)
})

app.listen(3000, "0.0.0.0", function () {
  console.log("Listening to Port 3000")
})
