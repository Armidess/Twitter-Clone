import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";

const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginStart());
		try {
			const res = await axios.post("/auth/signin", { username, password });
			dispatch(loginSuccess(res.data));
			navigate("/");
		} catch (err) {
			dispatch(loginFailed());
		}
	};

	const handleSignup = (e) => {
		e.preventDefault();
		navigate("/signup");
	};

	return (
		<form className="bg-blue-50 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
			<h2 className="text-3xl font-bold text-center">Log in to Twitter</h2>
			<input
				onChange={(e) => setUsername(e.target.value)}
				type="text"
				placeholder="Username"
				className="text-lg py-3 px-4 rounded-full mb-4"
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				placeholder="Password"
				className="text-lg py-3 px-4 rounded-full mb-4"
			/>
			<button
				className="text-lg py-2 rounded-full px-4 bg-blue-500 text-white"
				onClick={handleLogin}
			>
				Log in
			</button>
			<p
				className="text-center text-lg text-gray-500 cursor-pointer"
				onClick={handleSignup}
			>
				Don't have an account? Sign up
			</p>
		</form>
	);
};

export default Signin;
