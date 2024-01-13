import React, { useState, useEffect, useMemo } from 'react';
import { Card, styled } from '@mui/material';
import GameScreen from './GameScreen';
import StartScreen from './StartScreen';

const StyledCard = styled(Card)({
  maxWidth: '400px',
  margin: '50px auto',
  padding: '20px',
  backgroundColor: '#424242',
  color: 'white',
});

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [isGameOver, setGameOver] = useState(false);
  const [allowComputerMove, setAllowComputerMove] = useState(true);

  useEffect(() => {
    const checkWinner = () => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner({
            player: board[a] === player ? 'Player' : 'Computer',
            line: lines[i],
          });
          setGameOver(true);
          return;
        }
      }

      if (!board.includes(null) && !winner) {
        setWinner({ player: 'Match Draw', line: [] });
        setGameOver(true);
      }
    };

    checkWinner();
  }, [board, player, winner]);

  useEffect(() => {
    const handleComputerMove = async () => {
      if (!isPlayerTurn && allowComputerMove && !isGameOver) {
        const computerMove = await getComputerMove(board);
        const newBoard = [...board];
        newBoard[computerMove] = player === 'X' ? 'O' : 'X';
        setBoard(newBoard);
        setPlayerTurn(true);
        setAllowComputerMove(false);
      }
    };

    handleComputerMove();
  }, [board, player, winner, isPlayerTurn, isGameOver, allowComputerMove]);

  const handleStartGame = (selectedPlayer) => {
    setPlayer(selectedPlayer);
    setGameStarted(true);
  };

  const getComputerMove = async (currentBoard) => {
    try {
      const response = await fetch('https://hiring-react-assignment.vercel.app/api/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentBoard),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const computerMove = Number(data);

      if (isNaN(computerMove) || computerMove < 0 || computerMove > 8) {
        throw new Error('Invalid move received from the API');
      }

      return computerMove;
    } catch (error) {
      console.error('Error fetching computer move:', error);
      return 0;
    }
  };

  const memoizedGameScreenProps = useMemo(() => {
    const handleClick = async (index) => {
      if (!board[index] && isPlayerTurn && !isGameOver) {
        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);
        setPlayerTurn(false);
        setAllowComputerMove(true);
      }
    };

    const handleRestart = () => {
      setBoard(initialBoard);
      setPlayer(null);
      setWinner(null);
      setGameStarted(false);
      setPlayerTurn(true);
      setGameOver(false);
    };

    return {
      board,
      player,
      winner,
      handleClick,
      handleRestart,
    };
  }, [board, player, winner, isPlayerTurn, isGameOver, initialBoard]);

  return (
    <StyledCard>
      {gameStarted ? (
        <GameScreen {...memoizedGameScreenProps} />
      ) : (
        <StartScreen handleStartGame={(selectedPlayer) => handleStartGame(selectedPlayer)} />
      )}
    </StyledCard>
  );
};

export default TicTacToe;