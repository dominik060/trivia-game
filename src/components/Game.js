import React from "react";
import Question from "./Question";

export default function Game({
    data,
    score,
    checkAnswers,
    handleChange,
    check,
    playAgain,
}) {
    return (
        <div className="game">
            {data.map((dat, index) => {
                return (
                    <Question
                        key={dat.id}
                        id={dat.id}
                        question={dat.question}
                        correctAnswer={dat.correctAnswer}
                        incorrectAnswers={dat.incorrectAnswers}
                        handleChange={handleChange}
                        index={index}
                        check={check}
                        data={data}
                    />
                );
            })}
            <div className="check-score">
                {!check && (
                    <button
                        disabled={check}
                        onClick={checkAnswers}
                        style={{
                            cursor: check ? "not-allowed" : "pointer",
                        }}
                    >
                        Check answers
                    </button>
                )}

                {check && (
                    <h2 className="score">
                        You scored {score}/{data.length} correct answers
                    </h2>
                )}
                {check && <button onClick={playAgain}>Play again</button>}
            </div>
        </div>
    );
}
