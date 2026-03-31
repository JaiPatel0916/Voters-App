import React, { useState } from "react";
import { FaFileUpload, FaCheckCircle, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/Enhanced Yuva Graduates Forum Logo.png";
import Sumedh from "../assets/Sumedh_Image.png";

const districts = [
  "Nagpur",
  "Bhandara",
  "Gondia",
  "Gadchiroli",
  "Wardha",
  "Chandrapur",
];

const FileUpload = ({ label, name, file, onChange, onRemove, error }) => {
  return (
    <div className="flex flex-col items-start">
      <label className="text-sm font-medium mb-2 text-left w-full">
        {label} <span className="text-red-500">*</span>
      </label>

      <div
        className={`relative flex items-center justify-center w-full px-4 py-3 bg-white border-2 border-dashed rounded-lg transition
        ${error ? "border-red-500" : "hover:border-blue-400"}`}
      >
        {file ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 overflow-hidden">
              <FaCheckCircle className="text-green-500 text-lg" />
              <span className="text-sm text-gray-700 truncate max-w-[180px]">
                {file.name}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onRemove(name)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <label className="flex items-center cursor-pointer w-full justify-center">
            <FaFileUpload className="text-blue-600 mr-2 text-lg" />
            <span className="text-sm text-gray-500">Click to upload file</span>
            <input
              type="file"
              name={name}
              onChange={(e) => {
                const file = e.target.files[0];

                if (file && file.size > 2 * 1024 * 1024) {
                  alert("File size must be less than 2MB");
                  return;
                }

                onChange(e);
              }}
              className="hidden"
            />
          </label>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-1 w-full text-left">
        Maximum file size: 10 MB (JPG, PNG, PDF)
      </p>

      {error && (
        <p className="text-red-500 text-sm mt-1 w-full text-left">{error}</p>
      )}
    </div>
  );
};

const UserForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    year: "",
    district: "",
    gender: "",

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
      setErrors({ ...errors, [name]: "" });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.year.trim()) newErrors.year = "Year of Passing is required";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.aadhar) newErrors.aadhar = "Aadhar Card is required";
    if (!formData.marksheet) newErrors.marksheet = "Marksheet is required";
    if (!formData.photo) newErrors.photo = "Photo is required";

    if (formData.gender !== "Male" && !formData.pan) {
      newErrors.pan = "PAN Card is required";
    }

    if (!formData.sign) newErrors.sign = "Signature is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (loading) return;

    setLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      const data = new FormData();

      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("yearOfPassing", formData.year);
      data.append("district", formData.district);
      data.append("gender", formData.gender);

      data.append("aadharCard", formData.aadhar);
      data.append("marksheetOrDegree", formData.marksheet);
      data.append("passportPhoto", formData.photo);

      data.append("panOrMarriageCert", formData.pan);

      data.append("signature", formData.sign);

      const response = await fetch(
        `${baseUrl}/api/voters/register`,
        {
          method: "POST",
          body: data,
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully 🎉");

        setFormData({
          name: "",
          phone: "",
          year: "",
          district: "",
          gender: "",
          aadhar: null,
          marksheet: null,
          photo: null,
          pan: null,
          sign: null,
        });

        setErrors({});
      } else {
        toast.error(result.msg || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const handleRemoveFile = (fieldName) => {
    setFormData({ ...formData, [fieldName]: null });
  };

  return (
    <div className="min-h-screen bg-white sm:bg-blue-100 p-0 sm:p-4 md:p-8 w-full">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header (unchanged UI, only cleaned structure) */}
      <div className="w-full mb-6">
        <div className="rounded-2xl shadow-xl w-full">
          <div className="bg-white rounded-xl p-6">
            <div className="flex flex-row flex-wrap items-center justify-between gap-6 w-full">
              <div className="flex flex-row items-center gap-3 md:gap-6 text-center md:text-left w-full md:w-auto">
                <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-3 md:p-4 rounded-xl shadow-md">
                  <img
                    src={logo}
                    className="w-16 h-16 md:w-28 md:h-28 object-contain"
                  />
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent py-2 whitespace-nowrap">
                    युवा ग्रॅज्युऐट फोरम
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">Youth Graduates Forum</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl shadow-md border-2 border-blue-200 md:ml-10 w-full md:w-auto">
                <div className="flex flex-row items-center gap-4 w-full justify-center md:justify-start text-center md:text-left">
                  <img
                    src={Sumedh}
                    className="w-20 h-20 md:w-32 md:h-32 rounded-full"
                  />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">
                      पदवीधर मतदार संघाचे <br /> अधिकृत उमेदवार
                    </p>
                    <p className="text-lg md:text-2xl font-bold">
                      Sumedh Boudh Gadapaile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-center mb-10">
          <h1 className="bg-red-500 text-white text-xl md:text-2xl font-semibold px-8 py-2 rounded shadow-md tracking-wide">
            VOTER’S REGISTRATION PORTAL
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Card */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 space-y-4">
              <div className="flex flex-col items-start">
                <label className="text-sm font-medium text-gray-900 mb-1 text-left w-full">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md text-left ${
                    errors.name
                      ? "border-red-500"
                      : "focus:ring-2 focus:ring-blue-400"
                  }`}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 text-left w-full">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start">
                <label className="text-sm font-medium block mb-1 text-left w-full">
                  Phone Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // allow only digits
                    if (value.length <= 10) {
                      setFormData({ ...formData, phone: value });
                      setErrors({ ...errors, phone: "" });
                    }
                  }}
                  maxLength={10}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.phone
                      ? "border-red-500"
                      : "focus:ring-2 focus:ring-blue-400"
                  }`}
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="flex flex-col items-start">
                <label className="text-sm font-medium block mb-1 w-full text-left">
                  Year of Passing <span className="text-red-500">*</span>
                </label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.year
                      ? "border-red-500"
                      : "focus:ring-2 focus:ring-blue-400"
                  }`}
                >
                  <option value="">Select Year</option>

                  {Array.from(
                    { length: new Date().getFullYear() - 1949 },
                    (_, i) => 1950 + i,
                  )
                    .reverse()
                    .map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>

                {errors.year && (
                  <p className="text-red-500 text-sm mt-1 w-full text-left">
                    {errors.year}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start">
                <label className="text-sm font-medium block mb-1 text-left w-full">
                  Gender <span className="text-red-500">*</span>
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.gender
                      ? "border-red-500"
                      : "focus:ring-2 focus:ring-blue-400"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>

                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div className="flex flex-col items-start">
                <label className="text-sm font-medium block mb-1 text-left w-full">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.district
                      ? "border-red-500"
                      : "focus:ring-2 focus:ring-blue-400"
                  }`}
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                )}
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 space-y-4">
              <FileUpload
                label="Aadhar Card"
                name="aadhar"
                file={formData.aadhar}
                onChange={handleChange}
                onRemove={handleRemoveFile}
                error={errors.aadhar}
              />
              <FileUpload
                label="Final Year Marksheet / Degree"
                name="marksheet"
                file={formData.marksheet}
                onChange={handleChange}
                onRemove={handleRemoveFile}
                error={errors.marksheet}
              />
              <FileUpload
                label="Photo"
                name="photo"
                file={formData.photo}
                onChange={handleChange}
                onRemove={handleRemoveFile}
                error={errors.photo}
              />
              {formData.gender !== "Male" && (
                <FileUpload
                  label="PAN Card / Marriage Certificate"
                  name="pan"
                  file={formData.pan}
                  onChange={handleChange}
                  onRemove={handleRemoveFile}
                  error={errors.pan}
                />
              )}

              <FileUpload
                label="Signature"
                name="sign"
                file={formData.sign}
                onChange={handleChange}
                onRemove={handleRemoveFile}
                error={errors.sign}
              />
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-3 rounded-md font-semibold text-white transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 active:scale-95"
                }`}
            >
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
