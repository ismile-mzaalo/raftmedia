import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    const dbURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

    const conn = await mongoose.connect(dbURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);

    console.log(`-- MongoDB Connected: ${conn.connection.host} --`);
  } catch (error) {
    console.error(`Error:${error}`);
    process.exit(1);
  }
};

export { connectDB };
