const express = require('express');
const dotenv = require('dotenv');

const app = express();

app.use(express.static("public"));

app.use(express.json());  // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));


app.post('/submit-form', (req, res) =>{
    console.log("body: ", req)
    const {firstName, lastName, email, subject, message} = req.body;
   
    // console.log(
    //   `Received data: ${firstName}, ${lastName}, ${email}, ${subject}, ${message}`
    // );
    res.json({
        firstName,
        lastName,
        email,
        subject,
        message
    })
})


try {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
} catch (err) {
    console.error('Failed to start server:', err);
}