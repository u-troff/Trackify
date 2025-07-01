import {useState} from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs,{Dayjs} from  'dayjs'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
interface Props {
  selected: dayjs.Dayjs | null;
  setSelected: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  canSelect:booolean;
}

 const BasicDatePicker:React.FC<Props>=(dates)=> {
    if(!dates.canSelect){return}
    //console.log(dates.selected?.toISOString().split("T")[0]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label ="select a date"
            value={dates.selected}
            onChange={(newdate)=>dates.setSelected(newdate)}

            />
    </LocalizationProvider>
    
     );
}


export default BasicDatePicker