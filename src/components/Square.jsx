import React from 'react';
import { Button, styled } from '@mui/material';

const StyledButton = styled(Button)({
  width: '80px',
  height: '80px',
  fontSize: '24px',
  color: 'white',
  backgroundColor: '#424242',
  border: '1px solid #616161',
  '&:hover': {
    backgroundColor: '#616161',
  },
});

const Square = React.memo(({ value, onClick, isWinnerSquare }) => {
  return (
    <StyledButton
      variant="outlined"
      onClick={onClick}
      style={{ backgroundColor: isWinnerSquare ? '#00ff00' : '#424242' }}
    >
      {value}
    </StyledButton>
  );
});

export default Square;