import React from 'react';
import { Button, Typography } from '@mui/material';

const StartScreen = ({ handleStartGame }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: 'white', marginBottom: '20px' }}>
        Tic Tac Toe
      </Typography>
      <Typography variant="h6" gutterBottom style={{ color: 'white', marginBottom: '20px' }}>
        Choose 'X' or 'O' to start the game
      </Typography>
      <Button
        variant="outlined"
        onClick={() => handleStartGame('X')}
        style={{ color: 'white', borderColor: '#616161', marginRight: '5px', fontWeight: 'bold' }}
      >
        X
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleStartGame('O')}
        style={{ color: 'white', borderColor: '#616161', fontWeight: 'bold' }}
      >
        O
      </Button>
    </div>
  );
};

export default StartScreen;