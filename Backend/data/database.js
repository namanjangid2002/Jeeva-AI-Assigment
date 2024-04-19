import mongoose, { mongo } from "mongoose";

export const connectDB = () => {
mongoose.connect("mongodb://localhost:27017/formDatabase", {
        dbName: "Form-Data-JEEVA-AI",
    })
        .then((c) => console.log(`DB Connected with ${c.connection.host}`))
        .catch((e) => console.log(e));
};
