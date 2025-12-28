import mongoose from "mongoose";

export async function connect() {
  try {
    const mongo_uri = process.env.MONGO_URL!;

    if (!mongo_uri) {
      console.log("mongouri not found\n");
    } else {
      console.log("uri found\n");
    }
    await mongoose.connect(mongo_uri); // !-confirms typescript that it is always available
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully...");
    });

    connection.on("error", (err) => {
      console.log("MongoDB connection error...\n" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
