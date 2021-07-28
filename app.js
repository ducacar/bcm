if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');
const Joi = require('joi');
const catchAsync = require('./utills/catchAsync');
const ExpressError = require('./utills/ExpressError')
const helmet = require('helmet')
const morgan = require('morgan')



const PORT = process.env.PORT || 3000; 

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get ('/', (req, res) => {
    res.render('home')
});

app.get ('/bcmtransportrs', (req, res) => {
    res.render('bcmtransportrs')
});

app.get ('/bcmtransporten', (req, res)=>{
    res.render('bcmtransporten')
});


app.post('/bcmtransportrs' || '/bcmtransporten', catchAsync (async(req, res, next) =>{
    const transporter = nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS
        }
    })
    const mailOptions = { 
        from: req.body.email,
        to: process.env.NODEMAILER_USER, 
        subject: `Poruka od ${req.body.email} Tema: ${req.body.subject}`,
        text: `Ime kompanije: ${req.body.company}, Pošiljka od: ${req.body.from} do: ${req.body.to} Opis pošiljke: ${req.body.message}, Broj telefona: ${req.body.number}`

    }
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.send('error')
        }else {
            console.log('Email sent: ' + info.response);
            res.send('success')            
        } 
    })
})) 

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) =>{
    const{statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).send(message)
    res.send('Something went wrong!')
})

app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];

const styleSrcUrls = [
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [

];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dgwtmmyl7/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);




app.listen(3000, ()=> {
    console.log ('Serving on port 3000')
})
