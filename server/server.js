const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const ErrorMiddleware = require('./middlewares/error');

const app = express();

const PORT = process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:8081"
};

//use

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use('/v1/api/', router);

app.use(ErrorMiddleware);

//models

const db = require('./models');
const Role = db.role;
db.sequelize.sync({
    force: true
}).then(() => {
    initial();
});

function initial() {
    Role.create({
        name: 'user'
    });
    Role.create({
        name: 'moderator'
    });
    Role.create({
        name: 'admin'
    });
}

app.listen(PORT, () => {
    console.log(`server is running: ` + PORT);
});

//routes

app.get('/', (req, res) => {
    res.json({
        message: 'start server'
    });
});


