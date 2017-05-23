var main = require('./index');

main.generatePdfOfHtml('<p>Hello world</p>')
.then(pdfFilePath=>{
    console.log(pdfFilePath)
})
.catch(err=>{
    console.error(err);
})