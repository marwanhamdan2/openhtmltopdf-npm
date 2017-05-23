##BUILD THE JAVA APP

mvn clean compile assembly:single


jar file will be located into target dir


move to dist dir


##Run the JAVA APP
java -jar app.jar input_file_path output_file_path



###node module export

It exports object of the following functions:

1) generatePdfOfHtml(htmlData) : Promise<String>
    resolve pdfFilePath and Reject error

