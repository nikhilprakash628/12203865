import React, { useEffect, useState } from "react";
import { Typography, Card, Grid, Button } from "@mui/material";
import { logEvent } from "../utils/logger";

function Ustat() {
  const [links, setLinks] = useState([]);
  const token = "apna-auth-token-yaha-daal";

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];
    setLinks(storedLinks);

    logEvent("info", "page", "Statistics page loaded", token);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      {links.length === 0 ? (
        <Typography>No data available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {links.map((link, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card style={{ padding: "10px" }}>
                <Typography>Original: {link.originalUrl}</Typography>
                <Typography>Short: {link.shortUrl}</Typography>
                <Typography>Created: {link.createdAt}</Typography>
                <Typography>Expiry: {link.expiry}</Typography>
                <Typography>Clicks: {link.clickCount}</Typography>

                <Typography variant="subtitle2" style={{ marginTop: "10px" }}>
                  Click History:
                </Typography>
                {link.clickDetails && link.clickDetails.length > 0 ? (
                  link.clickDetails.map((click, i) => (
                    <Typography key={i} variant="caption">
                      {click.time} - {click.source} - {click.location}
                      <br />
                    </Typography>
                  ))
                ) : (
                  <Typography variant="caption">No clicks yet</Typography>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Ustat;
