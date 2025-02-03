import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Env variable MONGO_URI is missing");
    }

    if (mongoose.connection.readyState >= 1) return;

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "taskmanager",
    });

    return connection;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
