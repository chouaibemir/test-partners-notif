const express = require("express")
const morganBody = require("morgan-body")
const bodyParser = require("body-parser")

const PdfGenerator = require("./services/pdf-generator")

const invoiceData = {
  items: [
    {
      date: "27 Jul. 2022",
      description: "From Lord Services",
      quantity: 2,
      price: 3000,
      amount: 6000,
    },
    {
      date: "27 Jul. 2022",
      description: "To Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "From Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "From Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "USDC to EUR",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "Outgoing transfer fee",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "Manual order fee",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "Manual order fee",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "To Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "To Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "To Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "From Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "From Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "USDC to EUR",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "Outgoing transfer fee",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "Manual order fee",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "To Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "Manual order fee",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "To Lord Services",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "Outgoing Transfer fee",
      quantity: 1,
      price: 2000,
      amount: 2000,
    },
    {
      date: "27 Jul. 2022",
      description: "Manual order fee",
      quantity: 1,
      price: 50000,
      amount: 50000,
    },
  ],
  invoiceNumber: 1234,
  beneficiary: {
    name: "Lord Services SA",
    address: {
      line1: "455 Avenue du Professeur Etienne Antonelli",
      line2: "34070 Montpellier",
      line3: "France",
    },
    iban: "GB50 PAYR 0099 7500 2277 51",
    bic: "PAYRGB21XXX",
  },
}

const pdfGenerator = new PdfGenerator(invoiceData)
pdfGenerator.generate()

const notifications = require("./routes/notifications")
const app = express()
app.use(bodyParser.json())

morganBody(app)

app.get("/", function (req, res) {
  res.send("Hello World!")
})

app.use("/notifications", notifications)

app.listen(3000, "0.0.0.0", function () {
  console.log("Listening to Port 3000")
})
