import multer from 'multer';
import path from 'path';

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory to save files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Ensure the original file extension is preserved
    const fileExtension = path.extname(file.originalname); // Get file extension
    cb(null, uniqueSuffix + fileExtension); // Save with original extension
  },
});

// Initialize Multer with storage
export const upload = multer({ storage });
