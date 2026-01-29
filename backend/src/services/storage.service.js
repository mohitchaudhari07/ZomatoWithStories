const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFile = (req) => {
  if (!req.file || !req.file.buffer) {
    throw new Error("File buffer missing");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "reels",
      },
      (err, result) => {
        if (err) return reject(err);
        resolve({
          videoUrl: result.secure_url,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};


module.exports = {
  uploadFile,
};
