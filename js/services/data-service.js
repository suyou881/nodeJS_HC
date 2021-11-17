const mongoose = require('mongoose');
const {
    resolve
} = require('path/posix');

let database;

exports.con = function () {
    return new Promise(function (resolve, reject) {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb+srv://hc:1234@nodejs-hc.xnkwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, db) => {
            if (err) throw err;
            let suc = "connect to mongoDB succedd";
            console.log(suc);

            database = mongoose.connection;
            database.on('open', () => {
                memberSchema = new mongoose.Schema({
                    email: {
                        type: String,
                        required: true,
                        unique: true
                    },
                    password: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    birth: {
                        type: Date,
                        default: Date.now
                    },
                    point: {
                        type: Number,
                        default: 0,
                        max: 50,
                        index: true
                    },
                    image: imageSchema,
                    likes: [String],
                    any: [mongoose.Schema.Types.Mixed],
                    id: mongoose.Schema.Types.ObjectId,
                })
            })

            resolve(database);
        });
    })
}