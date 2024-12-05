import React, { useState, useEffect } from "react";
import { createProject, getAllProjects } from "../apis/propertyApi"; // Import the API function
import MediaSection from "../components/MediaSection"; // Import the MediaSection component
import "./AddProperty.css";

const AddPropertyWithDisplay = () => {
  const initialFormData = {
    city: "New York",
    locality: "Brooklyn",
    sublocality: "Downtown",
    builderName: "Dream Builders",
    projectName: "Skyline Heights",
    companyName: "Dream Homes Inc.",
    launchDate: "2024-01-01",
    shortCode: "SH001",
    deliveryStatus: "Ongoing",
    deliveryDate: "2025-12-31",
    reraNumber: "RERA12345",
    totalTowers: 5,
    totalFlats: 200,
    towerPhaseWise: "Phase 1: 3 Towers, Phase 2: 2 Towers",
    constructionType: "Reinforced Concrete",
    propertyCategory: "Residential",
    propertyType: "Apartment",
    sectorBriefing: "Located near tech hubs",
    projectBriefing: "Luxurious apartments with modern amenities",
    masterLayoutPlan: "", // Initially empty, will be updated with image URL
    brochure: "", // Initially empty, will be updated with brochure URL
  };

  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null); // To display the result
  const [message, setMessage] = useState("");
  const [properties, setProperties] = useState([]); // To store all properties

  // Fetch all properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getAllProjects();
        setProperties(response);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProject(formData);
      setMessage(response.message || "Property added successfully!");
      setResult(formData); // Store the submitted data to display
      setFormData(initialFormData); // Reset form
    } catch (error) {
      setMessage(
        error.message || "An error occurred while adding the property."
      );
    }
    window.location.reload();
  };

  // Function to update masterLayoutPlan with the uploaded image URL
  const updateMasterLayoutPlan = (url) => {
    setFormData({ ...formData, masterLayoutPlan: url });
  };

  // Function to update brochure with the uploaded brochure URL
  const updateBrochure = (url) => {
    setFormData({ ...formData, brochure: url });
  };

  return (
    <div className="add-property-container">
      <div class="project-container-unique">
        <img
          src="https://s3-alpha-sig.figma.com/img/74aa/e3e8/cdd0d4f7b802b64bbf4005a3c9908832?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h4T7KCFUAQTRXQqM17JgEGuKpnDkczSwa3h9LtgyWaxe9eZx1dRIgnJT2W0OLr06VXvBNw9YJu-1Nt300QEdf5BVoRf-BNKj3Ew4FLHgGtcUpJZ-nQPRr-tSiszSlnat0lBkNR2XZ1ydM9CeYJJMeJY76FndNcbnhGeI3Q7nFNrsBXdUGoTjCDGrQ1o7mcGev1~tBYEvdNRED69BmUcJEfXaniqL-tdNZd6QzFRIKguVWIkookfDpjPse51x~nrWsv76IPr33siy25yc6PvoY6Op5XykanuGv~9LoqfGPc3NmFKAv8dQmBz5HOZz8BXgITbVNwgVbLSKtP-iqbqxVA__"
          alt="Project Icon"
          class="project-image-unique"
        />
        <h2 class="project-title-unique">Add New Project</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* City */}
        <div className="form-group">
          <label htmlFor="city">City:</label>{" "}
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        {/* Locality */}
        <div className="form-group">
          <label htmlFor="locality">Locality:</label>
          <input
            type="text"
            id="locality"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            required
          />
        </div>

        {/* Sublocality */}
        <div className="form-group">
          <label htmlFor="sublocality">Sublocality/Society:</label>
          <input
            type="text"
            id="sublocality"
            name="sublocality"
            value={formData.sublocality}
            onChange={handleChange}
          />
        </div>

        {/* Builder Name */}
        <div className="form-group">
          <label htmlFor="builderName">Builder Name:</label>
          <input
            type="text"
            id="builderName"
            name="builderName"
            value={formData.builderName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Project Name */}
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Company Name */}
        <div className="form-group">
          <label htmlFor="companyName">
            Company Under Which the Project is Launched:
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Launch Date */}
        <div className="form-group">
          <label htmlFor="launchDate">Project Launch Date:</label>
          <input
            type="date"
            id="launchDate"
            name="launchDate"
            value={formData.launchDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Short Code */}
        <div className="form-group">
          <label htmlFor="shortCode">Project Short Code:</label>
          <input
            type="text"
            id="shortCode"
            name="shortCode"
            value={formData.shortCode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Delivery Status */}
        <div className="form-group">
          <label htmlFor="deliveryStatus">Delivery Status:</label>
          <input
            type="text"
            id="deliveryStatus"
            name="deliveryStatus"
            value={formData.deliveryStatus}
            onChange={handleChange}
          />
        </div>

        {/* Delivery Date */}
        <div className="form-group">
          <label htmlFor="deliveryDate">Delivery Date:</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
          />
        </div>

        {/* RERA Number */}
        <div className="form-group">
          <label htmlFor="reraNumber">RERA Number:</label>
          <input
            type="text"
            id="reraNumber"
            name="reraNumber"
            value={formData.reraNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Total Towers */}
        <div className="form-group">
          <label htmlFor="totalTowers">Total Towers:</label>
          <input
            type="number"
            id="totalTowers"
            name="totalTowers"
            value={formData.totalTowers}
            onChange={handleChange}
            required
          />
        </div>

        {/* Total Flats */}
        <div className="form-group">
          <label htmlFor="totalFlats">Total Flats:</label>
          <input
            type="number"
            id="totalFlats"
            name="totalFlats"
            value={formData.totalFlats}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tower Phase Wise */}
        <div className="form-group">
          <label htmlFor="towerPhaseWise">Tower Phase Wise:</label>
          <input
            type="text"
            id="towerPhaseWise"
            name="towerPhaseWise"
            value={formData.towerPhaseWise}
            onChange={handleChange}
          />
        </div>

        {/* Construction Type */}
        <div className="form-group">
          <label htmlFor="constructionType">Construction Type:</label>
          <input
            type="text"
            id="constructionType"
            name="constructionType"
            value={formData.constructionType}
            onChange={handleChange}
          />
        </div>

        {/* Property Category */}
        <div className="form-group">
          <label htmlFor="propertyCategory">Property Category:</label>
          <input
            type="text"
            id="propertyCategory"
            name="propertyCategory"
            value={formData.propertyCategory}
            onChange={handleChange}
          />
        </div>

        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="propertyType">Property Type:</label>
          <input
            type="text"
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
          />
        </div>

        {/* Sector Briefing */}
        <div className="form-group">
          <label htmlFor="sectorBriefing">Sector Briefing:</label>
          <input
            type="text"
            id="sectorBriefing"
            name="sectorBriefing"
            value={formData.sectorBriefing}
            onChange={handleChange}
          />
        </div>

        {/* Project Briefing */}
        <div className="form-group">
          <label htmlFor="projectBriefing">Project Briefing:</label>
          <input
            type="text"
            id="projectBriefing"
            name="projectBriefing"
            value={formData.projectBriefing}
            onChange={handleChange}
          />
        </div>

        {/* Master Layout Plan (Image Upload) */}
        <div className="form-group">
          <label htmlFor="masterLayoutPlan">Image URL:</label>
          <input
            type="text"
            id="masterLayoutPlan"
            name="masterLayoutPlan"
            value={formData.masterLayoutPlan}
            onChange={handleChange}
          />
        </div>

        {/* Media Section for uploading image */}
        <div className="form-group">
          <label htmlFor="masterLayoutPlan">Upload Media:</label>
          <MediaSection updateMasterLayoutPlan={updateMasterLayoutPlan} />
        </div>

        {/* Brochure Upload */}
        <div className="form-group">
          <label htmlFor="brochure">Upload Brochure:</label>
          <input
            type="file"
            id="brochure"
            name="brochure"
            onChange={(e) =>
              updateBrochure(URL.createObjectURL(e.target.files[0]))
            }
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Add Property
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddPropertyWithDisplay;

// import React, { useState, useEffect } from "react";
// import { createProject, getAllProjects } from "../apis/propertyApi"; // Import the API function
// import MediaSection from "../components/MediaSection"; // Import the MediaSection component
// import "./AddProperty.css";

// const AddPropertyWithDisplay = () => {
//   const initialFormData = {
//     city: "New York",
//     locality: "Brooklyn",
//     sublocality: "Downtown",
//     builderName: "Dream Builders",
//     projectName: "Skyline Heights",
//     companyName: "Dream Homes Inc.",
//     launchDate: "2024-01-01",
//     shortCode: "SH001",
//     deliveryStatus: "Ongoing",
//     deliveryDate: "2025-12-31",
//     reraNumber: "RERA12345",
//     totalTowers: 5,
//     totalFlats: 200,
//     towerPhaseWise: "Phase 1: 3 Towers, Phase 2: 2 Towers",
//     constructionType: "Reinforced Concrete",
//     propertyCategory: "Residential",
//     propertyType: "Apartment",
//     sectorBriefing: "Located near tech hubs",
//     projectBriefing: "Luxurious apartments with modern amenities",
//     masterLayoutPlan: "", // Initially empty, will be updated with image URL
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [result, setResult] = useState(null); // To display the result
//   const [message, setMessage] = useState("");
//   const [properties, setProperties] = useState([]); // To store all properties

//   // Fetch all properties from the API
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await getAllProjects();
//         setProperties(response);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await createProject(formData);
//       setMessage(response.message || "Property added successfully!");
//       setResult(formData); // Store the submitted data to display
//       setFormData(initialFormData); // Reset form
//     } catch (error) {
//       setMessage(
//         error.message || "An error occurred while adding the property."
//       );
//     }
//     window.location.reload();
//   };

//   // Function to update masterLayoutPlan with the uploaded image URL
//   const updateMasterLayoutPlan = (url) => {
//     setFormData({ ...formData, masterLayoutPlan: url });
//   };

//   return (
//     <div className="add-property-container">
//       <h2>Add New Property</h2>
//       <form onSubmit={handleSubmit}>
//         {/* City */}
//         <div className="form-group">
//           <label htmlFor="city">City:</label>{" "}
//           <input
//             type="text"
//             id="city"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Locality */}
//         <div className="form-group">
//           <label htmlFor="locality">Locality:</label>
//           <input
//             type="text"
//             id="locality"
//             name="locality"
//             value={formData.locality}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Sublocality */}
//         <div className="form-group">
//           <label htmlFor="sublocality">Sublocality/Society:</label>
//           <input
//             type="text"
//             id="sublocality"
//             name="sublocality"
//             value={formData.sublocality}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Builder Name */}
//         <div className="form-group">
//           <label htmlFor="builderName">Builder Name:</label>
//           <input
//             type="text"
//             id="builderName"
//             name="builderName"
//             value={formData.builderName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Project Name */}
//         <div className="form-group">
//           <label htmlFor="projectName">Project Name:</label>
//           <input
//             type="text"
//             id="projectName"
//             name="projectName"
//             value={formData.projectName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Company Name */}
//         <div className="form-group">
//           <label htmlFor="companyName">
//             Company Under Which the Project is Launched:
//           </label>
//           <input
//             type="text"
//             id="companyName"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Launch Date */}
//         <div className="form-group">
//           <label htmlFor="launchDate">Project Launch Date:</label>
//           <input
//             type="date"
//             id="launchDate"
//             name="launchDate"
//             value={formData.launchDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Short Code */}
//         <div className="form-group">
//           <label htmlFor="shortCode">Project Short Code:</label>
//           <input
//             type="text"
//             id="shortCode"
//             name="shortCode"
//             value={formData.shortCode}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Delivery Status */}
//         <div className="form-group">
//           <label htmlFor="deliveryStatus">Delivery Status:</label>
//           <input
//             type="text"
//             id="deliveryStatus"
//             name="deliveryStatus"
//             value={formData.deliveryStatus}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Delivery Date */}
//         <div className="form-group">
//           <label htmlFor="deliveryDate">Delivery Date:</label>
//           <input
//             type="date"
//             id="deliveryDate"
//             name="deliveryDate"
//             value={formData.deliveryDate}
//             onChange={handleChange}
//           />
//         </div>

//         {/* RERA Number */}
//         <div className="form-group">
//           <label htmlFor="reraNumber">RERA Number:</label>
//           <input
//             type="text"
//             id="reraNumber"
//             name="reraNumber"
//             value={formData.reraNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Total Towers */}
//         <div className="form-group">
//           <label htmlFor="totalTowers">Total Towers:</label>
//           <input
//             type="number"
//             id="totalTowers"
//             name="totalTowers"
//             value={formData.totalTowers}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Total Flats */}
//         <div className="form-group">
//           <label htmlFor="totalFlats">Total Flats:</label>
//           <input
//             type="number"
//             id="totalFlats"
//             name="totalFlats"
//             value={formData.totalFlats}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Tower Phase Wise */}
//         <div className="form-group">
//           <label htmlFor="towerPhaseWise">Tower Phase Wise:</label>
//           <input
//             type="text"
//             id="towerPhaseWise"
//             name="towerPhaseWise"
//             value={formData.towerPhaseWise}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Construction Type */}
//         <div className="form-group">
//           <label htmlFor="constructionType">Construction Type:</label>
//           <input
//             type="text"
//             id="constructionType"
//             name="constructionType"
//             value={formData.constructionType}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Property Category */}
//         <div className="form-group">
//           <label htmlFor="propertyCategory">Property Category:</label>
//           <input
//             type="text"
//             id="propertyCategory"
//             name="propertyCategory"
//             value={formData.propertyCategory}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Property Type */}
//         <div className="form-group">
//           <label htmlFor="propertyType">Property Type:</label>
//           <input
//             type="text"
//             id="propertyType"
//             name="propertyType"
//             value={formData.propertyType}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Sector Briefing */}
//         <div className="form-group">
//           <label htmlFor="sectorBriefing">Sector Briefing:</label>
//           <input
//             type="text"
//             id="sectorBriefing"
//             name="sectorBriefing"
//             value={formData.sectorBriefing}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Project Briefing */}
//         <div className="form-group">
//           <label htmlFor="projectBriefing">Project Briefing:</label>
//           <input
//             type="text"
//             id="projectBriefing"
//             name="projectBriefing"
//             value={formData.projectBriefing}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Master Layout Plan */}
//         <div className="form-group">
//           <label htmlFor="masterLayoutPlan">Image URL:</label>
//           <input
//             type="text"
//             id="masterLayoutPlan"
//             name="masterLayoutPlan"
//             value={formData.masterLayoutPlan}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Media Section for uploading image */}
//         <div className="form-group">
//           <label htmlFor="masterLayoutPlan">Upload Media:</label>
//           <MediaSection updateMasterLayoutPlan={updateMasterLayoutPlan} />
//         </div>

//         {/* Submit button */}
//         <button type="submit" className="submit-button">
//           Add Property
//         </button>
//       </form>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default AddPropertyWithDisplay;

// import React, { useState, useEffect } from "react";
// import { createProject, getAllProjects } from "../apis/propertyApi"; // Import the API function
// import "./AddProperty.css";

// const AddPropertyWithDisplay = () => {
//   const initialFormData = {
//     city: "New York",
//     locality: "Brooklyn",
//     sublocality: "Downtown",
//     builderName: "Dream Builders",
//     projectName: "Skyline Heights",
//     companyName: "Dream Homes Inc.",
//     launchDate: "2024-01-01",
//     shortCode: "SH001",
//     deliveryStatus: "Ongoing",
//     deliveryDate: "2025-12-31",
//     reraNumber: "RERA12345",
//     totalTowers: 5,
//     totalFlats: 200,
//     towerPhaseWise: "Phase 1: 3 Towers, Phase 2: 2 Towers",
//     constructionType: "Reinforced Concrete",
//     propertyCategory: "Residential",
//     propertyType: "Apartment",
//     sectorBriefing: "Located near tech hubs",
//     projectBriefing: "Luxurious apartments with modern amenities",
//     masterLayoutPlan: "URL-to-layout-plan",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [result, setResult] = useState(null); // To display the result
//   const [message, setMessage] = useState("");
//   const [properties, setProperties] = useState([]); // To store all properties

//   // Fetch all properties from the API
//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await getAllProjects();
//         setProperties(response);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await createProject(formData);
//       setMessage(response.message || "Property added successfully!");
//       setResult(formData); // Store the submitted data to display
//       setFormData(initialFormData); // Reset form
//     } catch (error) {
//       setMessage(
//         error.message || "An error occurred while adding the property."
//       );
//     }
//     window.location.reload();
//   };

//   return (
//     <div className="add-property-container">
//       <h2>Add New Property</h2>
//         <button type="submit" className="submit-button">
//           Add Property
//         </button>
//       </form>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default AddPropertyWithDisplay;
