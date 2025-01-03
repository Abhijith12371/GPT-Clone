import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function Search() {
    const [userInput,setUserInput]=React.useState()
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <TextField
        label="Search Here"
        id="fullWidth"
        onChange={setUserInput(TextField.value)}
        value={userInput}
        sx={{
          width: '70%',
        }}

      />
    </div>
  );
}

export {userInput}
