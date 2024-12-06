import React from "react";

const ProjectList = ({ projects, onView }) => {
  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.projectName}</h3>
          <p>City: {project.city}</p>
          <p>Builder: {project.builderName}</p>
          <button onClick={() => onView(project.id)}>View</button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
