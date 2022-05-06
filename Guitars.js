import mongoose from 'mongoose';
import { connectionString } from './credentials.js';
const { Schema } = mongoose;

mongoose.connect(connectionString, {
    dbName: 'it122project',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const guitarSchema = new Schema({
 model: { type: String, required: true },
 make: String,
 type: String,
 year: String,
});

export const Guitar = mongoose.model('Guitar', guitarSchema);