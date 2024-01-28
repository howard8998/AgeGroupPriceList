import { Box, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";

import { addComma } from "../utils";
import React, { useEffect, useState } from "react";

const PriceInput = ({ onChange }) => {
  const [inputValue, setInputValue] = useState("0");
  const [inputFormatError, setInputFormatError] = useState(false);
  const [inputNullError, setInputNullError] = useState(false);

  let timeoutId;
  const handlePriceChange = (event) => {
    const userInput = event.target.value;

    // 清除上一个定时器
    clearTimeout(timeoutId);

    // 使用防抖動來解決中文輸入法會導致觸發不正確的 onchange
    timeoutId = setTimeout(() => {
      if (userInput === "") {
        setInputValue(userInput);
        setInputFormatError(false);
        setInputNullError(true);
      } else {
        setInputNullError(false);
        if (/^[0-9,.]*$/.test(userInput)) {
          let formatinput = addComma(userInput);
          setInputValue(formatinput);
          setInputFormatError(false);
          onChange(formatinput);
        } else {
          setInputValue(userInput);
          setInputFormatError(true);
        }
      }
    }, 50);
  };
  useEffect(() => {
    if (!inputFormatError && !inputNullError) {
      onChange(inputValue);
    }
  },[inputFormatError,inputNullError,inputValue]);
  return (
    <Container
      style={{
        margin: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth: "350px",
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
        <TextField
          id="price"
          label="請輸入費用"
          variant="outlined"
          required
          value={inputValue}
          onChange={handlePriceChange}
        />
      </Box>
      {inputFormatError && (
        <Typography variant="caption" color="error">
          請輸入有效的數字、小數點或逗號
        </Typography>
      )}
      {inputNullError && (
        <Typography variant="caption" color="error">
          不可以為空白
        </Typography>
      )}
      <Typography
        variant="caption"
        style={{
          color: "GrayText",
          marginBottom: "10px",
          textAlign: "right",
          width: "100%",
        }}
      >
        0表示免費
      </Typography>
    </Container>
  );
};

export default PriceInput;
