import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/uploads/');
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
        cb(null, uniqueSuffix);
        console.log(file);
    }
});

const upload = multer({ storage: storage });

export default upload;