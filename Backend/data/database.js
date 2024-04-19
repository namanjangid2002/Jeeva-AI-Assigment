import mongoose, { mongo } from "mongoose";

export const connectDB = () => {
mongoose.connect("mongodb+srv://rscontractors1982:Jd4AzpIyCLzqOf6l@cluster0.cpxgyxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        dbName: "Form-Data-JEEVA-AI",
    })
        .then((c) => console.log(`DB Connected with ${c.connection.host}`))
        .catch((e) => console.log(e));
};
// {Jd4AzpIyCLzqOf6l}