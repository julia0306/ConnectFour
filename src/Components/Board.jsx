import Slot from "./Slot";
import { useState } from "react";

const Board = () => {
    const [board, setBoard] = useState([
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
    ])

    const playerDisplay = document.getElementById("playerDisplay");
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [oppositePlayer, setOppositePlayer] = useState('O');
    const [gameOver, setGameOver] = useState (false);
    const checkWin = (row, column, ch) => {
        try {
            if (board[row + 1][column] === ch &&
                board[row + 2][column] === ch &&
                board[row + 3][column] === ch) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
    
        try {
            if (board[row + 1][column + 1] === ch &&
                board[row + 2][column + 2] === ch &&
                board[row + 3][column + 3] === ch) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
    
        try {
            if (board[row + 1][column - 1] === ch &&
                board[row + 2][column - 2] === ch &&
                board[row + 3][column - 3] === ch) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
    
        try {
            if (board[row][column + 1] === ch &&
                board[row][column + 2] === ch &&
                board[row][column + 3] === ch) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
    
        try {
            if (board[row][column - 1] === ch &&
                board[row][column - 2] === ch &&
                board[row][column - 3] === ch) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
    
        try {
            if (board[row - 1][column - 1] === ch &&
                board[row - 2][column - 2] === ch &&
                board[row - 3][column - 3] === ch) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
    
        try {
            if (board[row - 1][column + 1] === ch &&
                board[row - 2][column + 2] === ch &&
                board[row - 3][column + 3] === ch) {
                return true;
            }
        } catch (e) {
            console.log(e);
        }
    
        return false;
    };

    const updateBoard = (row, column, ch) => {
        const victory = checkWin(row, column, ch);
        setBoard(prev => {
            const boardCopy = [...prev];
            boardCopy[row][column] = ch;
            return boardCopy;
        });
        if (victory) {
            playerDisplay.style.display = "none";
            setGameOver(true);
        }
        return victory;
    };

    const handleClick = (e) => {
        const column = e.target.getAttribute('x');
        if (column !== null && column !== undefined) {
            let row = board.findIndex((rowArr, index) => {
                return (rowArr[column] !== '' || index === board.length - 1);
            });
            if (row !== board.length - 1) row -= 1;
            if (board[row][column] !== '') row -= 1;
    
            setGameOver((prevGameOver) => {
                const isGameWon = updateBoard(row, column, currentPlayer);
    
                if (!prevGameOver && isGameWon) {
                    return true;
                }
 
                const currPlayerCopy = currentPlayer;
                setCurrentPlayer(oppositePlayer);
                setOppositePlayer(currPlayerCopy);
    
                return false;
            });
        } else {
            console.error("Invalid column");
        }
    };

    return (
        <div id="container">
            <h1>CONNECT FOUR</h1>
            <div id="info">
            {gameOver && (
                <h2>{oppositePlayer === "X" ? "Yellow" : "Blue"} player, you win ! </h2>
            )}
            <h2 id="playerDisplay">{currentPlayer === "X" ? "Blue" : "Yellow"} player, your turn ! </h2>
            </div>
            <div id="board" onClick={gameOver ? null : handleClick}>
                {board.map((row, i) => {
                    return row.map((ch, j) => {
                        return <Slot ch={ch} y={i} x={j}/>
                    })
                })}
            </div>
        </div>
    )
}

export default Board