const PDFDocument = require("pdfkit/js/pdfkit")
const fs = require("fs")
const path = require("path")

const BOLD_FONT = "Helvetica-Bold"
const NORMAL_FONT = "Helvetica"

console.log("PDF_GENERATOR", PDFDocument)

class PdfGenerator {
  constructor() {
    this.startPositionY = 130
    const date = new Date()
    this.currentDate = {
      day: date.getDate(),
      month:
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : `0${date.getMonth() + 1}`,
      monthName: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
    }
  }

  generateHeaders({ doc }) {
    const logoWidth = 80
    doc
      .image("./assets/logo.png", doc.page.width - logoWidth - 50, 50, {
        width: logoWidth,
      })
      .fontSize(21)
      .text("EUR Statement", 50, 50, { align: "left" })
      .fontSize(10)
      .text(
        `Generated on ${this.currentDate.day} ${this.currentDate.monthName} ${this.currentDate.year}`,
        { align: "left" }
      )
      .text(`ELYPS SA`, { align: "left" })
  }

  generateAccountHolderDetails({ doc, accountStatement }) {
    const account = accountStatement.account

    const beginningOfPage = 50
    const endOfPage = 550

    doc
      .moveTo(beginningOfPage, this.startPositionY)
      .lineTo(endOfPage, this.startPositionY)
      .stroke()
    // -----------------------------------------------------------------------------------
    const widthOfBenefName = doc.widthOfString(account.holderName)
    const widthOfLine1 = doc.widthOfString(account.holderAddress.line1)
    const widthOfLine2 = doc.widthOfString(account.holderAddress.line2)
    const widthOfLine3 = doc.widthOfString(account.holderAddress.line3)
    const benefNameHeight = doc.heightOfString(account.holderName, {
      width: widthOfBenefName,
    })
    const benefLine1Height = doc.heightOfString(account.holderAddress.line1, {
      width: widthOfLine1,
    })
    const benefLine2Height = doc.heightOfString(account.holderAddress.line2, {
      width: widthOfLine2,
    })
    const benefLine3Height = doc.heightOfString(account.holderAddress.line3, {
      width: widthOfLine3,
    })
    const componentHeight =
      benefNameHeight + benefLine1Height + benefLine2Height + benefLine3Height
    doc
      .fontSize(10)
      .text(`Beneficiary`, beginningOfPage, 135)
      .fontSize(14)
      .font(BOLD_FONT)
      .text(account.holderName, { width: 250 })
      .font(NORMAL_FONT)
      .fontSize(12)
      .text(account.holderAddress.line1, { width: 250 })
      .text(account.holderAddress.line2, { width: 250 })
      .text(account.holderAddress.line3, { width: 250 })

    doc
      .fontSize(12)
      .font(BOLD_FONT)
      .text(`IBAN:`, beginningOfPage + 250 + 2.5, 155, {})
      .font(BOLD_FONT)
      .text(`BIC:`, beginningOfPage + 250 + 2.5, 170, {})
      .font(NORMAL_FONT)
      .text(account.iban, beginningOfPage + 250 + 40, 155, {
        width: 250,
      })
      .text(account.bic, beginningOfPage + 250 + 40, 170, {
        width: 250,
      })
    // -----------------------------------------------------------------------------------
    doc
      .moveTo(beginningOfPage, this.startPositionY + componentHeight + 5)
      .lineTo(endOfPage, this.startPositionY + componentHeight + 5)
      .stroke()
  }

  generateBalanceSummary({ doc, accountStatement }) {
    const top = 270
    const productX = 55
    const productWidth = 125 - 2.5
    const openingBalanceX = productX + productWidth
    const openingBalanceWidth = 100 - 2.5
    const moneyOutX = openingBalanceX + openingBalanceWidth
    const moneyOutWidth = 100 - 2.5
    const moneyInX = moneyOutX + moneyOutWidth
    const moneyInWidth = 100 - 2.5
    const closingBalanceX = moneyInX + moneyInWidth
    const closingBalanceWidth = 100 - 2.5

    doc.fontSize(14).font(BOLD_FONT).text("Balance summary", 55, top)

    doc
      .fontSize(10)
      .font(BOLD_FONT)
      .text("Product", productX, top + 40, { width: productWidth })
      .text("Opening\nbalance", openingBalanceX, top + 40, {
        width: openingBalanceWidth,
      })
      .text("Money out", moneyOutX, top + 40, {
        width: moneyOutWidth,
      })
      .text("Money in", moneyInX, top + 40, { width: moneyInWidth })
      .text("Closing\nbalance", closingBalanceX, top + 40, {
        width: closingBalanceWidth,
      })

    const strokeY = top + 75
    doc.font(BOLD_FONT).moveTo(50, strokeY).lineTo(550, strokeY).stroke()

    doc
      .fontSize(10)
      .font(NORMAL_FONT)
      .text("Account (E-money)", productX, strokeY + 15, {
        width: productWidth,
      })
      .text(
        accountStatement.account.openingBalance,
        openingBalanceX,
        strokeY + 15,
        {
          width: openingBalanceWidth,
        }
      )
      .text(accountStatement.account.moneyOut, moneyOutX, strokeY + 15, {
        width: moneyOutWidth,
      })
      .text(accountStatement.account.moneyIn, moneyInX, strokeY + 15, {
        width: moneyInWidth,
      })
      .text(
        accountStatement.account.closingBalance,
        closingBalanceX,
        strokeY + 15,
        {
          width: closingBalanceWidth,
        }
      )

    doc.addPage()
  }

  getTransactionsTitle({ accountStatement }) {
    const fromDate = new Date(accountStatement.fromDate)
    const toDate = new Date(accountStatement.toDate)
    const fromDateFormatted = accountStatement.fromDate
      ? {
          day: fromDate.getDate(),
          month:
            fromDate.getMonth() + 1 > 10
              ? fromDate.getMonth() + 1
              : `0${fromDate.getMonth() + 1}`,
          monthName: fromDate.toLocaleString("default", { month: "long" }),
          year: fromDate.getFullYear(),
        }
      : undefined
    const toDateFormatted = accountStatement.toDate
      ? {
          day: toDate.getDate(),
          month:
            toDate.getMonth() + 1 > 10
              ? toDate.getMonth() + 1
              : `0${toDate.getMonth() + 1}`,
          monthName: toDate.toLocaleString("default", {
            month: "long",
          }),
          year: toDate.getFullYear(),
        }
      : undefined
    const fromDateText = accountStatement.fromDate
      ? ` from ${fromDateFormatted.day} ${fromDateFormatted.monthName} ${fromDateFormatted.year}`
      : ""
    const toDateText = accountStatement.toDate
      ? ` to ${toDateFormatted.day} ${toDateFormatted.monthName} ${toDateFormatted.year}`
      : ""

    return `Account transactions${fromDateText}${toDateText}`
  }

  generateTable({ doc, accountStatement }) {
    let tableTop = 200
    const dateX = 55
    const dateWidth = 95 - 2.5
    const descriptionX = dateX + dateWidth
    const descriptionWidth = 255 - 2.5
    const moneyOutX = descriptionX + descriptionWidth
    const moneyOutWidth = 95 - 2.5
    const moneyInX = moneyOutX + moneyOutWidth
    const moneyInWidth = 95 - 2.5

    const titleText = this.getTransactionsTitle({ accountStatement })
    doc.fontSize(14).font(BOLD_FONT).text(titleText, 55, 150)

    doc
      .fontSize(10)
      .font(BOLD_FONT)
      .text("Date", dateX, tableTop, { width: dateWidth })
      .text("Description", descriptionX, tableTop, {
        width: descriptionWidth,
      })
      .text("Money out", moneyOutX, tableTop, {
        width: moneyOutWidth,
      })
      .text("Money in", moneyInX, tableTop, { width: moneyInWidth })

    doc
      .font(BOLD_FONT)
      .moveTo(50, tableTop + 20)
      .lineTo(550, tableTop + 20)
      .stroke()

    const operations = accountStatement.operations
    let i = 0
    let positionCounter = 0
    for (i = 0; i < operations.length; i++) {
      const operation = operations[i]
      let y = tableTop + 40 + positionCounter * 40
      if (y > 680) {
        doc.addPage()
        positionCounter = 0
        tableTop = this.startPositionY
        y = tableTop + 40 + positionCounter * 40
      }

      doc
        .fontSize(10)
        .font(NORMAL_FONT)
        .text(new Date(operation.date).toDateString(), dateX, y, {
          width: dateWidth,
        })
        .text(operation.counterparty.name, descriptionX, y, {
          width: descriptionWidth,
        })
        .fontSize(8)
        .text(operation.counterparty.iban, descriptionX, y + 12.5, {
          width: descriptionWidth,
        })
        .fontSize(10)
        .text(operation.moneyOut, moneyOutX, y, { width: moneyOutWidth })
        .text(operation.moneyIn, moneyInX, y, { width: moneyInWidth })
      doc
        .moveTo(50, y + 30)
        .lineTo(550, y + 30)
        .stroke()
      positionCounter += 1
    }
  }

  generateFooter({ doc, currentIndex, totalPages, oldBottomMargin }) {
    doc
      .fontSize(8)
      // .text(
      //   "ELYPS SA is a company registered in Belgium under the number 0695.741.309 established and having its registered office at Avenue Louise 54, 1050 Brussels, Belgium. Within the European Union, ELYPS SA is authorised as an electronic money agent registered with the Bank of Lithuania (registration number 0695.741.309). In the United Kingdom (UK), ELYPS SA is authorised as an electronic money agent registered with the UK Financial Conduct Authority (registration number 902806).",
      //   0,
      //   doc.page.height - oldBottomMargin / 2,
      //   { align: "center" }
      // )
      .text(
        `${currentIndex + 1}/${totalPages}`,
        0,
        doc.page.height - oldBottomMargin / 2, // Centered vertically in bottom margin
        { align: "right" }
      )
  }

  globalPagesEdit({ doc }) {
    const range = doc.bufferedPageRange()
    for (
      let i = range.start;
      i <= doc._pageBufferStart + doc._pageBuffer.length - 1;
      i++
    ) {
      doc.switchToPage(i)
      let oldTopMargin = doc.page.margins.top
      doc.page.margins.top = 0 //Dumb: Have to remove top margin in order to write into it
      this.generateHeaders({ doc })
      doc.page.margins.top = oldTopMargin // ReProtect top margin

      //Footer: Add page number
      let oldBottomMargin = doc.page.margins.bottom
      doc.page.margins.bottom = 0 //Dumb: Have to remove bottom margin in order to write into it
      this.generateFooter({
        doc,
        currentIndex: i,
        totalPages: range.count,
        oldBottomMargin,
      })
      doc.page.margins.bottom = oldBottomMargin // ReProtect bottom margin
    }
  }

  removeFile(pathToFile) {
    fs.unlinkSync(pathToFile)
  }

  async generate({ accountStatement }) {
    let doc = new PDFDocument({ bufferPages: true })

    const filename = `account-statement_${accountStatement.account.holderName}_elyps_${this.currentDate.year}-${this.currentDate.month}-${this.currentDate.day}.pdf`

    // pipe to a writable stream which would save the result into the same directory
    const writeStream = fs.createWriteStream(filename)
    doc.pipe(writeStream)

    // this.generateHeaders(doc)

    this.generateAccountHolderDetails({ doc, accountStatement })

    this.generateBalanceSummary({ doc, accountStatement })

    doc.moveDown()

    this.generateTable({ doc, accountStatement })

    // this.generateFooter(doc)

    this.globalPagesEdit({ doc, accountStatement })
    // write out file
    doc.end()
    await new Promise(resolve => {
      writeStream.on("finish", async () => {
        resolve()
        // this.removeFile(pathToFile)
      })
    })
  }
}

module.exports = PdfGenerator
