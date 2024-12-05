import React, { useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const MediaSection = ({ updateMasterLayoutPlan }) => {
  const [images, setImages] = useState([]); // State to store selected images
  const [imageUrls, setImageUrls] = useState([]); // State to store uploaded image URLs
  const [uploading, setUploading] = useState(false); // State to manage uploading status

  // Function to upload the image to Azure Blob Storage
  const uploadToAzure = async (file) => {
    const accountName = "bhoomistorage2024";
    const containerName = "newbhumidata"; // Ensure this is the correct container name
    const blobSasToken =
      "sp=racwdli&st=2024-12-04T14:25:54Z&se=2025-12-04T22:25:54Z&sv=2022-11-02&sr=c&sig=yY3GKRKA9mX8N4BtwK%2F0t5v%2B%2BkgiPaAMQX%2FMDUmY6is%3D";

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${blobSasToken}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobName = `photos/${Date.now()}-${file.name}`; // Unique file name
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      // Upload the file to Azure Blob Storage
      await blockBlobClient.uploadBrowserData(file);
      const uploadedUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
      return uploadedUrl;
    } catch (error) {
      console.error("Azure Upload Error:", error);
      return null;
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages); // Set the selected images
  };

  // Handle image upload
  const handleUpload = async () => {
    if (images.length > 0) {
      setUploading(true); // Set uploading state to true

      const uploadedUrls = [];
      for (const image of images) {
        const uploadedUrl = await uploadToAzure(image); // Upload each image
        if (uploadedUrl) {
          uploadedUrls.push(uploadedUrl); // Add URL to the array
        }
      }

      setImageUrls(uploadedUrls); // Set all uploaded image URLs
      updateMasterLayoutPlan(uploadedUrls); // Update masterLayoutPlan field in parent component
      setUploading(false); // Set uploading state to false
    }
  };

  return (
    <section className="form-section">
      <h2>Photos & Images</h2>

      {/* File input for selecting images */}
      <div className="input-group">
        <label htmlFor="imageUpload">Upload Images</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          multiple // Allow multiple file selection
          onChange={handleImageChange}
        />
      </div>

      {/* Show image previews after selection */}
      {images.length > 0 && (
        <div className="image-preview">
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Selected ${index + 1}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                margin: "5px",
              }}
            />
          ))}
        </div>
      )}

      {/* Upload button */}
      <div className="input-group">
        <button
          onClick={handleUpload}
          disabled={uploading || images.length === 0}
          style={{ marginTop: "10px" }}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* Show the uploaded image URLs */}
      {imageUrls.length > 0 && (
        <div className="uploaded-info">
          <h3>Uploaded Image URLs:</h3>
          <ul>
            {imageUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default MediaSection;

// import React, { useState } from "react";
// import { BlobServiceClient } from "@azure/storage-blob";

// const MediaSection = () => {
//   const [image, setImage] = useState(null); // State to store the selected image
//   const [imageUrl, setImageUrl] = useState(""); // State to store the uploaded image URL
//   const [uploading, setUploading] = useState(false); // State to manage uploading status

//   // Function to upload the image to Azure Blob Storage
//   const uploadToAzure = async (file) => {
//     const accountName = "bhoomistorage2024";
//     const containerName = "newbhumidata"; // Ensure this is the correct container name
//     const blobSasToken =
//       "sp=racwdli&st=2024-12-04T14:25:54Z&se=2025-12-04T22:25:54Z&sv=2022-11-02&sr=c&sig=yY3GKRKA9mX8N4BtwK%2F0t5v%2B%2BkgiPaAMQX%2FMDUmY6is%3D";

//     // Construct the BlobServiceClient with the correct SAS token
//     const blobServiceClient = new BlobServiceClient(
//       `https://${accountName}.blob.core.windows.net?${blobSasToken}`
//     );
//     const containerClient = blobServiceClient.getContainerClient(containerName);

//     const blobName = `photos/${Date.now()}-${file.name}`; // Unique file name
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//     try {
//       // Upload the file to Azure Blob Storage
//       await blockBlobClient.uploadBrowserData(file);
//       const uploadedUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
//       return uploadedUrl;
//     } catch (error) {
//       console.error("Azure Upload Error:", error);
//       return null;
//     }
//   };

//   // Handle image selection
//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     if (selectedImage) {
//       setImage(selectedImage); // Set the selected image file
//     }
//   };

//   // Handle image upload
//   const handleUpload = async () => {
//     if (image) {
//       setUploading(true); // Set uploading state to true
//       const uploadedUrl = await uploadToAzure(image); // Upload the image
//       if (uploadedUrl) {
//         setImageUrl(uploadedUrl); // Set the uploaded image URL
//       }
//       setUploading(false); // Set uploading state to false
//     }
//   };

//   return (
//     <section className="form-section">
//       <h2>Photos & Images</h2>

//       {/* File input for selecting an image */}
//       <div className="input-group">
//         <label htmlFor="imageUpload">Upload Image</label>
//         <input
//           type="file"
//           id="imageUpload"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//       </div>

//       {/* Show image preview after selection */}
//       {image && (
//         <div className="image-preview">
//           <img
//             src={URL.createObjectURL(image)}
//             alt="Selected"
//             style={{ width: "200px", height: "200px", objectFit: "cover" }}
//           />
//         </div>
//       )}

//       {/* Upload button */}
//       <div className="input-group">
//         <button
//           onClick={handleUpload}
//           disabled={uploading || !image}
//           style={{ marginTop: "10px" }}
//         >
//           {uploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {/* Show the uploaded image URL */}
//       {imageUrl && (
//         <div className="uploaded-info">
//           <h3>Uploaded Image URL:</h3>
//           <a href={imageUrl} target="_blank" rel="noopener noreferrer">
//             {imageUrl}
//           </a>
//         </div>
//       )}

//       {/* Submit button */}
//       <div className="input-group">
//         <button onClick={() => alert("Form submitted!")} disabled={!imageUrl}>
//           Submit
//         </button>
//       </div>
//     </section>
//   );
// };

// export default MediaSection;

// // import React, { useState } from "react";
// // import { BlobServiceClient } from "@azure/storage-blob";

// // const MediaSection = ({ updateFormData }) => {
// //   const [media, setMedia] = useState({
// //     photos: [],
// //     videos: [],
// //   });

// //   const uploadToAzure = async (file, folder) => {
// //     const accountName = "bhoomistorage2024";
// //     const containerName = "bhoomidata";
// //     const sasToken =
// //       "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2100-12-04T22:05:35Z&st=2024-12-04T14:05:35Z&spr=https,http&sig=mzWHnU9XmHK4hcJIFp6k3Tjqfxmt47eLBjsdFO7vnvg%3D";

// //     const blobServiceClient = new BlobServiceClient(
// //       `https://${accountName}.blob.core.windows.net/${sasToken}`
// //     );
// //     const containerClient = blobServiceClient.getContainerClient(containerName);

// //     const blobName = `${folder}/${Date.now()}-${file.name}`;
// //     const blockBlobClient = containerClient.getBlockBlobClient(blobName);

// //     try {
// //       await blockBlobClient.uploadBrowserData(file);
// //       return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
// //     } catch (error) {
// //       console.error("Azure Upload Error:", error);
// //       return null;
// //     }
// //   };

// //   const handlePhotoUpload = async (e) => {
// //     const files = Array.from(e.target.files);
// //     const uploadedPhotos = [];

// //     for (const file of files) {
// //       const url = await uploadToAzure(file, "photos");
// //       if (url) {
// //         uploadedPhotos.push({ file, caption: "", url });
// //       }
// //     }

// //     const updatedPhotos = [...media.photos, ...uploadedPhotos].slice(0, 10);
// //     const updatedMedia = { ...media, photos: updatedPhotos };
// //     setMedia(updatedMedia);
// //     updateFormData("media", updatedMedia);
// //   };

// //   const handleVideoUpload = async (e) => {
// //     const files = Array.from(e.target.files);
// //     const uploadedVideos = [];

// //     for (const file of files) {
// //       const url = await uploadToAzure(file, "videos");
// //       if (url) {
// //         uploadedVideos.push({ file, url });
// //       }
// //     }

// //     const updatedVideos = [...media.videos, ...uploadedVideos].slice(0, 2);
// //     const updatedMedia = { ...media, videos: updatedVideos };
// //     setMedia(updatedMedia);
// //     updateFormData("media", updatedMedia);
// //   };

// //   return (
// //     <section className="form-section">
// //       <h2>Photos & Images </h2>
// //       {/* Photo Upload */}
// //       <div className="input-group">
// //         <label htmlFor="photoUpload">Upload Photos (Max 10)</label>
// //         <input
// //           type="file"
// //           id="photoUpload"
// //           accept="image/*"
// //           multiple
// //           onChange={handlePhotoUpload}
// //           disabled={media.photos.length >= 10}
// //         />
// //       </div>
// //       {media.photos.map((photo, index) => (
// //         <div key={index} className="media-item">
// //           <img
// //             src={photo.url || URL.createObjectURL(photo.file)}
// //             alt={`Uploaded photo ${index + 1}`}
// //             style={{ width: "100px", height: "100px", objectFit: "cover" }}
// //           />
// //         </div>
// //       ))}
// //       {/* Video Upload */}
// //       <div className="input-group">
// //         <label htmlFor="videoUpload">Upload Videos (Max 2)</label>
// //         <input
// //           type="file"
// //           id="videoUpload"
// //           accept="video/*"
// //           multiple
// //           onChange={handleVideoUpload}
// //           disabled={media.videos.length >= 2}
// //         />
// //       </div>
// //       {media.videos.map((video, index) => (
// //         <div key={index} className="media-item">
// //           <video
// //             src={video.url || URL.createObjectURL(video.file)}
// //             style={{ width: "200px" }}
// //             controls
// //           />
// //         </div>
// //       ))}
// //     </section>
// //   );
// // };

// // export default MediaSection;
