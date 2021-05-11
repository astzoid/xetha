import mongoose from 'mongoose';

mongoose.connect(
    process.env.MONGODB_URI ?? 'mongodb://localhost/xetha',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    },
    function mongooseConnect(err) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
    },
);

export * from './lib/Blacklisted';
export * from './lib/Guild';
export * from './lib/Member';
export * from './lib/Profile';
export * from './lib/User';
