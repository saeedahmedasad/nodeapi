import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "todoListApp" })
    .then(() => {
      console.log("MONGODB CONNECTED");
    });
};
