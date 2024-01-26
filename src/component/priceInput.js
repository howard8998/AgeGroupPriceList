import { Box, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";

import { addComma } from "../utils";
import React, { useState } from "react";
const PriceInput = () => {
  const [inputValue, setInputValue] = useState("");
  const handlePriceChange = (event) => {
      setInputValue(addComma(event.target.value));
    
  };
  return (
    <Container
      style={{
        margin: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
      align="left"
    >
      <Typography
        variant="caption"
        style={{ color: "GrayText", marginBottom: "10px" }}
      >
        入住費用(每人每晚)
      </Typography>
      <Box display="flex" alignItems="center">
        <span
          style={{
            border: "1px solid",
            borderRadius: "4px 0 0 4px",
            borderRight: "0px",
            borderColor: "darkgray",
            padding: "16px",
            backgroundColor: "lightgray",
          }}
        >
          TWD
        </span>
        <TextField
          id="price"
          label="請輸入費用"
          variant="outlined"
          required
          value={inputValue}
          onChange={handlePriceChange}
        />
      </Box>
    </Container>
  );
};

export default PriceInput;
