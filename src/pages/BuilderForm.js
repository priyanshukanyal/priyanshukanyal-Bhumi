import React, { useState } from "react";
import { createBuilder } from "../apis/builderApi"; // Import the API function

const BuilderForm = () => {
  const [formData, setFormData] = useState({
    city: "",
    builderCompleteName: "",
    builderShortName: "",
    builderLogo: null,
    yearsInRealEstate: 0,
    shortDescription: "",
    listOfProjects: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Handle file uploads
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Math.max(0, Number(value)) }); // Prevent negative values
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new builder by calling the API function
      const response = await createBuilder(formData);
      console.log("Builder Data Submitted:", response);
      alert("Builder information submitted successfully!");

      // Reset form data after successful submission
      setFormData({
        city: "",
        builderCompleteName: "",
        builderShortName: "",
        builderLogo: null,
        yearsInRealEstate: 0,
        shortDescription: "",
        listOfProjects: "",
      });
    } catch (error) {
      console.error("Error submitting builder data:", error);
      alert("There was an error submitting the builder information.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Builder Information Form</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "15px",
        }}
      >
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="builderCompleteName"
          placeholder="Builder Complete Name"
          value={formData.builderCompleteName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="builderShortName"
          placeholder="Builder's Nick/Short Name"
          value={formData.builderShortName}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label style={labelStyle}>
          Upload Builder Logo:
          <input
            type="file"
            name="builderLogo"
            accept="image/*"
            onChange={handleChange}
            style={inputFileStyle}
          />
        </label>
        <input
          type="number"
          name="yearsInRealEstate"
          placeholder="No. of Years in Real Estate"
          value={formData.yearsInRealEstate}
          onChange={handleNumberChange}
          required
          style={inputStyle}
          min="0" // Enforces no negative values
        />
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleChange}
          rows="3"
          style={{ ...inputStyle, resize: "none" }}
        />
        <textarea
          name="listOfProjects"
          placeholder="List of Projects (comma-separated)"
          value={formData.listOfProjects}
          onChange={handleChange}
          rows="3"
          style={{ ...inputStyle, resize: "none" }}
        />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const inputFileStyle = {
  marginTop: "10px",
  padding: "5px",
};

const labelStyle = {
  fontSize: "14px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default BuilderForm;

// import React, { useState } from "react";
// import axios from "axios"; // Make sure axios is imported to make API requests

// const BuilderForm = () => {
//   const [formData, setFormData] = useState({
//     city: "",
//     builderCompleteName: "",
//     builderShortName: "",
//     builderLogo: null,
//     yearsInRealEstate: 0,
//     shortDescription: "",
//     listOfProjects: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       setFormData({ ...formData, [name]: files[0] }); // Handle file uploads
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleNumberChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: Math.max(0, Number(value)) }); // Prevent negative values
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare the form data for submission
//     const data = new FormData();
//     data.append("city", formData.city);
//     data.append("builderCompleteName", formData.builderCompleteName);
//     data.append("builderShortName", formData.builderShortName);
//     data.append("builderLogo", formData.builderLogo);
//     data.append("yearsInRealEstate", formData.yearsInRealEstate);
//     data.append("shortDescription", formData.shortDescription);
//     data.append("listOfProjects", formData.listOfProjects);

//     try {
//       // Make API call to create a builder
//       const response = await axios.post(
//         "http://localhost:8021/api/builder",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Important for file uploads
//           },
//         }
//       );

//       console.log("Builder Data Submitted:", response.data);
//       alert("Builder information submitted successfully!");

//       // Clear the form after submission
//       setFormData({
//         city: "",
//         builderCompleteName: "",
//         builderShortName: "",
//         builderLogo: null,
//         yearsInRealEstate: 0,
//         shortDescription: "",
//         listOfProjects: "",
//       });
//     } catch (error) {
//       console.error("Error submitting builder data:", error);
//       alert("Failed to submit builder information. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         backgroundColor: "#f9f9f9",
//       }}
//     >
//       <h2 style={{ marginBottom: "20px" }}>Builder Information Form</h2>
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           width: "300px",
//           gap: "15px",
//         }}
//       >
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={formData.city}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           type="text"
//           name="builderCompleteName"
//           placeholder="Builder Complete Name"
//           value={formData.builderCompleteName}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <input
//           type="text"
//           name="builderShortName"
//           placeholder="Builder's Nick/Short Name"
//           value={formData.builderShortName}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />
//         <label style={labelStyle}>
//           Upload Builder Logo:
//           <input
//             type="file"
//             name="builderLogo"
//             accept="image/*"
//             onChange={handleChange}
//             style={inputFileStyle}
//           />
//         </label>
//         <input
//           type="number"
//           name="yearsInRealEstate"
//           placeholder="No. of Years in Real Estate"
//           value={formData.yearsInRealEstate}
//           onChange={handleNumberChange}
//           required
//           style={inputStyle}
//           min="0" // Enforces no negative values
//         />
//         <textarea
//           name="shortDescription"
//           placeholder="Short Description"
//           value={formData.shortDescription}
//           onChange={handleChange}
//           rows="3"
//           style={{ ...inputStyle, resize: "none" }}
//         />
//         <textarea
//           name="listOfProjects"
//           placeholder="List of Projects (comma-separated)"
//           value={formData.listOfProjects}
//           onChange={handleChange}
//           rows="3"
//           style={{ ...inputStyle, resize: "none" }}
//         />
//         <button type="submit" style={buttonStyle}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// const inputStyle = {
//   padding: "10px",
//   fontSize: "14px",
//   border: "1px solid #ccc",
//   borderRadius: "5px",
// };

// const inputFileStyle = {
//   marginTop: "10px",
//   padding: "5px",
// };

// const labelStyle = {
//   fontSize: "14px",
//   marginBottom: "10px",
// };

// const buttonStyle = {
//   padding: "10px",
//   fontSize: "16px",
//   backgroundColor: "#007BFF",
//   color: "#fff",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// export default BuilderForm;
