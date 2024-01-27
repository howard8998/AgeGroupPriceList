import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";

const ageGroup = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

const AgeGroupSelect = ({ overlap, onChange }) => {
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(20);
  const [isOverlap, setIsOverLap] = useState(false);
  const [ageGroupSelect, setAgeGroupSelect] = useState([0, 20]);
  useEffect(() => {
    if (Array.isArray(overlap) && typeof overlap.some === "function") {
      const hasOverlap = overlap.some(
        ([start, end]) => minAge <= end && maxAge >= start
      );
      setIsOverLap(hasOverlap);
    }
  }, [overlap, minAge, maxAge]);
  useEffect(
    () => {
      setAgeGroupSelect([minAge, maxAge]);
      onChange(ageGroupSelect);
    },
    [minAge,
    maxAge,ageGroupSelect]
  );
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
        <FormControl>
          <InputLabel id="minAg">min</InputLabel>
          <Select
            labelId="minAge"
            value={minAge}
            label="Age"
            onChange={handleMinAgeChange}
            style={{ minWidth: "150px" }}
          >
            {ageGroup.map((age) => (
              <MenuItem key={age} value={age} disabled={age > maxAge}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography
          style={{
            textAlign: "center",
            maxWidth: "50px",
            border: "1px solid",
            borderColor: "darkgray",
            backgroundColor: "lightgray",
            padding: "15px",
            borderRadius: "6px",
          }}
        >
          ~
        </Typography>
        <FormControl>
          <InputLabel id="minAg">max</InputLabel>
          <Select
            value={maxAge}
            label="max"
            onChange={handleMaxAgeChange}
            style={{ minWidth: "150px" }}
          >
            {ageGroup.map((age) => (
              <MenuItem key={age} value={age} disabled={age < minAge}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {isOverlap && (
        <Typography variant="caption" color="error">
          年齡區間不可重複
        </Typography>
      )}
    </Container>
  );
};

export default AgeGroupSelect;
