import { createSignal } from "solid-js";

export default function RegisterForm() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password() !== confirmPassword()) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Email:", email());
    console.log("Password:", password());
  };

  return (
    <form onSubmit={handleSubmit} class="w-full max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4 text-center">Register</h2>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div class="mb-4">
        <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Confirm your password"
          value={confirmPassword()}
          onInput={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Register
      </button>
    </form>
  );
}
