import { Link } from "react-router-dom";

const LoginPage = () => {

    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center">Login</h1>
                <form className="max-w-md mx-auto">
                    <input type="email" placeholder="your@email.com" />
                    <input type="password" placeholder="password" />
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