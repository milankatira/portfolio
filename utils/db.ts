import mongoose, { Mongoose } from "mongoose";

const MONGO_URL = process.env.NEXT_PUBLIC_MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    "Please define the NEXT_PUBLIC_MONGO_URL environment variable in .env.local"
  );
}

interface GlobalMongoose {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongooseCache: GlobalMongoose | undefined;
}

let cached: GlobalMongoose = global.mongooseCache || {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    if (!MONGO_URL) {
      throw new Error(
        "Please define the NEXT_PUBLIC_MONGO_URL environment variable in .env.local"
      );
    }

    cached.promise = mongoose.connect(MONGO_URL, opts).catch((error) => {
      console.error("❌ MongoDB connection error:", error);
      throw new Error("Failed to connect to MongoDB");
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
}

export default dbConnect;
