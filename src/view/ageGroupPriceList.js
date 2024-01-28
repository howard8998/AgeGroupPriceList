import { Grid, Button } from "@mui/material";
import PriceInput from "../component/priceInput";
import AgeGroupSelect from "../component/ageGroupSelect";
import { getNumberIntervals } from "../utils";
import React, { useState, useEffect } from "react";
import { Add, Close } from "@mui/icons-material";

const AgeGroupPriceList = ({ onChange }) => {
  const [overlap, setOverLap] = useState([]);
  const [notInclude, setNotInclude] = useState();
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
    // 短暫延遲避免重複回傳result
    const timeoutId = setTimeout(() => {
      const ageGroupSets = selectComponents.map(({ ageGroup }) => ageGroup);
      const { overlap, notInclude } = getNumberIntervals(ageGroupSets);
      setOverLap(overlap);
      setNotInclude(notInclude);
      const result = selectComponents.map(({ ageGroup, price }) => ({
        ageGroup,
        price,
      }));
      onChange(result);
    }, 5);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectComponents, onChange]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft:"50px"
      }}
    >
      {selectComponents.map((select, index) => (
        <div
          key={select.id}
          style={{ borderBottom: "1px solid ",borderColor:'lightgray', marginBottom: "20px" }}
        >
          <Grid container minWidth={900} key={select.id} spacing={0}>
            <PriceInput
              onChange={(newPrice) => handlePriceChange(newPrice, index)}
            />
            <AgeGroupSelect
              overlap={overlap}
              onChange={(newAgeGroup) =>
                handleAgeGroupChange(newAgeGroup, index)
              }
            />
            <Button
              startIcon={<Close color="error" />}
              style={{
                maxHeight: "10px",
                marginTop: "10px",
                marginLeft: "-100px",
                color: "red",
              }}
              onClick={() => handleRemoveSelect(index)}
            >
              移除
            </Button>
          </Grid>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          startIcon={<Add />}
          onClick={handleAddSelectClick}
          style={{ marginLeft: "35px" }}
          disabled={notInclude?.length === 0}
        >
          新增價格設定
        </Button>
      </div>
    </div>
  );
};

export default AgeGroupPriceList;
