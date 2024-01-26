import { Box, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";

import { addComma } from "../utils";
import React, { useState } from "react";

const PriceInput = () => {
  const [inputValue, setInputValue] = useState("0");
  const [inputError, setInputError] = useState(false);

  let timeoutId;

  const handlePriceChange = (event) => {
    const userInput = event.target.value;

    // 清除上一个定时器
    clearTimeout(timeoutId);

    // 使用防抖動來解決中文輸入法會導致觸發不正確的 onchange
    timeoutId = setTimeout(() => {
      if (/^[0-9,.]*$/.test(userInput)) {
        setInputValue(addComma(userInput));
        setInputError(false); // 清除错误状态
      } else {
        setInputValue(userInput);
        setInputError(true); // 设置错误状态
      }
    }, 5);
  };

  return (
    <Container
      style={{
        margin: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth:"350px",
      }}
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
        <Box></Box>
        <TextField
          id="price"
          label="請輸入費用"
          variant="outlined"
          required
          value={inputValue}
          onChange={handlePriceChange}
          error={inputError}
        />
      </Box>
      {inputError && (
        <Typography variant="caption" color="error">
          請輸入有效的數字、小數點或逗號
        </Typography>
      )}
      
      <Typography
        variant="caption"
        style={{ color: "GrayText", marginBottom: "10px", textAlign: "right",width:"100%"}}
      >
        0表示免費
      </Typography>
    </Container>
  );
};

export default PriceInput;
