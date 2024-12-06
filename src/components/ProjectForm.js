import React, { useState } from "react";
import { createProject, updateProject } from "../apis/propertyApi.js";

const ProjectForm = ({ fetchProjects, projectToEdit = null }) => {
  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    sublocality: "",
    builderName: "",
    projectName: "",
    companyName: "",
    launchDate: "",
    shortCode: "",
    deliveryStatus: "",
    deliveryDate: "",
    reraNumber: "",
    totalTowers: "",
    totalFlats: "",
    towerPhaseWise: "",
    constructionType: "",
    propertyCategory: "",
    propertyType: "",
    sectorBriefing: "",
    projectBriefing: "",
    masterLayoutPlan: [{ layoutUrl: "", description: "" }],
    phases: [{ phaseNumber: "", reraNumber: "", status: "", deliveryDate: "" }],
    bedrooms: [
      { size: "", superArea: "", priceRangeMin: "", priceRangeMax: "" },
    ],
    media: [{ type: "", url: "", caption: "" }],
  });

  const handleInputChange = (e, group) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [group]: formData[group].map((item, index) =>
        index === parseInt(name.split("-")[1]) ? { ...item, value } : item
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (projectToEdit) {
        await updateProject(projectToEdit.id, formData);
      } else {
        await createProject(formData);
      }
      setFormData({
        city: "",
        locality: "",
        sublocality: "",
        builderName: "",
        projectName: "",
        companyName: "",
        launchDate: "",
        shortCode: "",
        deliveryStatus: "",
        deliveryDate: "",
        reraNumber: "",
        totalTowers: "",
        totalFlats: "",
        towerPhaseWise: "",
        constructionType: "",
        propertyCategory: "",
        propertyType: "",
        sectorBriefing: "",
        projectBriefing: "",
        masterLayoutPlan: [{ layoutUrl: "", description: "" }],
        phases: [
          { phaseNumber: "", reraNumber: "", status: "", deliveryDate: "" },
        ],
        bedrooms: [
          { size: "", superArea: "", priceRangeMin: "", priceRangeMax: "" },
        ],
        media: [{ type: "", url: "", caption: "" }],
      });
      fetchProjects();
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const handleAddSection = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], { value: "" }],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="city"
        value={formData.city}
        placeholder="City"
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        required
      />
      <input
        type="text"
        name="projectName"
        value={formData.projectName}
        placeholder="Project Name"
        onChange={(e) =>
          setFormData({ ...formData, projectName: e.target.value })
        }
        required
      />
      {/* Add all other fields as required */}
      {/* Handle dynamic inputs for sections */}
      <div>
        <button type="button" onClick={() => handleAddSection("phases")}>
          Add Phase
        </button>
        {formData.phases.map((phase, index) => (
          <div key={index}>
            <input
              type="text"
              name={`phase-${index}`}
              value={phase.phaseNumber}
              onChange={(e) => handleInputChange(e, "phases")}
            />
          </div>
        ))}
      </div>

      <div>
        <button type="button" onClick={() => handleAddSection("media")}>
          Add Media
        </button>
        {formData.media.map((media, index) => (
          <div key={index}>
            <input
              type="text"
              name={`media-${index}`}
              value={media.url}
              onChange={(e) => handleInputChange(e, "media")}
            />
          </div>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectForm;
