import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box mt={5} position="static">
      <Typography variant="body2" color="textSecondary" align="center">
        {"© "}
        {new Date().getFullYear()} {"flux.task"}
      </Typography>
    </Box>
  );
}

export default Footer;
