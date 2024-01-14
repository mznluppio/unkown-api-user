const { Router } = require("express");
const {
	getUsers,
	getUserById,
	loginUser,
	signupUser,
	logoutUser
} = require("../../controllers/api/users");
const { addFriend, deleteFriendById } = require("../../controllers/api/friends");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);


router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", deleteFriendById);

// Ajouter ces routes pour signup, login et logout
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser)

module.exports = router;
