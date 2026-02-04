import React, { useState } from "react";
import { FaFileUpload, FaCheckCircle } from "react-icons/fa";

const districts = [
  "Nagpur",
  "Bhandara",
  "Gondia",
  "Gadchiroli",
  "Wardha",
  "Chandrapur",
];


// ✅ Move FileUpload OUTSIDE the main component
const FileUpload = ({ label, name, file, onChange }) => {
  return (
    <div>
      <p className="text-sm font-medium mb-2">{label}</p>

      <label className="flex items-center justify-center w-full px-4 py-3 bg-white border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400 transition">
        <FaFileUpload className="text-blue-600 mr-2 text-lg" />

        {file ? (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 truncate max-w-[180px]">
              {file.name}
            </span>
            <FaCheckCircle className="text-green-500 text-lg" />
          </div>
        ) : (
          <span className="text-sm text-gray-500">
            Click to upload file
          </span>
        )}

        <input
          type="file"
          name={name}
          onChange={onChange}
          className="hidden"
          required
        />
      </label>
    </div>
  );
};


const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    year: "",
    district: "",
    aadhar: null,
    marksheet: null,
    photo: null,
    pan: null,
    sign: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-100 px-4">
      <div className="w-full max-w-5xl">
        
        <div className="flex justify-center mb-10">
          <h1 className="bg-red-500 text-white text-xl md:text-2xl font-semibold px-8 py-2 rounded shadow-md tracking-wide">
            VOTER’S REGISTRATION PORTAL
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">

            {/* Left Card */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Year of Passing</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">District</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 space-y-4">
              <FileUpload label="Aadhar Card" name="aadhar" file={formData.aadhar} onChange={handleChange} />
              <FileUpload label="Final Year Marksheet / Degree" name="marksheet" file={formData.marksheet} onChange={handleChange} />
              <FileUpload label="Photo" name="photo" file={formData.photo} onChange={handleChange} />
              <FileUpload label="PAN Card / Marriage Certificate" name="pan" file={formData.pan} onChange={handleChange} />
              <FileUpload label="Signature" name="sign" file={formData.sign} onChange={handleChange} />
            </div>

          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-10 py-3 rounded-md shadow-md transition"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
