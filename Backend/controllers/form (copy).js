import Form from "../models/form.js";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';

// Create a multer instance for handling file uploads
import { memoryStorage } from 'multer';
import multer from 'multer';

// const storage = memoryStorage();
// const upload = multer({ storage: storage });

export const createUnit = async (req, res) => {
    console.log("first");
    try {
        const { doctorName, patientName, patientAge } = req.body;
        // const soundFile = req.file; // Uploaded file
        console.log(req);
        // console.log(req.formData);
        if (!doctorName || !patientName || !patientAge) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields and upload a sound file"
            });
        }

        // Debugging: Log request body
        console.log("Request Body:", req.body);

        // Debugging: Log uploaded file
        // console.log("Uploaded File:", soundFile);

        const newFormData = {
            doctorName,
            patientName,
            patientAge,
            // soundFile: {
            //     data: await fs.readFile(soundFile.path), // Convert file buffer to binary data
            //     contentType: soundFile.mimetype // Get file MIME type
            // }
        };

        // Debugging: Log new form data
        console.log("New Form Data:", newFormData);

        const formData = await Form.create(newFormData);
        await formData.save();

        // Debugging: Log saved form data
        console.log("Saved Form Data:", formData);

        // Delete temporary file
        // await fs.unlink(soundFile.path);

        return res.status(201).json({
            success: true,
            message: 'Form Submitted Successfully',
            formData
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getLastSubmission = async (req, res) => {
    try {
        const lastSubmission = await Form.findOne().sort({ recordingDate: -1 });
        if (!lastSubmission) {
            return res.status(404).json({
                success: false,
                message: 'No form submission found'
            });
        }
        return res.status(200).json({
            success: true,
            formData: lastSubmission
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
