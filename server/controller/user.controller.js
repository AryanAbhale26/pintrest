import User from "../model/user.model.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { hashedPassword, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
