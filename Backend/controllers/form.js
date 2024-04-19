import Form from "../models/form.js";
import fs from 'fs'
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createUnit = async (req, res) => {
    console.log("first");
    try {
        const { doctorName, patientName, patientAge } = req.body;
        if (!doctorName || !patientName || !patientAge) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields and upload a sound file"
            });
        }
        const newFormData = {
            doctorName,
            patientName,
            patientAge,
            soundFile: {
                data: fs.readFileSync(path.join(__dirname + '/../assets/audio/' + req.file.filename)),
                contentType: 'audio/mpeg'
            }
        };
        
        const formData = await Form.create(newFormData);
        await formData.save();

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
