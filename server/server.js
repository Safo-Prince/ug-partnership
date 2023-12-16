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



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

app.use(cors());

// MySQL database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cj10856672',
  //server_database_password: Blue12:34
  database: 'sipp_project',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());



// Endpoint to fetch data from MySQL and serve as JSON
app.get('/api/data', (req, res) => {
  let sql = 'SELECT * FROM partnership_details';

  // Check for filter query parameter
  const filter = req.query.filter;
  if (filter) {
    sql += ` WHERE status = '${filter}'`; // Adjust this based on your data structure
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(result);
    }
  });
});



// Modify your existing endpoint to handle fetching data for a specific row
app.get('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM partnership_details WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Data fetched from MySQL:', result);
      res.status(200).json(result[0]); // Assuming result is an array with a single object
    }
  });
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

  // Your existing MySQL query and data insertion code
  db.query(sql, insertData, async (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Data inserted into MySQL:', result);
      res.status(200).send('Form submitted successfully');

      // Create a nodemailer transporter
      // Use nodemailer to send the email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'irondicjonathan@gmail.com', // Replace with your Gmail address
          pass: 'zsfi avjq dagk joyf', // Replace with your Gmail password
        },
      });

      // Send email to the email address in the form data
      const userMailOptions = {
        from: 'irondicjonathan@gmail.com',
        to: formData.email, // Use the email from form data
        subject: 'Partnership Received',
        text: `Dear Sir/Madam,

        Your partnership application has been submitted.
        We will revert in due time.        
        Thank you.
        
        +233-(0)303-930436                                     orid@ug.edu.gh
        +233-(0)302-213850
                                            P.O. Box LG 1142
                                            Legon, Accra`, // Add your email body here
      };

      try {
        await transporter.sendMail(userMailOptions);
        console.log('Email sent to user successfully');
      } catch (emailError) {
        console.error('Error sending email to user:', emailError);
      }

      // Send email to the statically provided email
      const adminMailOptions = {
        from: 'irondicjonathan@gmail',
        to: 'mikesaxxmusic@gmail.com', // Use your admin email
        subject: 'Subject for admin',
        text: 'A new Partnership has been uploaded', // Add your email body here
      };

      try {
        await transporter.sendMail(adminMailOptions);
        console.log('Email sent to admin successfully');
      } catch (adminEmailError) {
        console.error('Error sending email to admin:', adminEmailError);
      }
    }
  });
});




const generateAndSendPdf = (id, res) => {
  // Fetch data based on the ID (you can reuse your existing endpoint logic)
  const sql = 'SELECT * FROM partnership_details WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Assuming result is an array with a single object
    const rowData = result[0];

    // Check if rowData exists
    if (rowData) {
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

      // Ensure the file is closed and the response is sent after the PDF is generated
      doc.end(() => {
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
      });
    } else {
      // No data found for the given ID
      res.status(404).send('Data not found');
    }
  });
};






// New endpoint for generating and downloading PDF
app.get('/api/download-pdf/:id', (req, res) => {
  const { id } = req.params;

  // Check if the file exists
  const filePath = path.join(__dirname, 'pdfs', `${id}.pdf`);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File doesn't exist, generate and send the PDF
      generateAndSendPdf(id, res);
      // Schedule file deletion after a minute
        setTimeout(() => {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting file:', unlinkErr);
            } else {
              console.log('File deleted successfully');
            }
          });
        }, 20000); // 60000 milliseconds = 1 minute
    } else {
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
    }
  });
});



// New endpoint for generating and downloading PDF for all partnerships
app.get('/api/download-all-pdf', async (req, res) => {
  try {
    // Fetch all partnerships from the database
    const sql = 'SELECT * FROM partnership_details';
    const partnerships = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // Create a PDF using pdfkit
    const doc = new pdf();
    partnerships.forEach((partnership) => {
      // Customize the PDF content based on your data structure
      // Set font and font size
    doc.font('Helvetica').fontSize(18);

    // Center-align text
    const textOptions = { align: 'center' };

    // Customize the PDF content based on your data structure
    doc.text(partnership.partnership_name, { underline: true, bold: true, ...textOptions });
    doc.moveDown(); // Add some space between lines
    doc.fontSize(12); // Set font size for the rest of the content

    doc.text(`Description: ${partnership.comment}`);
    doc.moveDown();
    doc.text(`College: ${partnership.location}`);
    doc.moveDown();
    doc.text(`Category: ${partnership.category}`);
    doc.moveDown();
    doc.text(`Partner Type: ${partnership.partner_type}`);
    doc.moveDown();
    doc.text(`Industry: ${partnership.industry}`);
    doc.moveDown();
    doc.text(`Secondary Partner: ${partnership.secondary_partners}`);
    doc.moveDown();
    doc.text(`Duration: ${partnership.duration}`);

    // Format start and end dates
    const startDate = new Date(partnership.start_date);
    const endDate = new Date(partnership.end_date);

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

    doc.text(`Keywords: ${partnership.keywords}`);
      // Add other fields as needed
      doc.moveDown(); // Add space between partnerships
      doc.moveDown(); // Add space between partnerships
      doc.moveDown(); // Add space between partnerships
    });

    // Save the PDF to a file (or stream it directly to the response)
    const filePath = path.join(__dirname, 'pdfs', 'all_partnerships.pdf');
    doc.pipe(fs.createWriteStream(filePath));
    doc.end();

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
    console.error('Error generating all PDFs:', error);
    res.status(500).send('Internal Server Error');
  }
});














// Endpoint to handle sending an email
app.post('/api/send-email', async (req, res) => {
  try {
    const { modalId, status } = req.body;

    // Fetch the email address associated with the modalId from your database
    // (Replace this with your actual database logic)
    const email = await getEmailFromDatabase(modalId);

    if (!email) {
      return res.status(404).json({ error: 'Email not found for the given ID' });
    }

    // Customize subject and body based on the status
    let subject, body;
    if (status === 'approved') {
      subject = 'Partnersip Approved';
      body = `Congratulations,

Your partnership application has been reviewed and we are pleased to let you know that it meets our criteria. Your application will be added to the list partnerships we have.

Thank you.

+233-(0)303-930436                                     orid@ug.edu.gh
+233-(0)302-213850
                                    P.O. Box LG 1142
                                    Legon, Accra`;

    } else if (status === 'pending') {
      subject = 'Partnership Pending';
      body = `Dear sir/madam,,

Your partnership application has been reviewed.
Thank you.

+233-(0)303-930436                                     orid@ug.edu.gh
+233-(0)302-213850
                                    P.O. Box LG 1142
                                    Legon, Accra`;
    } else {
      return res.status(400).json({ error: 'Invalid status provided' });
    }

    // Use nodemailer to send the email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'irondicjonathan@gmail.com', // Replace with your Gmail address
        pass: 'zsfi avjq dagk joyf', // Replace with your Gmail password
      },
    });

    const mailOptions = {
      from: 'irondicjonathan@gmail.com',
      to: email, // Use the retrieved email address
      subject: subject,
      text: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error processing email request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Simulated database function (replace this with your actual database logic)
const getEmailFromDatabase = async (modalId) => {
  // Simulate a database query to retrieve the email associated with the modalId
  // Replace 'partnership_details' with your actual table name
  const query = 'SELECT email FROM partnership_details WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(query, [modalId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        // Assuming the 'email' column contains the email address
        const email = results[0] ? results[0].email : null;
        resolve(email);
        console.log(email)
      }
    });
  });
};




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
