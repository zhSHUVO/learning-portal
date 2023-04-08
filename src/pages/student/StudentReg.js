import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/learningportal.svg";
import { useRegisterMutation } from "../../features/auth/authApi";

function StudentReg(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [register, { data, isLoading, error: responseError }] =
        useRegisterMutation();

    const loggedInToast = () => toast.success("Registration Successfull");

    const errorToast = () => toast.error("Unable to Register");

    useEffect(() => {
        if (responseError?.data) {
            setError(responseError.data);
            errorToast();
            console.log(error);
        }
        if (data?.accessToken && data?.user) {
            navigate("/courseplayer/1");
            console.log(data);
            loggedInToast();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (confirmPassword !== password) {
            setError("Passwords do not match!");
            errorToast();
        } else {
            register({ email, password, role: "student", name });
        }
    };

    return (
        <section className="py-6 bg-primary h-screen grid place-items-center">
            <div className="mx-auto max-w-md px-5 lg:px-0">
                {" "}
                <div>
                    <img className="h-12 mx-auto" src={logo} alt="logo" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                        Create Your New Account
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="name"
                                autoComplete="name"
                                required
                                className="login-input rounded-t-md"
                                placeholder="Student Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="login-input"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="login-input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="sr-only"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="confirm-password"
                                required
                                className="login-input rounded-b-md"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <Link
                                to="/"
                                className="font-medium text-violet-600 hover:text-violet-500"
                            >
                                Sign into your account
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default StudentReg;
