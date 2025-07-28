import jwt from "jsonwebtoken";

export const verifyToken = (req, resp, next) => {
  const token = req.cookies.token;
  if (!token) return resp.status(401).json({ message: "Not authenticated!" });

  jwt.verify(token, process.env.JWT_SEC, async (err, payload) => {
    if (err) {
      return resp.status(403).json({ message: "Token invalid!" });
    }

    req.userId = payload.userId;
    next();
  });
};
