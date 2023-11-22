import jwt from "jsonwebtoken";

export function getUserIdByToken(token) {
  try {
    console.log("process.env.local.JWT_SECRET", process.env.local.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    // Log additional information if needed
    console.error("Error Stack Trace:", error.stack);
    return null;
  }
}
