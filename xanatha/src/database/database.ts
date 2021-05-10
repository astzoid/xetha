import mongoose from 'mongoose';
import Logger from '../utils/Logger';

export default mongoose.connect(
    process.env.MONGODB_URI ?? 'mongodb://localhost/xetha',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    },
    (err) => {
        if (err) Logger.error(err);
    },
);
