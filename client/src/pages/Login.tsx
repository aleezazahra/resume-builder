import React, { ReactEventHandler, useState } from "react";
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

    const handleSubmit = async (e:React.FormEvent) => {
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

    const handleChange = (e:React.ChangeEventHandler) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const inputContainerStyle = "flex items-center rounded-xl px-4 h-12 mb-8 bg-black border border-gray-500  border-1.4"; 
    const inputStyle = "w-full outline-none bg-black text-white placeholder:text-gray-500 ";

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl shadow-xl p-8 bg-black"
            >
                <h1 className="text-3xl font-bold text-white text-center">
                    {state === "login" ? "Login" : "Create Account"}
                </h1>

                <p className="text-gray-400 text-center mt-2 mb-6">
                    {state === "login"
                        ? "Sign in to continue."
                        : "Create your account to get started."}
                </p>

                {state !== "login" && (
                    <div className={inputContainerStyle}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={inputStyle}
                        />
                    </div>
                )}

                <div className={inputContainerStyle}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                    />
                </div>

                <div className={inputContainerStyle}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                    />
                </div>

                <div className="text-right -mt-5">
                    <button
                        type="button"
                        className="text-gray-300 hover:underline text-sm"
                    >
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full mt-2 h-12 rounded-xl btn  text-center items-center transition text-white font-semibold"
                >
                    {state === "login" ? "Login" : "Sign Up"}
                </button>

                <p className="text-center items-center text-gray-500 mt-6">
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
                        className="text-gray-200 font-semibold hover:underline"
                    >
                        {state === "login" ? "Sign Up" : "Login"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;