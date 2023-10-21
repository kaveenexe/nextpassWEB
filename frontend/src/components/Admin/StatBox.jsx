import React from "react";
import { Box, Typography } from "@mui/material";

const StatBox = ({ title, value }) => {
  return (
    <Box
      gridColumn="span 3"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="1rem 1rem"
      flex="1 1 100%"
      borderRadius="0.55rem"
      sx={{
        backgroundColor: "#0652b7",
        color: "white",
        fontFamily: "inherit",
      }}
    >
      <Typography
        fontSize="20px"
        fontWeight="300"
        textAlign="center"
        style={{ fontFamily: "inherit" }}
      >
        {title}
      </Typography>

      <Typography
        fontSize="35px"
        fontWeight="600"
        textAlign="center"
        mt={1}
        style={{ fontFamily: "inherit" }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default StatBox;
