import { useParams } from "@solidjs/router";

export default function ProjectDetails() {
  const params = useParams();
  const projectId = params.id;

  // Dodaj podatke za projekte
  const projects = [
    { id: 1, name: "Project 1", description: "Description 1", date: "2024-01-01" },
    { id: 2, name: "Project 2", description: "Description 2", date: "2024-02-01" },
  ];

  const project = projects.find((p) => p.id === parseInt(projectId));

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div class="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow">
      <h1 class="text-2xl font-bold mb-4">{project.name}</h1>
      <p class="text-sm">{project.description}</p>
      <p class="text-xs">Date: {project.date}</p>
    </div>
  );
}
