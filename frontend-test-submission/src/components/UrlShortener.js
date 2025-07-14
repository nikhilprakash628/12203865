import React, { useState } from "react";
import { TextField, Button, Card, Typography, Grid } from "@mui/material";
import { logEvent } from "../utils/logger";

function UrlShorteners() {
  const [urls, setUrls] = useState([""]);
  const [results, setResults] = useState([]);
  const token = "apna-auth-token-yaha-daal";


  const handleAddUrl = () => {
    if (urls.length < 5) {
      setUrls([...urls, ""]);
    } else {
      alert("Sirf 5 URL add kar sakte ho.");
    }
  };


  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };


  const handleShorten = () => {
    urls.forEach((url) => {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        alert("URL http ya https se start hona chahiye");
        return;
      }

      const shortCode = Math.random().toString(36).substring(2, 8);
      const expiry = new Date();
      expiry.setMinutes(expiry.getMinutes() + 30);

      const shortUrlObj = {
        originalUrl: url,
        shortUrl: `http://localhost:3000/${shortCode}`,
        expiry: expiry.toLocaleString(),
        shortCode: shortCode,
      };

      setResults((prev) => [...prev, shortUrlObj]);
      const existing = JSON.parse(localStorage.getItem("shortLinks")) || [];
      existing.push(shortUrlObj);
      localStorage.setItem("shortLinks", JSON.stringify(existing));

      logEvent("info", "component", `Short URL banaya: ${shortUrlObj.shortUrl}`, token);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      {urls.map((url, index) => (
        <TextField
          key={index}
          value={url}
          onChange={(e) => handleChange(index, e.target.value)}
          label={`URL ${index + 1}`}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      ))}

      <Button variant="contained" color="primary" onClick={handleAddUrl} style={{ marginRight: "10px" }}>
        + Add URL
      </Button>

      <Button variant="contained" color="success" onClick={handleShorten}>
        Shorten URLs
      </Button>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {results.map((result, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card style={{ padding: "10px" }}>
              <Typography variant="body1">Original: {result.originalUrl}</Typography>
              <Typography variant="body2">Short: {result.shortUrl}</Typography>
              <Typography variant="caption">Expires: {result.expiry}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UrlShorteners;
