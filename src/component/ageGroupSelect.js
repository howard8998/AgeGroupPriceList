import React, { useState } from "react";
import { Container, Typography, Select, MenuItem, Grid } from "@mui/material";

const ageGroup = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const AgeGroupSelect = () => {
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(20);

  const handleMinAgeChange = (e) => {
    setMinAge(e.target.value);
  };
  const handleMaxAgeChange = (e) => {
    setMaxAge(e.target.value);
  };

  return (
    <Container
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        maxWidth: "400px",
      }}
    >
      <Typography
        variant="caption"
        style={{
          color: "GrayText",
          textAlign: "left",
          marginBottom: "5px",
        }}
      >
        年齡
      </Typography>
      <Grid container>
        <Select
          value={minAge}
          label="Age"
          onChange={handleMinAgeChange}
          style={{ minWidth: "150px" }}
        >
          {ageGroup.map((age) => (
            <MenuItem key={age} value={age} disabled={age>maxAge}>
              {age}
            </MenuItem>
          ))}
        </Select>
        <Typography
          style={{
            textAlign: "center",
            maxWidth: "50px",
            border: "1px solid",
            borderColor: "darkgray",
            backgroundColor: "lightgray",
            padding:"16px",

          }}
        >
          ~
        </Typography>
        <Select
          value={maxAge}
          label="Age"
          onChange={handleMaxAgeChange}
          style={{ minWidth: "150px" }}
        >
          {ageGroup.map((age) => (
            <MenuItem key={age} value={age} disabled={age<minAge}>
              {age}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Container>
  );
};

export default AgeGroupSelect;
