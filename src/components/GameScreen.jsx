import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Square from './Square';

const GameScreen = ({ board, player, winner, handleClick, handleRestart }) => {
  const renderSquare = (index) => {
    const isWinnerSquare = winner && winner.line.includes(index);

    return (
      <Grid item key={index} marginRight={'8px'}>
        <Square value={board[index]} onClick={() => handleClick(index)} isWinnerSquare={isWinnerSquare} />
      </Grid>
    );
  };

  const getTurnMessage = () => {
    if (winner && (winner.player === 'Player' || winner.player === 'Computer')) {
      return `${winner.player} wins`;
    } else if (winner && winner.player === 'Match Draw') {
      return 'Match Draw';
    } else {
      return `Turn: ${player === 'X' ? 'Player' : 'Computer'}`;
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ color: 'white', marginBottom: '20px' }}>
        Tic Tac Toe
      </Typography>
      <Typography variant="h6" gutterBottom style={{ color: 'white', marginBottom: '20px' }}>
        {getTurnMessage()}
      </Typography>
      <Grid container spacing={1}>
        {[0, 1, 2].map((row) => (
          <Grid container item key={row} justifyContent="center" alignItems="center">
            {[0, 1, 2].map((col) => {
              const squareIndex = row * 3 + col;
              return renderSquare(squareIndex);
            })}
          </Grid>
        ))}
      </Grid>
      {winner && (
        <Button variant="outlined" onClick={handleRestart} style={{ color: 'white', borderColor: '#616161', marginTop: '5px' }}>
          Restart
        </Button>
      )}
    </div>
  );
};

export default GameScreen;