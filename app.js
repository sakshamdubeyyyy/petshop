const express = require('express');
const app = express();
const PORT = 2000;
const dotenv = require('dotenv')
dotenv.config();
const petRoutes = require("./routes/petRoutes")
const orderRoutes = require("./routes/orderRoutes")
const connectDatabase = require("./database")
connectDatabase()

app.use(express.json());

app.use("/pets", petRoutes)
app.use("/orders", orderRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})