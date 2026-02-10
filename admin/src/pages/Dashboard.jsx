import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";



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

    const downloadExcel = () => {
        const data = voters.map((v) => ({
            Name: v.name,
            Phone: v.phone,
            Year: v.yearOfPassing,
            District: v.district,
            Aadhar: v.aadharCard,
            Degree: v.marksheetOrDegree,
            Photo: v.passportPhoto,
            PAN_or_Cert: v.panOrMarriageCert,
            Signature: v.signature,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        // ✅ Set column widths
        worksheet["!cols"] = [
            { wch: 20 }, // Name
            { wch: 15 }, // Phone
            { wch: 12 }, // Year
            { wch: 15 }, // District
            { wch: 55 }, // Aadhar link
            { wch: 55 }, // Degree link
            { wch: 55 }, // Photo link
            { wch: 55 }, // PAN/Cert link
            { wch: 55 }, // Signature link
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Voters");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(file, "Voters_Data.xlsx");
    };

    const downloadFileInstant = async (url, filename) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    };

    const downloadAllDocs = (v) => {
     
        downloadFileInstant(v.aadharCard, "Aadhar.pdf");
        downloadFileInstant(v.marksheetOrDegree, "Degree.pdf");
        downloadFileInstant(v.passportPhoto, "Photo.jpg");
        downloadFileInstant(v.panOrMarriageCert, "PAN_or_Cert.pdf");
        downloadFileInstant(v.signature, "Signature.jpg");
    };

    
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Voters List</h1>

                <div className="flex gap-3">
                    <button
                        onClick={downloadExcel}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Download Excel
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm md:text-base">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2">Year</th>
                            <th className="border p-2">Gender</th>
                            <th className="border p-2">District</th>

                            <th className="border p-2 text-center">Documents</th>
                            <th className="border p-2 text-center">Download All</th>
                        </tr>
                    </thead>

                    <tbody>
                        {voters.map((v) => (
                            <tr key={v._id} className="text-center">
                                <td className="border p-2">{v.name}</td>
                                <td className="border p-2">{v.phone}</td>
                                <td className="border p-2">{v.yearOfPassing}</td>
                                <td className="border p-2">{v.gender}</td>

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
                                <td className="border p-2">
                                    <button
                                        onClick={() => downloadAllDocs(v)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded text-xs md:text-sm"
                                    >
                                        Download All Documents
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
