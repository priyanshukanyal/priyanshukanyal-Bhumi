import React, { useState } from "react";
import { createProject } from "../apis/propertyApi"; // Assuming you have the API functions in api.js file
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS
import ViewProperties from "../components/ProjectList"; // Adjust the path as needed

const CreatePropertyForm = () => {
  const [formData, setFormData] = useState({
    city: "Mumbai",
    locality: "Andheri",
    sublocality: "West",
    builderName: "XYZ Builders",
    projectName: "Skyline Heights",
    companyName: "XYZ Group",
    launchDate: "2024-01-15",
    shortCode: "SH123",
    deliveryStatus: "Ongoing",
    deliveryDate: "2026-12-31",
    reraNumber: "RERA12345",
    totalTowers: 5,
    totalFlats: 250,
    towerPhaseWise: "Yes",
    constructionType: "Residential",
    propertyCategory: "Luxury",
    propertyType: "Apartments",
    sectorBriefing: "Prime location with premium amenities.",
    projectBriefing: "A modern residential complex with all facilities.",
    masterLayoutPlan: {
      layoutUrl: "https://example.com/master-plan.pdf",
      description: "Detailed master layout plan.",
    },
    mediaUrls: [
      {
        type: "image",
        url: "https://example.com/image1.jpg",
        caption: "Project front view",
      },
      {
        type: "video",
        url: "https://example.com/video1.mp4",
        caption: "Walkthrough video",
      },
    ],
    phases: [
      {
        phaseNumber: 1,
        reraNumber: "RERA-PH1",
        status: "Completed",
        deliveryDate: "2023-12-31",
      },
    ],
    bedrooms: [
      {
        size: "2BHK",
        superArea: 1200,
        builtUpArea: 1000,
        carpetArea: 900,
        toilets: 2,
        balconies: 1,
        servantQuarters: 0,
        studyRoom: 0,
        poojaRoom: 1,
        pricePerSqft: 12000,
        priceRangeMin: 10000000,
        priceRangeMax: 12000000,
      },
    ],
  });

  const [responseMessage, setResponseMessage] = useState({
    message: "",
    type: "",
  });

  // Add a phase dynamically
  const addPhase = () => {
    setFormData({
      ...formData,
      phases: [
        ...formData.phases,
        {
          phaseNumber: formData.phases.length + 1,
          reraNumber: "",
          status: "Ongoing",
          deliveryDate: "",
        },
      ],
    });
  };

  // Remove a phase
  const removePhase = (index) => {
    const updatedPhases = formData.phases.filter((_, i) => i !== index);
    setFormData({ ...formData, phases: updatedPhases });
  };

  // Add a bedroom entry
  const addBedroom = () => {
    setFormData({
      ...formData,
      bedrooms: [
        ...formData.bedrooms,
        {
          size: "2BHK",
          superArea: 1200,
          builtUpArea: 1000,
          carpetArea: 900,
          toilets: 2,
          balconies: 1,
          servantQuarters: 0,
          studyRoom: 0,
          poojaRoom: 1,
          pricePerSqft: 12000,
          priceRangeMin: 10000000,
          priceRangeMax: 12000000,
        },
      ],
    });
  };

  // Remove a bedroom entry
  const removeBedroom = (index) => {
    const updatedBedrooms = formData.bedrooms.filter((_, i) => i !== index);
    setFormData({ ...formData, bedrooms: updatedBedrooms });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdProject = await createProject(formData);
      console.log("Project created successfully:", createdProject);
      setResponseMessage({
        message: "Project created successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      setResponseMessage({
        message: "Error creating project. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to the Property Management System</h1>
      <ViewProperties />
      <h2>Add new project</h2>
      {responseMessage.message && (
        <div
          className={`alert ${
            responseMessage.type === "success"
              ? "alert-success"
              : "alert-danger"
          }`}
          role="alert"
        >
          {responseMessage.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* General Information Fields */}
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.projectName}
            onChange={(e) =>
              setFormData({ ...formData, projectName: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Builder Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.builderName}
            onChange={(e) =>
              setFormData({ ...formData, builderName: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Launch Date</label>
          <input
            type="date"
            className="form-control"
            value={formData.launchDate}
            onChange={(e) =>
              setFormData({ ...formData, launchDate: e.target.value })
            }
          />
        </div>

        {/* Phases Section */}
        <div className="mb-3">
          <label className="form-label">Phases</label>
          {formData.phases.map((phase, index) => (
            <div key={index} className="mb-3 border p-3">
              <div className="mb-2">
                <label className="form-label">Phase Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={phase.phaseNumber}
                  onChange={(e) => {
                    const updatedPhases = [...formData.phases];
                    updatedPhases[index].phaseNumber = e.target.value;
                    setFormData({ ...formData, phases: updatedPhases });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">RERA Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={phase.reraNumber}
                  onChange={(e) => {
                    const updatedPhases = [...formData.phases];
                    updatedPhases[index].reraNumber = e.target.value;
                    setFormData({ ...formData, phases: updatedPhases });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Status</label>
                <input
                  type="text"
                  className="form-control"
                  value={phase.status}
                  onChange={(e) => {
                    const updatedPhases = [...formData.phases];
                    updatedPhases[index].status = e.target.value;
                    setFormData({ ...formData, phases: updatedPhases });
                  }}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={phase.deliveryDate}
                  onChange={(e) => {
                    const updatedPhases = [...formData.phases];
                    updatedPhases[index].deliveryDate = e.target.value;
                    setFormData({ ...formData, phases: updatedPhases });
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removePhase(index)}
              >
                Remove Phase
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={addPhase}>
            Add Phase
          </button>
        </div>

        {/* Bedrooms Section */}
        <div className="mb-3">
          <label className="form-label">Bedrooms</label>
          {formData.bedrooms.map((bedroom, index) => (
            <div key={index} className="mb-3 border p-3">
              <div className="mb-2">
                <label className="form-label">Bedroom Size</label>
                <input
                  type="text"
                  className="form-control"
                  value={bedroom.size}
                  onChange={(e) => {
                    const updatedBedrooms = [...formData.bedrooms];
                    updatedBedrooms[index].size = e.target.value;
                    setFormData({ ...formData, bedrooms: updatedBedrooms });
                  }}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeBedroom(index)}
              >
                Remove Bedroom
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={addBedroom}
          >
            Add Bedroom
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePropertyForm;

// import React, { useState } from "react";
// import { createProject } from "../apis/propertyApi"; // Assuming you have the API functions in api.js file
// import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS

// const CreatePropertyForm = () => {
//   const [formData, setFormData] = useState({
//     city: "Mumbai",
//     locality: "Andheri",
//     sublocality: "West",
//     builderName: "XYZ Builders",
//     projectName: "Skyline Heights",
//     companyName: "XYZ Group",
//     launchDate: "2024-01-15",
//     shortCode: "SH123",
//     deliveryStatus: "Ongoing",
//     deliveryDate: "2026-12-31",
//     reraNumber: "RERA12345",
//     totalTowers: 5,
//     totalFlats: 250,
//     towerPhaseWise: "Yes",
//     constructionType: "Residential",
//     propertyCategory: "Luxury",
//     propertyType: "Apartments",
//     sectorBriefing: "Prime location with premium amenities.",
//     projectBriefing: "A modern residential complex with all facilities.",
//     masterLayoutPlan: {
//       layoutUrl: "https://example.com/master-plan.pdf",
//       description: "Detailed master layout plan.",
//     },
//     mediaUrls: [
//       {
//         type: "image",
//         url: "https://example.com/image1.jpg",
//         caption: "Project front view",
//       },
//       {
//         type: "video",
//         url: "https://example.com/video1.mp4",
//         caption: "Walkthrough video",
//       },
//     ],
//     phases: [
//       {
//         phaseNumber: 1,
//         reraNumber: "RERA-PH1",
//         status: "Completed",
//         deliveryDate: "2023-12-31",
//       },
//     ],
//     bedrooms: [
//       {
//         size: "2BHK",
//         superArea: 1200,
//         builtUpArea: 1000,
//         carpetArea: 900,
//         toilets: 2,
//         balconies: 1,
//         servantQuarters: 0,
//         studyRoom: 0,
//         poojaRoom: 1,
//         pricePerSqft: 12000,
//         priceRangeMin: 10000000,
//         priceRangeMax: 12000000,
//       },
//     ],
//   });

//   // Add a phase dynamically
//   const addPhase = () => {
//     setFormData({
//       ...formData,
//       phases: [
//         ...formData.phases,
//         {
//           phaseNumber: formData.phases.length + 1,
//           reraNumber: "",
//           status: "Ongoing",
//           deliveryDate: "",
//         },
//       ],
//     });
//   };

//   // Remove a phase
//   const removePhase = (index) => {
//     const updatedPhases = formData.phases.filter((_, i) => i !== index);
//     setFormData({ ...formData, phases: updatedPhases });
//   };

//   // Add a bedroom entry
//   const addBedroom = () => {
//     setFormData({
//       ...formData,
//       bedrooms: [
//         ...formData.bedrooms,
//         {
//           size: "2BHK",
//           superArea: 1200,
//           builtUpArea: 1000,
//           carpetArea: 900,
//           toilets: 2,
//           balconies: 1,
//           servantQuarters: 0,
//           studyRoom: 0,
//           poojaRoom: 1,
//           pricePerSqft: 12000,
//           priceRangeMin: 10000000,
//           priceRangeMax: 12000000,
//         },
//       ],
//     });
//   };

//   // Remove a bedroom entry
//   const removeBedroom = (index) => {
//     const updatedBedrooms = formData.bedrooms.filter((_, i) => i !== index);
//     setFormData({ ...formData, bedrooms: updatedBedrooms });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const createdProject = await createProject(formData);
//       console.log("Project created successfully:", createdProject);
//       // Optionally redirect or show success message
//     } catch (error) {
//       console.error("Error creating project:", error);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Create New Property</h2>
//       <form onSubmit={handleSubmit}>
//         {/* General Information Fields */}
//         <div className="mb-3">
//           <label className="form-label">Project Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={formData.projectName}
//             onChange={(e) =>
//               setFormData({ ...formData, projectName: e.target.value })
//             }
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Builder Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={formData.builderName}
//             onChange={(e) =>
//               setFormData({ ...formData, builderName: e.target.value })
//             }
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Launch Date</label>
//           <input
//             type="date"
//             className="form-control"
//             value={formData.launchDate}
//             onChange={(e) =>
//               setFormData({ ...formData, launchDate: e.target.value })
//             }
//           />
//         </div>

//         {/* Phases Section */}
//         <div className="mb-3">
//           <label className="form-label">Phases</label>
//           {formData.phases.map((phase, index) => (
//             <div key={index} className="mb-3 border p-3">
//               <div className="mb-2">
//                 <label className="form-label">Phase Number</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={phase.phaseNumber}
//                   onChange={(e) => {
//                     const updatedPhases = [...formData.phases];
//                     updatedPhases[index].phaseNumber = e.target.value;
//                     setFormData({ ...formData, phases: updatedPhases });
//                   }}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="form-label">RERA Number</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={phase.reraNumber}
//                   onChange={(e) => {
//                     const updatedPhases = [...formData.phases];
//                     updatedPhases[index].reraNumber = e.target.value;
//                     setFormData({ ...formData, phases: updatedPhases });
//                   }}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="form-label">Status</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={phase.status}
//                   onChange={(e) => {
//                     const updatedPhases = [...formData.phases];
//                     updatedPhases[index].status = e.target.value;
//                     setFormData({ ...formData, phases: updatedPhases });
//                   }}
//                 />
//               </div>
//               <div className="mb-2">
//                 <label className="form-label">Delivery Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={phase.deliveryDate}
//                   onChange={(e) => {
//                     const updatedPhases = [...formData.phases];
//                     updatedPhases[index].deliveryDate = e.target.value;
//                     setFormData({ ...formData, phases: updatedPhases });
//                   }}
//                 />
//               </div>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => removePhase(index)}
//               >
//                 Remove Phase
//               </button>
//             </div>
//           ))}
//           <button type="button" className="btn btn-primary" onClick={addPhase}>
//             Add Phase
//           </button>
//         </div>

//         {/* Bedrooms Section */}
//         <div className="mb-3">
//           <label className="form-label">Bedrooms</label>
//           {formData.bedrooms.map((bedroom, index) => (
//             <div key={index} className="mb-3 border p-3">
//               <div className="mb-2">
//                 <label className="form-label">Bedroom Size</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={bedroom.size}
//                   onChange={(e) => {
//                     const updatedBedrooms = [...formData.bedrooms];
//                     updatedBedrooms[index].size = e.target.value;
//                     setFormData({ ...formData, bedrooms: updatedBedrooms });
//                   }}
//                 />
//               </div>
//               {/* Add other bedroom fields here */}
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={() => removeBedroom(index)}
//               >
//                 Remove Bedroom
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={addBedroom}
//           >
//             Add Bedroom
//           </button>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="btn btn-success">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePropertyForm;
