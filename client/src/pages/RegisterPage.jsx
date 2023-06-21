import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        password: ""
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        await axios.post('/register', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          contactNumber: formData.contactNumber,
          email: formData.email,
          password: formData.password
        });
        alert('Registration successful. Please Login');
      } catch (e) {
        alert('Registration failed. Please try again later');
      }
    };

    return (
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Contact Number"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="your@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <button className="primary">
              Register
            </button>

            <div className="py-2 text-center text-gray-500">
              {"Already a member? "}
              <Link to={"/login"} className="underline text-black-500">
                Login!
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
}
export default RegisterPage;