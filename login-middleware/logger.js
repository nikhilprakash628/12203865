import axios from "axios";

export const logEvent = async (level, pkg, message, token) => {
  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack: "frontend",
        level: level,
        package: pkg,
        message: message
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log("Log created:", response.data);
  } catch (error) {
    console.error("Logging error:", error);
  }
};
