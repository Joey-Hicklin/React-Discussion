import mongoose from 'mongoose';

export const connectToDb = (mongoose) => {
  return new Promise(function(resolve, reject){
    if (mongoose.connection.readyState == 0){
      mongoose.connect('localhost:27017/nullspeakTEST', (err) => {
        if (err) {
          console.log('Err, could not connect to the database.');
          reject();
        } else {
          let db = mongoose.connection;
          console.log('connected to MONGO');
          resolve(db);
        }
      });
    } else {
      let db = mongoose.connection;
      resolve(db);
    }
  });
}
