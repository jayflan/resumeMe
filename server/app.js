const express = require('express');
const path = require('path');

const app = express();

//middleware (logging & parsing)

// static middleware

app.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);
app.use(express.static(path.join(__dirname, "..", "public")));

//api/router


//endware (error handling)
app.use((req, res, next) => {
  const error = Error('Page Not Found.');
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error.');
});

// any remaining reqs w/ an extension (.js, .css, etc...) send 404;
app.use((req, res, next) => {
  if(path.extname(req.path).length) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});


module.exports = app;
