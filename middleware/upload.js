const multer = require("multer");
const path = require("path");
const fs = require("fs");

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, "uploads");
    },

    filename(req, file, cb) {

        const fileName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, fileName);
    }

});

const upload = multer({

    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter(req, file, cb) {

        if (file.mimetype !== "application/pdf") {

            return cb(new Error("Chỉ chấp nhận file PDF"));

        }

        cb(null, true);

    }

});

module.exports = upload;