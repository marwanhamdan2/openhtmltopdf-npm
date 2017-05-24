package com.mashvisor.app;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import java.io.*;
import java.util.UUID;
import com.google.common.base.Charsets;
import com.google.common.io.Files;


public class App 
{
    public static void main( String[] args )
    {

        /**
         * Read file from process arguments
         */
        String inputFilePath = null;

        if(args.length == 0){
            System.err.println("No argument for input file is provided");
            System.exit(1);
        }
        inputFilePath = args[0];

        String outputFilePath = null;
        if(args.length>1){
            outputFilePath = args[1];
        }

        if(outputFilePath == null){
            outputFilePath = UUID.randomUUID().toString() + ".pdf";
        }


        /**
         * Check the validity of the file
         */
        File f = new File(inputFilePath);
        if(!f.exists() || f.isDirectory()) {
            System.err.println("File not found");
            System.exit(1);
        }


        /**
         * Read input file data
         */
        String inputHtmlData = null;
        try{
            inputHtmlData = Files.toString(f, Charsets.UTF_8);
        }catch(IOException E){
            System.err.println(E.toString());
            System.exit(1);
        }


        /**
         * Convert the html data into pdf file
         */
        OutputStream os = null;
        try{
            os = new FileOutputStream(outputFilePath);
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(inputHtmlData, outputFilePath);
            builder.toStream(os);
            try{
                builder.run();
                System.out.println(outputFilePath);
                System.exit(0);
            }catch (Exception e){
                System.err.println(e.toString());
                System.exit(1);
            }
        }catch(FileNotFoundException fe){
            System.err.println(fe.toString());
            System.exit(1);
        }
    }
}
