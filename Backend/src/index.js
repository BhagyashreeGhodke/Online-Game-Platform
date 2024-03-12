//Backend/src/index.js
// require('dotenv').config({path: '../../env'});
import dotenv from "dotenv";
import connectDB from "./db/index.db.js";
import { app } from "./app.js"

dotenv.config({
    path:'../.env'
});

const port = process.env.PORT || 3000

connectDB()
.then( () => {
    app.on("error", (error) => {
        console.log("errrror:", error);
        throw error
    })
    app.listen(port, () => {
        console.log(`Server is running at port: ${port}`);
    })
})
.catch( (error) => {
    console.log("Mongo DB connection failed !!!", error);

})

