const express = require("express")
const morganBody = require("morgan-body")
const bodyParser = require("body-parser")

const PdfGenerator = require("./services/pdf-generator")

const FROM_DATE = "2020-05-01"
const TO_DATE = "2020-06-01"

const ACCOUNT_STATEMENT = {
  fromDate: new Date(FROM_DATE).toISOString(),
  toDate: new Date(TO_DATE).toISOString(),
  account: {
    holderName: "Joe Doe",
    iban: "IBAN",
    bic: "BIC",
    openingBalance: 0,
    closingBalance: 0,
    moneyOut: 10000,
    moneyIn: 10000,
    holderAddress: {
      line1: "Boulevard 10",
      line2: "1000 Bruxelles",
      line3: "Belgium",
    },
  },
  operations: [
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Joe Doe",
      },
      moneyOut: 1200,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Joe Doe",
      },
      moneyOut: undefined,
      moneyIn: 9000,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Amazon",
      },
      moneyOut: 1800,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Jack Sparrow",
        iban: "IBAN",
      },
      moneyOut: 5000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Tom Jerry",
      },
      moneyOut: undefined,
      moneyIn: 1000,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
    },
    {
      date: "2023-04-27T10:40:26.096Z",
      counterparty: {
        name: "Olivier",
      },
      moneyOut: 2000,
      moneyIn: undefined,
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
async function generatePdf() {
  const pdfGenerator = new PdfGenerator()
  await pdfGenerator.generate({ accountStatement: ACCOUNT_STATEMENT })
}

generatePdf()

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
