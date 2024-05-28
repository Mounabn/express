const express = require('express');
const app = express();
const path = require('path');



// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware to check working hours
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).");
  }
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//serve static files ...
app.use(express.static(path.join(__dirname, "public")));


app.use(checkWorkingHours)

// Routes
app.get('/', (req, res) => {
  res.render('Home', { title: 'Home' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
