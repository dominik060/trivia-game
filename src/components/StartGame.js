import React from "react";

const StartGame = ({ startGame }) => {
    return (
        <div className="start">
            <h1>Trivia Game</h1>
            <button onClick={startGame}>Start quiz</button>
        </div>
    );
};

export default StartGame;
