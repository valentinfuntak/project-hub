import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

export default function ProjectManager() {
    const [projects, setProjects] = createSignal([]);
    const [formVisible, setFormVisible] = createSignal(false);
    const [formData, setFormData] = createSignal({
        name: "",
        description: "",
        date: "",
        file: null,
    });

    const navigate = useNavigate();

    const handleAddProject = () => {
        setFormVisible(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProjects([...projects(), { ...formData(), id: Date.now() }]);
        setFormData({ name: "", description: "", date: "", file: null });
        setFormVisible(false);
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData(), file: e.target.files[0] });
    };

    const viewDetails = (id) => {
        navigate(`/project/${id}`);
    };

    return (
        <div class="bg-gray-100 p-6 max-w-4xl mx-auto rounded-lg shadow">
            {/* Flex container za naslov i gumb */}
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-mono font-bold">Projects</h1>
                <form class="max-w-md mx-auto">
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
                {!formVisible() && (
                    <button
                        onClick={handleAddProject}
                        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Add project
                    </button>
                )}
            </div>

            {formVisible() && (
                <form
                    class="bg-white p-4 rounded shadow mb-6"
                    onSubmit={handleSubmit}
                >
                    <h2 class="text-lg font-mono font-bold mb-4">Add a new project</h2>
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2" htmlFor="name">
                            Project Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData().name}
                            onInput={(e) =>
                                setFormData({ ...formData(), name: e.target.value })
                            }
                            required
                            class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData().description}
                            onInput={(e) =>
                                setFormData({ ...formData(), description: e.target.value })
                            }
                            required
                            class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium mb-2" htmlFor="date">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={formData().date}
                            onInput={(e) => {
                                const inputDate = e.target.value;
                                const year = inputDate.split("-")[0]; // Izdvajamo godinu iz datuma
                                if (year.length <= 4) {
                                    setFormData({ ...formData(), date: inputDate });
                                } else {
                                    e.target.value = formData().date; // Resetira na prethodnu vrijednost
                                }
                            }}
                            required
                            class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div class="mb-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">File</label>
                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" /*required*/ onChange={handleFileChange} id="file" type="file" multiple></input>
                    </div>
                    <button
                        type="submit"
                        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            )}

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects().map((project) => (
                    <div key={project.id} class="bg-gray-200 p-4 rounded shadow">
                        <h3 class="font-bold">{project.name}</h3>
                        <p class="text-sm">{project.description}</p>
                        <button
                            onClick={() => viewDetails(project.id)}
                            class="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
