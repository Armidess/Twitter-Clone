import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auths.js";
import tweetRouter from "./routes/tweets.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
	mongoose
		.connect(process.env.MONGO)
		.then(() => {
			console.log("Connected TO Mongo DB DataBase");
		})
		.catch((err) => {
			console.log("Error In Connecting to DB", err);
			throw err;
		});
};

app.get((req, res) => {});
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tweets", tweetRouter);

app.listen(3000, () => {
	connect();
	console.log("Listening to Server 3000");
});
