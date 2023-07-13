const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());


app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/submit-form', (req, res) => {
  

  
  const { name, email, dob, phoneNumber } = req.body;


  const transporter = nodemailer.createTransport({
    service: 'YourEmailService', // e.g., 'Gmail'
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Form Submission Confirmation',
    text: `Dear ${name},\n\nThank you for submitting the form. We have received your details.\n\nRegards,\nThe Form Team`,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Form submitted successfully');
    }
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
