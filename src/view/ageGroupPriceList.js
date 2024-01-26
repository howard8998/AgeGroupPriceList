import { Grid } from "@mui/material";
import PriceInput from "../component/PriceInput";
import AgeGroupSelect from "../component/AgeGroupSelect"
const ageGroupPriceList = () => {
  return (
    <Grid container minWidth={1000}>
      <PriceInput />
      <AgeGroupSelect/>
    </Grid>
  );
};
export default ageGroupPriceList;
