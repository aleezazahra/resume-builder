import { Plus, Trash } from "lucide-react";

const ProjectsForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const newProject = {
      id: crypto.randomUUID(), 
      name: "",
      link: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
      
        <button 
          type="button" 
          onClick={addProject} 
          className="btn"
        >
          <Plus className="size-4" />
          Add your projects
        </button>
      </div>

      <div className="space-y-4 mt-4">
        {data.map((project, index) => (
  
          <div key={project.id || index} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex justify-between items-start">
              <h4>Project #{index + 1}</h4>
              <button 
                type="button"
                onClick={() => removeProject(index)} 
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash className="size-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input 
                value={project.name || ""} 
                onChange={(e) => updateProject(index, "name", e.target.value)} 
                type="text" placeholder="Project name" className="border px-3 py-2 text-sm rounded" 
              />
              <input 
                value={project.link || ""} 
                onChange={(e) => updateProject(index, "link", e.target.value)} 
                type="link" placeholder="Project URL" className="border px-3 py-2 text-sm rounded" 
              />
              <textarea 
                rows={4} 
                value={project.description || ""} 
                onChange={(e) => updateProject(index, "description", e.target.value)} 
                placeholder="Description" className="border px-3 py-2 text-sm rounded-lg col-span-full" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;