import jwt from "jsonwebtoken";
export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODEV_ENV ? "lax" : "none",
      secure: process.env.NODEV_ENV ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
