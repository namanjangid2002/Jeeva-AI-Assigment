import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/assets/audio');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${file.originalname}-${Date.now()}--${randomUUID()}.${ext}`);
    },
});
const upload = multer({ storage: multerStorage });

export default upload;