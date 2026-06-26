import { useState } from "react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
    const dispatch = useDispatch();

    const query = new URLSearchParams(window.location.search);
    const URLState = query.get("state");

    const [state, setState] = useState(URLState || "login");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post(`/api/users/${state}`, formData);

            dispatch(login(data));

            localStorage.setItem("token", data.token);

            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
            >
                <h1 className="text-3xl font-bold text-black text-center">
                    {state === "login" ? "Login" : "Create Account"}
                </h1>

                <p className="text-black text-center mt-2 mb-6">
                    {state === "login"
                        ? "Sign in to continue."
                        : "Create your account to get started."}
                </p>

                {state !== "login" && (
                    <div className="flex items-center border border-gray-300 rounded-xl px-4 h-12 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#6B7280"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="8" r="5" />
                            <path d="M20 21a8 8 0 0 0-16 0" />
                        </svg>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full ml-3 outline-none bg-transparent text-black placeholder:text-gray-400"
                        />
                    </div>
                )}

                <div className="flex items-center border border-gray-300 rounded-xl px-4 h-12 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                    </svg>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full ml-3 outline-none bg-transparent text-black placeholder:text-gray-400"
                    />
                </div>

                <div className="flex items-center border border-gray-300 rounded-xl px-4 h-12">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="18" height="11" x="3" y="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full ml-3 outline-none bg-transparent text-black placeholder:text-gray-400"
                    />
                </div>

                <div className="text-right mt-3">
                    <button
                        type="button"
                        className="text-indigo-600 hover:underline text-sm"
                    >
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold"
                >
                    {state === "login" ? "Login" : "Sign Up"}
                </button>

                <p className="text-center text-black mt-6">
                    {state === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() =>
                            setState((prev) =>
                                prev === "login" ? "register" : "login"
                            )
                        }
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        {state === "login" ? "Sign Up" : "Login"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;