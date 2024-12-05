import axios from "axios";

const BASE_URL = "http://localhost:8021/api/projects"; // Replace with your backend URL if hosted elsewhere

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${BASE_URL}/`, projectData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get a project by ID
export const getProject = async (projectId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update a project by ID
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete a project by ID
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Get all projects
export const getAllProjects = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create a new phase for a project
export const createPhase = async (projectId, phaseData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${projectId}/phases`,
      phaseData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create a new bedroom for a project
export const createBedroom = async (projectId, bedroomData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${projectId}/bedrooms`,
      bedroomData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create a new additional feature for a project
export const createAdditionalFeature = async (projectId, featureData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${projectId}/features`,
      featureData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create new media for a project
export const createMedia = async (projectId, mediaData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${projectId}/media`,
      mediaData
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Handle errors
const handleError = (error) => {
  console.error("API call failed:", error.response?.data || error.message);
  throw error.response?.data || error.message;
};
