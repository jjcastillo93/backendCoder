import mongoose from "mongoose";
const URI = 'mongodb+srv://jjcastillo93:S26h938fwF4aZXXa@codecluster.w8qtyin.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose
    .connect(URI)
    .then(() => console.log("base de datos conectada"))
    .catch((error) => console.log(error));