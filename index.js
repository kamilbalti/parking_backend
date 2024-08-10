const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const http = require("http")
// const connection = require('./connect')

const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
// connection()
const db = process.env.DATABASE
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connection successful')
}).catch((err) => console.log("Error : " + err))




const bd = require("body-parser")
const cors = require("cors")
app.use(cors())
app.use(bd.urlencoded({
    extended: false
}))
app.use(bd.json());
// const { Server } = require("socket.io");
// const server = http.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ['GET', 'POST', 'PUT']
//     }
// })
// io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`)
//     socket.on("join_room", (data) => {
//         socket.join(data)
//         console.log(`User with ID: ${socket.id} joined room ${data}`)
//     })
//     socket.on('disconnect', () => {
//         console.log("User Disconnected", socket.id)
//     })
// })

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
    res.status(200).send("<h1>Welcome to the Backend of Parking App</h1>")
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
app.use("/parking/getAllSlots", getAllBook)
app.use("/parking/getBookDetail", getBookDetail)
app.use("/parking/getUsers", getUser)



const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})