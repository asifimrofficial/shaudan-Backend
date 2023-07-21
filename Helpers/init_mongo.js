const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI_ONLINE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGO_DB
}).then(()=>{
    console.log('MongoDB connected')
}).catch((err)=>{
    console.log(err)
});

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to db')
});

mongoose.connection.on('error', (err)=>{
    console.log(err.message)
}
);
mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose connection is disconnected')
});
process.on('SIGINT', async ()=>{
    await mongoose.connection.close();
    console.log('Mongoose connection is disconnected due to app termination');
    process.exit(0);
});
process.on('SIGTERM', async ()=>{
    await mongoose.connection.close();
    console.log('Mongoose connection is disconnected due to app sigterm termination');
    process.exit(0);
});