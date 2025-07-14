import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../utils/logger";

function Rp() {
  const { shortcode } = useParams();
  const navigate = useNavigate();
  const token = "apna-auth-token-yaha-daal";

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];
    const linkIndex = storedLinks.findIndex((l) => l.shortCode === shortcode);

    if (linkIndex === -1) {
      alert("URL not found or expired.");
      logEvent("error", "route", `Shortcode not found: ${shortcode}`, token);
      navigate("/");
      return;
    }

    const link = storedLinks[linkIndex];
    const now = new Date();
    const expiryTime = new Date(link.expiry);

    if (now > expiryTime) {
      alert("This link has expired.");
      logEvent("warn", "route", `Shortcode expired: ${shortcode}`, token);
      navigate("/");
      return;
    }

storedLinks[linkIndex].clickCount = (storedLinks[linkIndex].clickCount || 0) + 1;


    const clickDetails = {
      time: now.toLocaleString(),
      source: "direct",
      location: "India"
    };

    storedLinks[linkIndex].clickDetails = storedLinks[linkIndex].clickDetails || [];
    storedLinks[linkIndex].clickDetails.push(clickDetails);

    localStorage.setItem("shortLinks", JSON.stringify(storedLinks));

    logEvent("info", "route", `Redirected: ${shortcode}`, token);

    window.location.href = link.originalUrl;

  }, [shortcode, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Redirecting...</h2>
    </div>
  );
}

export default Rp;
