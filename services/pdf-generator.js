const PDFGenerator = require("pdfkit")
const fs = require("fs")
const path = require("path")

const BOLD_FONT = "Helvetica-Bold"
const NORMAL_FONT = "Helvetica"

class PdfGenerator {
  constructor(invoice) {
    this.invoice = invoice
    this.startPositionY = 130
  }

  generateHeaders(doc) {
    const logoPath = path.join(__dirname, "..", "assets", "logo.png")
    const logoWidth = 80
    doc
      .image(logoPath, doc.page.width - logoWidth - 50, 50, {
        width: logoWidth,
      })
      .fontSize(21)
      .text("EUR Statement", 50, 50, { align: "left" })
      .fontSize(10)
      .text(`Generated on: ${`7 Feb 2023`}`, { align: "left" })
      .text(`ELYPS SA`, { align: "left" })
  }

  generateAccountHolderDetails(doc) {
    const beneficiary = this.invoice.beneficiary

    const beginningOfPage = 50
    const endOfPage = 550

    doc
      .moveTo(beginningOfPage, this.startPositionY)
      .lineTo(endOfPage, this.startPositionY)
      .stroke()
    // -----------------------------------------------------------------------------------
    const widthOfBenefName = doc.widthOfString(beneficiary.name)
    const widthOfLine1 = doc.widthOfString(beneficiary.address.line1)
    const widthOfLine2 = doc.widthOfString(beneficiary.address.line2)
    const widthOfLine3 = doc.widthOfString(beneficiary.address.line3)
    const benefNameHeight = doc.heightOfString(beneficiary.name, {
      width: widthOfBenefName,
    })
    const benefLine1Height = doc.heightOfString(beneficiary.address.line1, {
      width: widthOfLine1,
    })
    const benefLine2Height = doc.heightOfString(beneficiary.address.line1, {
      width: widthOfLine2,
    })
    const benefLine3Height = doc.heightOfString(beneficiary.address.line3, {
      width: widthOfLine3,
    })
    const componentHeight =
      benefNameHeight + benefLine1Height + benefLine2Height + benefLine3Height
    doc
      .fontSize(10)
      .text(`Beneficiary`, beginningOfPage, 135)
      .fontSize(14)
      .font(BOLD_FONT)
      .text(beneficiary.name, { width: 250 })
      .font(NORMAL_FONT)
      .fontSize(12)
      .text(beneficiary.address.line1, { width: 250 })
      .text(beneficiary.address.line2, { width: 250 })
      .text(beneficiary.address.line3, { width: 250 })

    doc
      .fontSize(12)
      .font(BOLD_FONT)
      .text(`IBAN:`, beginningOfPage + 250 + 2.5, 155, {
        bold: true,
      })
      .font(BOLD_FONT)
      .text(`BIC:`, beginningOfPage + 250 + 2.5, 170, {
        bold: true,
      })
      .font(NORMAL_FONT)
      .text(`${beneficiary.iban}`, beginningOfPage + 250 + 40, 155, {
        width: 250,
      })
      .text(`${beneficiary.bic}`, beginningOfPage + 250 + 40, 170, {
        width: 250,
      })
    // -----------------------------------------------------------------------------------
    doc
      .moveTo(beginningOfPage, this.startPositionY + componentHeight - 20)
      .lineTo(endOfPage, this.startPositionY + componentHeight - 20)
      .stroke()
  }

  generateTable(doc) {
    let tableTop = 270
    const dateX = 50
    const dateWidth = 90 - 2.5
    const descriptionX = dateX + dateWidth
    const descriptionWidth = 200 - 2.5
    const quantityX = descriptionX + descriptionWidth
    const quantityWidth = 90 - 2.5
    const priceX = quantityX + quantityWidth
    const priceWidth = 90 - 2.5
    const amountX = priceX + priceWidth
    const amountWidth = 90 - 2.5

    doc
      .fontSize(10)
      .font(BOLD_FONT)
      .text("Date", dateX, tableTop, { width: dateWidth, bold: true })
      .text("Description", descriptionX, tableTop, {
        width: descriptionWidth,
        bold: true,
      })
      .text("Money out", quantityX, tableTop, {
        width: quantityWidth,
        bold: true,
      })
      .text("Money in", priceX, tableTop, { width: priceWidth, bold: true })
      .text("Balance", amountX, tableTop, { width: amountWidth, bold: true })

    doc
      .font(BOLD_FONT)
      .moveTo(50, tableTop + 20)
      .lineTo(550, tableTop + 20)
      .stroke()

    const items = this.invoice.items
    let i = 0
    let positionCounter = 0
    for (i = 0; i < items.length; i++) {
      positionCounter += 1
      const item = items[i]
      let y = tableTop + 25 + positionCounter * 25
      if (y > 680) {
        doc.addPage()
        positionCounter = 0
        tableTop = this.startPositionY
        y = tableTop + 25 + positionCounter * 25
      }

      doc
        .fontSize(10)
        .font(NORMAL_FONT)
        .text(item.date, dateX, y, { width: dateWidth })
        .text(item.description, descriptionX, y, { width: descriptionWidth })
        .text(item.quantity, quantityX, y, { width: quantityWidth })
        .text(`$ ${item.price}`, priceX, y, { width: priceWidth })
        .text(`$ ${item.amount}`, amountX, y, { width: amountWidth })
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

  globalPagesEdit(doc) {
    const range = doc.bufferedPageRange()
    for (
      let i = range.start;
      i <= doc._pageBufferStart + doc._pageBuffer.length - 1;
      i++
    ) {
      doc.switchToPage(i)
      let oldTopMargin = doc.page.margins.top
      doc.page.margins.top = 0 //Dumb: Have to remove top margin in order to write into it
      this.generateHeaders(doc)
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

  generate() {
    let theOutput = new PDFGenerator({ bufferPages: true })

    const fileName = `Invoice_${this.invoice.invoiceNumber}.pdf`

    // pipe to a writable stream which would save the result into the same directory
    theOutput.pipe(fs.createWriteStream(fileName))

    // this.generateHeaders(theOutput)

    this.generateAccountHolderDetails(theOutput)

    theOutput.moveDown()

    this.generateTable(theOutput)

    // this.generateFooter(theOutput)

    this.globalPagesEdit(theOutput)
    // write out file
    theOutput.end()
  }
}

module.exports = PdfGenerator
