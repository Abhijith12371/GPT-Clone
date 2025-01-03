import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function Search({setUserInput,run,userInput}) {
    
    // const [userInput,setUserInput]=React.useState()
    const [input,setInput]=React.useState()
    const handleClick=()=>{
        if(input.trim()!=""){
            setUserInput(input)
            run(input)
            setInput("")
        }
    }
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
        // marginTop:"55px"
      }}
    >
      <TextField
        label="Search Here"
        id="fullWidth"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={e=>e.key=="Enter" && handleClick() && setUserInput("")}
        value={input}
        sx={{
          width: '70%',
        }}
      />
      <button className='bg-blue-500 px-5' onClick={handleClick}>Search</button>
    </div>
  );
}


