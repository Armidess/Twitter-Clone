import { errorHandler } from "../error.js";
import Tweet from "../models/Tweet.js";
import User from "../models/User.js";

export const createTweet = async (req, res, next) => {
	const newTweet = new Tweet(req.body);
	try {
		const savedTweet = await newTweet.save();
		res.status(200).json("Tweet Saved");
	} catch (err) {
		next(errorHandler(500, err));
	}
};
export const deleteTweet = async (req, res, next) => {
	try {
		const tweet = await Tweet.findById(req.params.id);
		if (tweet.userID === req.body.id) {
			await tweet.deleteOne();
			res.status(200).json("Tweet Deleted");
		} else {
			next(errorHandler(500, err));
		}
	} catch (err) {
		next(errorHandler(500, err));
	}
};
export const likeordislikeTweet = async (req, res, next) => {
	try {
		const tweet = await Tweet.findById(req.params.id);
		if (!tweet.likes.includes(req.body.id)) {
			await tweet.updateOne({
				$push: {
					likes: req.body.id,
				},
			});
			res.status(200).json("Tweet Liked");
		} else {
			await tweet.updateOne({
				$pull: {
					likes: req.body.id,
				},
			});
			res.status(200).json("Tweet Disliked");
		}
	} catch (err) {
		next(errorHandler(500, err));
	}
};
export const getAllTweets = async (req, res, next) => {
	try {
		const currentuser = await User.findById(req.params.id);
		const userTweets = await Tweet.find({ userID: currentuser._id });
		const followersTweets = await Promise.all(
			currentuser.following.map((followerID) => {
				return Tweet.find({ userID: followerID });
			})
		);
		res.status(200).json(userTweets.concat(...followersTweets));
	} catch (err) {
		next(errorHandler(500, err));
	}
};

export const getUserTweets = async (req, res, next) => {
	try {
		const tweets = await Tweet.find({ userID: req.params.id }).sort({
			createAt: -1,
		});
		res.status(200).json(tweets);
	} catch (err) {
		next(errorHandler(500, err));
	}
};

export const getExploreTweets = async (req, res, next) => {
	try {
		const getExploreTweets = await Tweet.find({
			likes: { $exists: true },
		}).sort({
			likes: -1,
		});
		res.status(200).json(getExploreTweets);
	} catch (err) {
		next(errorHandler(500, err));
	}
};
