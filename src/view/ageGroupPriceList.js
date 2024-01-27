import { Grid } from "@mui/material";
import PriceInput from "../component/priceInput";
import AgeGroupSelect from "../component/ageGroupSelect";
import { useState, useEffect } from "react";
const AgeGroupPriceList = (Overlap) => {
  const [price, setPrice] = useState();
  const [ageGroup, setAgeGroup] = useState();
  const [overlap, setOverLap] = useState();
  useEffect(() => {
    setOverLap(overlap);
  }, Overlap);
  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    console.log(ageGroup);
    console.log(price);
  }, [ageGroup,price]);
  const handleAgeGroupChange = (newAgeGroup) => {
    setAgeGroup(newAgeGroup);
  };
  return (
    <Grid container minWidth={1000}>
      <PriceInput onChange={handlePriceChange} />
      <AgeGroupSelect overlap={overlap} onChange={handleAgeGroupChange} />
    </Grid>
  );
};
export default AgeGroupPriceList;
