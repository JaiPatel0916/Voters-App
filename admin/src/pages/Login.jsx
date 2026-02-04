// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";



// export default function Login() {
//     const [form, setForm] = useState({
//         username: "",
//         password: "",
//     });
//     const navigate = useNavigate();
//     const handleChange = (e) =>
//         setForm({ ...form, [e.target.name]: e.target.value });
//     const handleLogin = async () => {
//         try {
//             const res = await axios.post("/admin/login", form);

//             // save token
//             localStorage.setItem("token", res.data.token);

//             // ✅ redirect to dashboard
//             navigate("/dashboard");

//         } catch (err) {
//             alert("Invalid credentials");
//         }
//     };


//     return (
//         <div className="h-screen flex items-center justify-center bg-gray-100">
//             <div className="bg-white p-8 rounded shadow w-80">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     className="w-full border p-2 mb-4"
//                     onChange={handleChange}
//                 />

//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="w-full border p-2 mb-4"
//                     onChange={handleChange}
//                 />

//                 <button
//                     onClick={handleLogin}
//                     className="w-full bg-black text-white py-2"
//                 >
//                     Login
//                 </button>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "../api/axios";

export default function Login() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/admin/login", form);

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <Wrapper>
            <form className="form_main" onSubmit={handleLogin}>
                <p className="heading">Admin Login</p>

                <div className="inputContainer">
                    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#2e2e2e" viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643z" />
                    </svg>
                    <input
                        type="text"
                        name="username"
                        className="inputField"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="inputContainer">
                    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="#2e2e2e" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="inputField"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <span
                        className="eyeBtn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        👁️
                    </span>
                </div>


                <button id="button" type="submit">
                    Login
                </button>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #f0f0ff, #ffffff);

  .form_main {
    width: 360px;
    min-height: 300px; 
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);
    position: relative;
    overflow: hidden;
  }

  .form_main::before {
    position: absolute;
    content: "";
    width: 300px;
    height: 300px;
    background-color: rgb(209, 193, 255);
    transform: rotate(45deg);
    left: -180px;
    bottom: 30px;
    border-radius: 30px;
  }

  .heading {
    font-size: 1.8em;
    font-weight: 700;
    margin-bottom: 15px;
    z-index: 2;
  }

  .inputContainer {
    width: 100%;
    position: relative;
    margin: 10px 0;
    z-index: 2;
  }

  .inputIcon {
    position: absolute;
    left: 6px;
    top: 8px;
  }

  .inputField {
    width: 100%;
    height: 32px;
    border: none;
    border-bottom: 2px solid #aaa;
    padding-left: 30px;
    font-size: 0.9em;
  }

  .inputField:focus {
    outline: none;
    border-bottom: 2px solid rgb(162, 104, 255);
  }

  #button {
    margin-top: 15px;
    width: 100%;
    height: 32px;
    border: none;
    background-color: rgb(162, 104, 255);
    color: #fff;
    cursor: pointer;
  }

  .eyeBtn {
  position: absolute;
  right: 8px;
  cursor: pointer;
  font-size: 14px;
  z-index: 3;
}

`;

