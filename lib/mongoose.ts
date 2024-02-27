import mongoose from "mongoose";

let isConnected = false; // variable to check if mongoose is connected

export const connectToDB = async () => {
  // mongoose.set("strictQuery", true);

  // if (!process.env.MONGODB_URL) return console.log("MongoDB URL not found");

  // if (isConnected) return console.log("Already connected to MongoDB");

  // try {
  //   await mongoose.connect(process.env.MONGODB_URL);
  //   isConnected = true;
  //   console.log("Connected to MongoDB");
  // } catch (error) {
  //   console.log("test", error);
  // }

  try {
    mongoose.connect(process.env.MONGODB_URL || "");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");

      connection.on("error", (err) => {
        console.log(
          "MongoDB Connection Error.Please make sure MongoDB is running." + err
        );
        process.exit();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

connectToDB();
