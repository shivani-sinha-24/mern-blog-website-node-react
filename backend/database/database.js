import mongoose from "mongoose";

async function main() {
    try {
      await mongoose.connect(process.env.MONGOOSE_CONNECTION_LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
}

export default main