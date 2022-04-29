import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected to ${process.env.MONGODB_URL}`);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
