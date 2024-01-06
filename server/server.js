const express = require('express');
const authRoutes = require('./authRoutes'); // Adjust the path as needed
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const pdf = require('pdfkit');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const multer = require('multer');
const format = require('date-fns/format');
require('dotenv').config(); // Load environment variables from .env file



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'https://partnerships.ug.edu.gh',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Blue12:34',
  //password:'Cj10856672',
  database: 'sipp_project',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Event listener for when a connection is established
db.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

// Event listener for when a connection is released back to the pool
db.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());



// Endpoint to fetch data from MySQL and serve as JSON

app.get('/api/data', async (req, res) => {
  let sql = 'SELECT * FROM partnership_details';

  // Check for filter query parameter
  const filter = req.query.filter;
  if (filter) {
    sql += ` WHERE status = '${filter}'`; // Adjust this based on your data structure
  }

  // Use getConnection to obtain a connection from the pool
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Execute the query on the obtained connection
    connection.query(sql, (queryErr, results) => {
      // Release the connection back to the pool
      connection.release();

      if (queryErr) {
        console.error('Error fetching projects:', queryErr);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });
});



// Modify your existing endpoint to handle fetching data for a specific row
app.get('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM partnership_details WHERE id = ?';

  try {
    // Use the promise-based API to execute the query
    const [result] = await db.promise().query(sql, [id]);

    if (result.length > 0) {
      console.log('Data fetched from MySQL:', result);
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (err) {
    console.error('Error fetching data from MySQL:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    //db.end();
  }
});


// Set up multer storage and file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Specify the directory where you want to store the files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
  },
});

const upload = multer({ storage: storage });


// Your existing MySQL configuration and database connection

// Endpoint to handle form submission with file uploads
app.post("/submit-form", upload.array("files", 2), async (req, res) => {
  const formData = req.body;

  // Convert keywords array to CSV string
  const keywordsCSV = Array.isArray(formData.keywords) ? formData.keywords.join(',') : '';

  // Log form data to console
  console.log('Form Data:', formData);

  // Log file paths to console
  console.log('File Paths:', req.files.map(file => file.path));

  // Your existing MySQL query and data insertion code
  const sql = 'INSERT INTO partnership_details SET ?';

  // Get the current date
  const currentDate = new Date();

  // Convert the date to a string in the format 'DD-MM-YYYY'
  const uploadDate = format(currentDate, 'dd-MM-yyyy');

  const insertData = { ...formData, keywords: keywordsCSV, approved: false, upload_date: uploadDate };

  // Assuming you have a property named 'files' in formData
  if (req.files) {
    // Add the file paths to the insertData object
    insertData.files = req.files.map(file => file.path).join(', ');
  }

  try {
    // Perform the database insertion
    db.query(sql, insertData, async (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Data inserted into MySQL:', result);

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,  // You can also use port 25 if needed
          secure: false,  // For port 587, set to false
          auth: {
            user: 'sipp@ug.edu.gh',  // Use the Microsoft 365 email address
            pass: 'Saq85511',
          },
        });

        const htmlTemplate = `
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-50 {
    width: 250px !important;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
    </style>
  
  

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
    
  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="left">
      
      <img align="left" border="0" src="images/image-1.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 60%;max-width: 288px;" width="288"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color: #ecf0f1;width: 500px;padding: 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ecf0f1;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 16px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #6b6b6b; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">Dear sir/madam,</p>
<p style="line-height: 140%;"> </p>
<p style="line-height: 140%;">Your partnership application has been reviewed. </p>
<p style="line-height: 140%;">{Message from the review textbox}</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #ffffff;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:16px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <div>
<div><a href="https://orid.ug.edu.gh/">+233-(0)303-930436</a></div>
<div><a href="https://orid.ug.edu.gh/">+233-(0)302-</a><a href="https://orid.ug.edu.gh/">213850</a></div>
<div title="Location"> </div>
</div>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="250" style="background-color: #ffffff;width: 250px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-50" style="max-width: 320px;min-width: 250px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 140%; text-align: right; word-wrap: break-word;">
    <div><a href="http://orid@ug.edu.gh/">orid@ug.edu.gh</a></div>
<div title="Location"><a href="https://www.google.com.gh/maps/place/Legon+Centre+for+International+Affairs+and+Diplomacy,+University+of+Ghana,+Botanical+Gardens+Rd,+Accra/@5.6521685,-0.1841788,19z/data=!4m7!1m4!3m3!1s0x0fdf9c86dc2b3e93:0xf2c110cbc16a70a3!2sLegon+Centre+for+International+Affairs+and+Diplomacy,+University+of+Ghana,+Botanical+Gardens+Rd,+Accra!3b1!3m1!1s0x0fdf9c86dc2b3e93:0xf2c110cbc16a70a3?hl=en">P.O. Box LG 1142<br />Legon, Accra</a></div>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
`;

        // Send email to the email address in the form data
        const userMailOptions = {
          from: 'sipp@ug.edu.gh',
          to: formData.email,
          subject: 'Partnership Received',
          html: htmlTemplate,
        };

        try {
          // Perform the email sending to user
          await transporter.sendMail(userMailOptions);
          console.log('Email sent to user successfully');

          // Send email to the statically provided email
          const adminMailOptions = {
            from: 'sipp@ug.edu.gh',
            to: 'mikesaxxmusic@gmail.com',//email of orid admin
            subject: 'New Partnership Submission  Received - Action Required',
            text: `
            Dear Administrator

You are receiving this automated notification to inform you that a new partnership has been submitted and is awaiting your review.

To access the Partnership Submission for evaluation, please click on this link to visit the Partnership Portal https://partnerships.ug.edu.gh

Your prompt attention to this matter is appreciated to ensure timely assessment of the submitted partnership.

Thank you.`
            ,
          };

          try {
            // Perform the email sending to admin
            await transporter.sendMail(adminMailOptions);
            console.log('Email sent to admin successfully');

            // Respond to the client only after all asynchronous operations are completed
            res.status(200).json({ message: 'Form submitted successfully' });
          } catch (adminEmailError) {
            console.error('Error sending email to admin:', adminEmailError);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        } catch (emailError) {
          console.error('Error sending email to user:', emailError);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    });
  } catch (error) {
    console.error('Error processing form submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





const fetchDataById = async (id) => {
  const sql = 'SELECT * FROM partnership_details WHERE id = ?';
  const [result] = await db.promise().query(sql, [id]);
  //db.end();
  return result;
};
const generateAndSendPdf = async (id, res) => {
  try {
    const result = await fetchDataById(id);

    if (result.length === 0) {
      res.status(404).send('Data not found');
      return;
    }

    const rowData = result[0];

    // Create a PDF using pdfkit
    const doc = new pdf();

    // Set font and font size
    doc.font('Helvetica').fontSize(18);

    // Center-align text
    const textOptions = { align: 'center' };

    // Customize the PDF content based on your data structure
    doc.text(rowData.partnership_name, { underline: true, bold: true, ...textOptions });
    doc.moveDown(); // Add some space between lines
    doc.fontSize(12); // Set font size for the rest of the content

    doc.text(`Description: ${rowData.comment}`);
    doc.moveDown();
    doc.text(`College: ${rowData.location}`);
    doc.moveDown();
    doc.text(`Category: ${rowData.category}`);
    doc.moveDown();
    doc.text(`Partner Type: ${rowData.partner_type}`);
    doc.moveDown();
    doc.text(`Industry: ${rowData.industry}`);
    doc.moveDown();
    doc.text(`Secondary Partner: ${rowData.secondary_partners}`);
    doc.moveDown();
    doc.text(`Duration: ${rowData.duration}`);

    // Format start and end dates
    const startDate = new Date(rowData.start_date);
    const endDate = new Date(rowData.end_date);

    const startDateString = startDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const endDateString = endDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    doc.moveDown();
    doc.text(`Start Date: ${startDateString}`);
    doc.moveDown();
    doc.text(`End Date: ${endDateString}`);
    doc.moveDown();

    doc.text(`Keywords: ${rowData.keywords}`);

    // Add other fields as needed

    // Save the PDF to a file (or stream it directly to the response)
    const filePath = path.join(__dirname, 'pdfs', `${id}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    // Ensure the file is closed before continuing
    await new Promise((resolve) => doc.end(resolve));

    // Log the file path on the server side
    console.log('Generated PDF path (Server):', filePath);

    // Send the file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('File sent successfully');
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
};







// New endpoint for generating and downloading PDF
app.get('/api/download-pdf/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the file exists
  const filePath = path.join(__dirname, 'pdfs', `${id}.pdf`);

  try {
    await fs.promises.access(filePath, fs.constants.F_OK);

    // File exists, send it directly
    console.log('Existing PDF path (Server):', filePath);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('File sent successfully');
      }
    });
  } catch (err) {
    // File doesn't exist, generate and send the PDF
    await generateAndSendPdf(id, res);

    // Schedule file deletion after a minute
    setTimeout(async () => {
      try {
        await fs.promises.unlink(filePath);
        console.log('File deleted successfully');
      } catch (unlinkErr) {
        console.error('Error deleting file:', unlinkErr);
      }
    }, 20000); // 20000 milliseconds = 20 seconds
  }
});












// Endpoint to handle sending an email
// Endpoint to handle sending an email
app.post('/api/send-email', async (req, res) => {
  try {
    //const { modalId, status } = req.body;
    const { modalId, status } = req.body;


    console.log(req.body)

    // Fetch the email address associated with the modalId from your database
    const email = await getEmailFromDatabase(modalId);

    if (!email) {
      return res.status(404).json({ error: 'Email not found for the given ID' });
    }

    // Customize subject and body based on the status
    let subject, body;
    if (status === 'approved') {
      subject = 'Partnership Approved';
      body = `Congratulations,

Your partnership application has been reviewed and we are pleased to let you know that it meets our criteria. 

Your application will be added to the list partnerships we have.

Best regards,

UG Partnership Assessment Team.

`;
    } else if (status === 'pending') {
      subject = 'Partnership Pending';
      body = `Dear sir/madam,
      
Your submission to UG Partnerships portal is currently pending. Our Assessment Team has reviewed your submission and identified that further information is required to proceed with the assessment.

Below, you'll find comments from our Assessment Team regarding the additional information needed for your application. We kindly ask you to review these comments and provide the requested details at your earliest convenience.
      
[Insert Comments ]
      
Your prompt attention to this matter will enable us to move forward with the assessment of your submission 
      
Should you have any questions or need clarification on the required information, please don't hesitate to reach out to us. 
      
Thank you for your cooperation.
      
Best regards,
      
UG Partnerships Assessment Team

`;
    } else {
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    // Use nodemailer's createTransport to create a transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,  // You can also use port 25 if needed
      secure: false,  // For port 587, set to false
      auth: {
        user: 'sipp@ug.edu.gh',  // Use the Microsoft 365 email address
        pass: 'Saq85511',
      },
    });

    // Create mail options
    const mailOptions = {
      from: 'sipp@ug.edu.gh',
      to: email, // Use the retrieved email address
      subject: subject,
      text: body,
    };

    // Use nodemailer's sendMail with await to work with promises
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error processing email request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Simulated database function (replace this with your actual database logic)
const getEmailFromDatabase = async (modalId) => {
  // Simulate a database query to retrieve the email associated with the modalId
  const query = 'SELECT email FROM partnership_details WHERE id = ?';

  try {
    const results = await db.promise().query(query, [modalId]);
    console.log(modalId)

    // Assuming the 'email' column contains the email address
    const email = results[0][0] ? results[0][0].email : null;
    console.log(email);
    return email;
  } catch (err) {
    console.error('Error fetching email from database:', err);
    throw err;
  }
};



const generateAndSendAllPdf = async (res) => {
  try {
    console.log("generating")
    const sql = 'SELECT * FROM partnership_details';
    const [results] = await db.promise().query(sql);
    //console.log(results)

    if (results.length === 0) {
      res.status(404).send('No data found');
      return;
    }

    // Create a PDF using pdfkit
    const doc = new pdf();

    // Set font and font size
    doc.font('Helvetica').fontSize(18);

    // Center-align text
    const textOptions = { align: 'center' };

    // Loop through each row and add content to the PDF
    results.forEach((rowData, index) => {
      // Add a page break for all rows except the first
      if (index !== 0) {
        doc.addPage();
      }

      doc.text(rowData.partnership_name, { underline: true, bold: true, ...textOptions });
      doc.moveDown();
      doc.fontSize(12);

      // Customize the PDF content based on your data structure
      doc.text(`Description: ${rowData.comment}`);
      doc.moveDown();
      doc.text(`College: ${rowData.location}`);
      doc.moveDown();
      doc.text(`Category: ${rowData.category}`);
      doc.moveDown();
      doc.text(`Partner Type: ${rowData.partner_type}`);
      doc.moveDown();
      doc.text(`Industry: ${rowData.industry}`);
      doc.moveDown();
      doc.text(`Secondary Partner: ${rowData.secondary_partners}`);
      doc.moveDown();
      doc.text(`Duration: ${rowData.duration}`);

      // Format start and end dates
      const startDate = new Date(rowData.start_date);
      const endDate = new Date(rowData.end_date);

      const startDateString = startDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      const endDateString = endDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      doc.moveDown();
      doc.text(`Start Date: ${startDateString}`);
      doc.moveDown();
      doc.text(`End Date: ${endDateString}`);
      doc.moveDown();

      doc.text(`Keywords: ${rowData.keywords}`);
      // Add other fields as needed
    });

    // Save the PDF to a file (or stream it directly to the response)
    const filePath = path.join(__dirname, 'pdfs', 'all_partnerships.pdf');

    doc.pipe(fs.createWriteStream(filePath));

    // Ensure the file is closed before continuing
    await new Promise((resolve) => doc.end(resolve));

    // Log the file path on the server side
    console.log('Generated PDF path (Server):', filePath);

    // Send the file
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('File sent successfully');
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
};

// New endpoint for generating and downloading PDF for all rows
app.get('/api/download-all-pdf', async (req, res) => {
  const filePath = path.join(__dirname, 'pdfs', `all_partnerships.pdf`);

  try {
    await fs.promises.access(filePath, fs.constants.F_OK);

    // File exists, send it directly
    console.log('Existing PDF path (Server):', filePath);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('File sent successfully');
      }
    });
  } catch (err) {
    // File doesn't exist, generate and send the PDF
    await generateAndSendAllPdf(res);

    // Schedule file deletion after a minute
    setTimeout(async () => {
      try {
        await fs.promises.unlink(filePath);
        console.log('File deleted successfully');
      } catch (unlinkErr) {
        console.error('Error deleting file:', unlinkErr);
      }
    }, 20000); // 20000 milliseconds = 20 seconds
  }
});






app.get('/api/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, './uploads', fileName);

  // Use appropriate headers
  res.download(filePath);
});




app.use('/', authRoutes); // Mount the auth routes under the /auth path

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
