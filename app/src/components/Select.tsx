import { FormControl, InputLabel, MenuItem, Select as MUISelect, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { Search } from "../utils/types";

  const Select = ({handleArrhythmiasFilter}: Search) => {
    const [selectedValue, setupValue] = useState<number>(5);
    let options = [
      { 
        name: 'None',
        value: 5
      },
      {
        name:'AFib',
        value:0
    },{
        name:'AV Block',
        value:1
    },{
        name:'Pause',
        value: 2
    },{
        name:'PSVC',
        value: 3
    },
    {
      name:'PVC',
      value: 4
    }
  
  ];

    let valueList = ['AFib','AV Block','Pause', 'PSVC', 'PVC'];

   const optionList = options.map(({ name, value }) => (
    <MenuItem key={name} value={value}>
      {name}
    </MenuItem>
  ));

  const selectArrhythmias = (event: SelectChangeEvent<number>) => {
    const currentValue = Number(event.target.value);
    setupValue(currentValue);
    const arrhytmias = currentValue !== 5 ? valueList[currentValue] : 'none';
    handleArrhythmiasFilter(arrhytmias);
  };
  
  return <FormControl>
    <InputLabel sx={{ fontWeight: 'bold', width: '200px' }}>Filter Arrhythmias</InputLabel>
    <MUISelect
      value={selectedValue}
      onChange={selectArrhythmias}
      sx={{
        width: '200px'
      }}
    >
      {optionList}
    </MUISelect>
  </FormControl>
  }

  export default Select;