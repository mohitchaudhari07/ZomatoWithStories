const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 60000,
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
        if (err) {
          console.log("Cloudinary Upload Error:", err);
          return reject(err);
        }

        console.log("Cloudinary Success:", result.secure_url);

        resolve({
          videoUrl: result.secure_url,
        });
      },
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

module.exports = {
  uploadFile,
};
