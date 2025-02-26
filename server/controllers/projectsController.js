const Project = require('../model/project');


const getAllProjects = async (req, res) => {
    try {
      // Fetch all projects from the database
      const projects = await Project.find();
  
      // Check if there are no projects
      if (projects.length === 0) {
        return res.status(404).json({ message: "No projects found." });
      }
  
      // Return the projects
      res.status(200).json({ projects });
  
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };



const addProject = async (req, res) => {
  try {
    const { title, description, repoLink, framer } = req.body;

   
    if (!title || !repoLink || !framer) {
      return res.status(400).json({ message: "Title, repoLink, and framer are required." });
    }

    const newProject = new Project({
      title,
      description,
      repoLink,
      framer
    });

    await newProject.save();

    return res.status(201).json({
      message: "Project added successfully",
      project: newProject
    });

  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};






const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if project ID is provided
    if (!id) {
      return res.status(400).json({ message: "Project ID is required." });
    }

    // Find and delete the project
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    return res.status(200).json({ message: "Project deleted successfully", project: deletedProject });

  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};




module.exports = {
    getAllProjects,
    addProject,
    deleteProject
}