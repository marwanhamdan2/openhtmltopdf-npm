const uuid = require('uuid-v4');
const fs = require('fs');
const exec = require('child_process').exec;

module.exports = {
    generatePdfOfHtml: function(htmlData, id){
        if(!id){
            var id = uuid();
        }

        return new Promise((resolve, reject)=>{
            //generate random file name
            var srcFilePath = __dirname + `/dist/${id}.html`;
            var dstFilePath = __dirname + `/dist/${id}.pdf`;
            var javaAppPath = __dirname + '/dist/app.jar';
            //write html data as file to disk
            fs.writeFile(srcFilePath, htmlData, (err)=>{
                if(err){
                    return reject(err);
                }

                //if file is written successfully convert into pdf
                const cmd = `java -jar ${javaAppPath} ${srcFilePath} ${dstFilePath}`
                exec(cmd, function(error, stdout, stderr) {
                    if(error){
                        return reject(error);
                    }

                    //delete html file
                    fs.unlink(srcFilePath);

                    //resolve the output pdf file
                    return resolve(dstFilePath);
                });
            })
        });
    },

    getDistPath: function(){
        return `${__dirname}/dist`;
    }
}