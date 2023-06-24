import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios"

const LoginPage = () => {
    const [redirect, setRedirect] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { setUser } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/login', {
              email: formData.email,
              password: formData.password
            }); 
            setUser(data);
            setRedirect(true);
        } catch (e) {
            alert('Login failed. Please try again later');
        }
    };

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
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
                    <button className="primary">Login</button>
                    <div className="py-2 text-center text-gray-500">
                        {"Don't have an accont yet? "}
                        <Link to={"/register"} className="underline text-black-500">
                            Register here!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;