const express = require("express")
const dotenv = require("dotenv")
const app = express()

const { ErrorHandler } = require("./middlewares/ErrorHandler")
const connectDatabase = require("./data/connectDatabase")

dotenv.config({
    path: "./config/.env"
})

const routers = require("./routers/index")

app.use(express.json());
app.use("/api", routers)
app.use(ErrorHandler)

// Database connection
connectDatabase()

const PORT = process.env.PORT
app.listen(PORT || 5000, () => {
    console.log(`Server started on ${PORT}`)
})