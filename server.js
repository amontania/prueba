const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require('fs');
const {  PDFDocument , rgb,StandardFonts  } =  require('pdf-lib');
const app= express();
const cors = require("cors");
app.use(cors());
app.use(fileUpload());

//Upload Endpoint

app.post('/upload',   (req, res) => {
    if (req.files=== null){
       return res.status(400).json({msg: 'No file uploaded'});
    }
    const ip  = req.body.ip;
 
  
    const file= req.files.file;
    
    
    const fileName = `${file.name}`  ;


  run().catch(err => console.log(err));
  
async function run() {
  // Create a new document and add a new page
  const pdfDoc = await PDFDocument.load(file.data)
  let firma= `${__dirname}\\client\\public\\firma\\firma.png`;
  // let firma= `${__dirname}\\img\\zapps\\signature\\firma.png`;
  let img = await fs.readFileSync(firma);

          
  // Get the last page of the document
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length-1];

  
  img = await pdfDoc.embedPng(img);
  


  // Draw the image on the center of the page
  const { width, height } = img.scale(1);
  lastPage.drawImage(img, {
    x: 105,
    y:30
  });

  lastPage.drawRectangle({
    x: 105,
    y: 30,
    width: width,
    height: height,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
  });

  const today = new Date();

  FechaHora =new Intl.DateTimeFormat('es-PY', {  dateStyle: "medium",  timeStyle: "medium" }).format(today);
  pdfDoc.setModificationDate(today);
  // pdfDoc.setCreator();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
   
  lastPage.setFont(timesRomanFont);
  lastPage.drawText(FechaHora, { x: 200, y: 20+height, size: 10 });
  
// ip
  lastPage.drawText(ip, { x: 200, y: 31, size: 10 });

  // Write the PDF to a file
  fs.writeFileSync(`${__dirname}/client/public/upload/${fileName}`, await pdfDoc.save());
  return res.json({fileName : fileName, filePath:`/upload/${fileName}`});
}
   
         
  
 
           

});
///////// end upload


app.get("/pdf", (req, res) => {
        var file = fs.createReadStream(`${__dirname}/client/public/upload/${req.query.file}`);
        file.pipe(res);
   
     });
   

      
  


  


app.listen(5000,()=> console.log("Server Started..."));
