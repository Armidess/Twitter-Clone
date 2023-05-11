import { errorHandler } from "../error.js";
import Tweet from "../models/Tweet.js";
import User from "../models/User.js";

export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

export const updateUser = async (req, res, next) => {
	if (req.params.id === req.user.id) {
		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			next(err);
		}
	} else {
		return next(errorHandler(403, "Only Allowed to update own account"));
	}
};

export const deleteUser = async (req, res, next) => {
	if (req.params.id === req.user.id) {
		try {
			await User.findByIdAndDelete(req.params.id);
			await Tweet.remove({ userID: req.params.id });
			res.status(200).json("User Deleted");
		} catch (err) {
			next(err);
		}
	} else {
		return next(errorHandler(403, "Only Allowed to update own account"));
	}
};

export const followUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.id);

		if (!user.followers.includes(req.body.id)) {
			await user.updateOne({
				$push: {
					followers: req.body.id,
				},
			});
			await currentUser.updateOne({
				$push: {
					following: req.params.id,
				},
			});
		} else {
			res.status(403).json("Already Follow This User");
		}
		res.status(200).json("Following The User");
	} catch (error) {
		next(error);
	}
};

export const unfollowUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		const currentUser = await User.findById(req.body.id);

		if (!currentUser.following.includes(req.body.id)) {
			await user.updateOne({
				$pull: {
					followers: req.body.id,
				},
			});
			await currentUser.updateOne({
				$pull: {
					following: req.params.id,
				},
			});
		} else {
			res.status(403).json("Already Not Follow This User");
		}
		res.status(200).json("Unfollowing The User");
	} catch (error) {
		next(error);
	}
};
