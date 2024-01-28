import { Grid, Button } from "@mui/material";
import PriceInput from "../component/priceInput";
import AgeGroupSelect from "../component/ageGroupSelect";
import React, { useState, useEffect } from "react";
import { Add, Close } from "@mui/icons-material";

const AgeGroupPriceList = ({ onChange }) => {
  const [selectComponents, setSelectComponents] = useState([
    {
      id: 0,
      price: [],
      ageGroup: [],
    },
  ]);

  const handlePriceChange = (newPrice, index) => {
    setSelectComponents((prevSelect) => {
      const updatedSelect = [...prevSelect];
      updatedSelect[index].price = newPrice;
      return updatedSelect;
    });
  };

  const handleAgeGroupChange = (newAgeGroup, index) => {
    setSelectComponents((prevSelect) => {
      const updatedSelect = [...prevSelect];
      updatedSelect[index].ageGroup = newAgeGroup;
      return updatedSelect;
    });
  };

  const handleAddSelectClick = () => {
    setSelectComponents((prevSelect) => [
      ...prevSelect,
      {
        id: prevSelect.length,
        price: [],
        ageGroup: [],
      },
    ]);
  };

  const handleRemoveSelect = (indexToRemove) => {
    setSelectComponents((prevSelect) =>
      prevSelect.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    // 在這裡組合 result 數組
    const result = selectComponents.map(({ ageGroup, price }) => ({ ageGroup, price }));
    // 將 result 傳遞給外部的 onChange 函數
    onChange(result);
  }, [selectComponents, onChange]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      {selectComponents.map((select, index) => (
        <div key={select.id}>
          <Grid container minWidth={1000} key={select.id} spacing={0}>
            <PriceInput onChange={(newPrice) => handlePriceChange(newPrice, index)} />
            <AgeGroupSelect
              overlap={[]}  
              onChange={(newAgeGroup) => handleAgeGroupChange(newAgeGroup, index)}
            />
            <Button
              startIcon={<Close color="error" />}
              style={{ maxHeight: "10px", marginTop: "10px", marginLeft: "-100px", color: "red" }}
              onClick={() => handleRemoveSelect(index)}
            >
              移除
            </Button>
          </Grid>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <Button startIcon={<Add />} onClick={handleAddSelectClick} style={{ marginLeft: "35px" }}>
          新增價格設定
        </Button>
      </div>
    </div>
  );
};

export default AgeGroupPriceList;
