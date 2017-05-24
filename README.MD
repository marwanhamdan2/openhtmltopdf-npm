**This is a node interface to openhtmltopdf (https://github.com/danfickle/openhtmltopdf) It requires JRE to be installed.**


#How to use

npm install html2pdf-node


```javascript
const html2pdf = require("html2pdf-node");
const htmlSample = `<p>Hello</p>`;
html2pdf.generatePdfOfHtml(htmlSample)
        .then(pdfFilePath=>{
            console.log(pdfFilePath)
        })
        .catch(err=>{});
```



#NOTES

This module contains java archive file (jar) with needed dependencies
Ready to be used, you need JRE installed.

You can update the java code and build with **npm run build-java-app**

###Run the JAVA APP
java -jar app.jar input_file_path output_file_path
