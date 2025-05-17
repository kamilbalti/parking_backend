const express = require('express')
const app = express()
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const db = process.env.DATABASE
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connection successful')
}).catch((err) => console.log("Error : " + err))



app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url} RESPONSE: ${res}`);
    next();
});
  
const bd = require("body-parser")

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000", "https://parking-frontend-roan.vercel.app"], // Adjust as needed
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
};

app.use(cors(corsOptions));

app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json());

const auth = require('./routes/auth/auth')
const addArea = require('./routes/post/addArea')
const addSubArea = require('./routes/post/addSubArea')
const profile = require('./routes/post/Profile')
const book = require('./routes/post/book')
const getArea = require('./routes/get/getArea')
const getSubArea = require('./routes/get/getSubArea')
const getSlots = require('./routes/get/getSlots')
const getAllSlots = require('./routes/get/getAllSlot')
const getBook = require('./routes/get/getBook')
const getAllBook = require('./routes/get/getAllBook')
const getBookDetail = require('./routes/get/getBookDetail')
const getUser = require('./routes/get/getUsers')

app.get("/", (req, res) => {
    res.status(200).send("<h1>Welcome to the Backend of Parkin App</h1>")
})

app.use("/auth", auth)
app.use("/profile", profile)
app.use("/parking/addArea", addArea)
app.use("/parking/book", book)
app.use("/parking/addSubArea", addSubArea)
app.use("/parking/getArea", getArea)
app.use("/parking/getSubArea", getSubArea)
app.use("/parking/getSlots", getSlots)
app.use("/parking/getAllSlots", getAllSlots)
app.use("/parking/getBook", getBook)
app.use("/parking/getAllBook", getAllBook)
app.use("/parking/getBookDetail", getBookDetail)
app.use("/parking/getUsers", getUser)



const port = process.env.PORT;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`Local API on ${port}`));
}

module.exports = app;