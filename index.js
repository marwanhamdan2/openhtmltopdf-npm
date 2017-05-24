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
            var filePath = `./dist/${id}`;
            //write html data as file to disk
            fs.writeFile(filePath + '.html', htmlData, (err)=>{
                if(err){
                    return reject(err);
                }

                //if file is written successfully convert into pdf
                const cmd = `java -jar ./dist/app.jar ${filePath+'.html'} ${filePath + '.pdf'}`
                exec(cmd, function(error, stdout, stderr) {
                    if(error){
                        return reject(error);
                    }

                    //delete html file
                    fs.unlink(filePath + '.html');

                    //resolve the output pdf file
                    return resolve(__dirname + `/${filePath + '.pdf'}`);
                });
            })
        });
    },

    getDistPath: function(){
        return `${__dirname}/dist`;
    }
}