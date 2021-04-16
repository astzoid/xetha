import mongoose from 'mongoose';
import Logger from '../utils/Logger';

export default mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}, (err) => {
    if (err) return Logger.error(err);
});