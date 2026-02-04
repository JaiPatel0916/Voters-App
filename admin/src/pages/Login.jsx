import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";



export default function Login() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    const handleLogin = async () => {
        try {
            const res = await axios.post("/admin/login", form);

            // save token
            localStorage.setItem("token", res.data.token);

            // ✅ redirect to dashboard
            navigate("/dashboard");

        } catch (err) {
            alert("Invalid credentials");
        }
    };


    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full border p-2 mb-4"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-4"
                    onChange={handleChange}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-black text-white py-2"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
