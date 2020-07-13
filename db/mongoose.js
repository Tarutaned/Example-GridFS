const mongoose = require('mongoose')
const validator = require('validator')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const crypto = require('crypto')
const path = require('path')
const multer = require('multer')

const connectionURI = 'mongodb://127.0.0.1:27017/example'
const conn = mongoose.createConnection(connectionURI)

// mongoose.connect(connectionURL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }).then( (result) => {
//     console.log('[+] Connected to Mongoose')
// }).catch( (error) => {
//     console.log("[-] Failed to connect to MongoDB.")
//     console.log("[-] connectionURL = " + connectionURL)
//     console.log(error)
// })

// Init gfs
let gfs

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

// Create Storage engine
const storage = new GridFsStorage({
    url: connectionURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });

  module.exports = upload