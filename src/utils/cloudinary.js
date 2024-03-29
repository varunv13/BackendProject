import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import { response } from "express";
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:  process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return 0;
        // upload the file on cloudinary
        const response =  await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded succesfully
        console.log("File is uploaded on cloudinay", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // removes the locally saved temp. files as the upload operation gets failed
        return null;
    }
}

export { uploadOnCloudinary };