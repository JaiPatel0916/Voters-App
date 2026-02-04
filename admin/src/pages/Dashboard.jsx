import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
    const [voters, setVoters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVoters = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get("/voters/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setVoters(res.data);
            } catch (err) {
                alert("Unauthorized");
            }
        };

        fetchVoters();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Voters List</h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm md:text-base">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2">Year</th>
                            <th className="border p-2">District</th>
                            <th className="border p-2 text-center">Documents</th>
                        </tr>
                    </thead>

                    <tbody>
                        {voters.map((v) => (
                            <tr key={v._id} className="text-center">
                                <td className="border p-2">{v.name}</td>
                                <td className="border p-2">{v.phone}</td>
                                <td className="border p-2">{v.yearOfPassing}</td>
                                <td className="border p-2">{v.district}</td>

                                <td className="border p-2">
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        <a
                                            href={v.aadharCard}
                                            target="_blank"
                                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs md:text-sm"
                                        >
                                            Aadhar
                                        </a>

                                        <a
                                            href={v.marksheetOrDegree}
                                            target="_blank"
                                            className="bg-green-600 text-white px-3 py-1 rounded text-xs md:text-sm"
                                        >
                                            Degree
                                        </a>

                                        <a
                                            href={v.passportPhoto}
                                            target="_blank"
                                            className="bg-purple-600 text-white px-3 py-1 rounded text-xs md:text-sm"
                                        >
                                            Photo
                                        </a>

                                        <a
                                            href={v.panOrMarriageCert}
                                            target="_blank"
                                            className="bg-orange-600 text-white px-3 py-1 rounded text-xs md:text-sm"
                                        >
                                            PAN/Cert
                                        </a>

                                        <a
                                            href={v.signature}
                                            target="_blank"
                                            className="bg-black text-white px-3 py-1 rounded text-xs md:text-sm"
                                        >
                                            Sign
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
