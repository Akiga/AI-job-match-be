const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Kết nối cơ sở dữ liệu thành công");
    } catch (err) {
        console.log(err);

        process.exit(1);
    }
};

module.exports = connectDB;