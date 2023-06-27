import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		dispatch(loginStart());

		try {
			const res = await axios.post("/auth/signup", {
				username,
				email,
				password,
			});
			dispatch(loginSuccess(res.data));
			navigate("/");
		} catch (err) {
			dispatch(loginFailed());
		}
	};
	const handleSignin = (e) => {
		e.preventDefault();
		navigate("/signin");
	};

	return (
		<form className="bg-blue-50 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
			<h2 className="text-2xl font-medium text-left">Create New Account</h2>
			<input
				onChange={(e) => setUsername(e.target.value)}
				type="text"
				placeholder="Username"
				className="text-lg py-2 px-4 rounded-full mb-4"
			/>
			<input
				onChange={(e) => setEmail(e.target.value)}
				type="email"
				placeholder="Email"
				required
				className="text-lg py-2 px-4 rounded-full mb-4"
			/>
			<input
				onChange={(e) => setPassword(e.target.value)}
				type="password"
				placeholder="Password"
				className="text-lg py-2 px-4 rounded-full mb-4"
			/>
			<button
				onClick={handleSignup}
				className="text-lg py-3 px-6 rounded-full mb-6 bg-blue-400 text-white"
				type="submit"
			>
				Sign up
			</button>
			<p
				className="text-lg text-center text-gray-500 cursor-pointer"
				onClick={handleSignin}
			>
				Already Have An Account
			</p>
		</form>
	);
};

export default Signup;
