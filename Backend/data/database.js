import mongoose, { mongo } from "mongoose";

export const connectDB = () => {
mongoose.connect("<Your Mongo DB Link URL>", {
        dbName: "Form-Data-JEEVA-AI",
    })
        .then((c) => console.log(`DB Connected with ${c.connection.host}`))
        .catch((e) => console.log(e));
};
// {Jd4AzpIyCLzqOf6l}