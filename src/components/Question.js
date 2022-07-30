import React, { useEffect, useState } from "react";

const Question = ({
    id,
    question,
    correctAnswer,
    incorrectAnswers,
    handleChange,
    index,
    check,
    data,
}) => {
    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }

    const [answers, setAnswers] = useState([]);
    useEffect(
        function () {
            let answersArr = [];
            answersArr.push(correctAnswer);
            incorrectAnswers.map((answer) => answersArr.push(answer));
            shuffle(answersArr);
            setAnswers(answersArr);
        },
        [correctAnswer, incorrectAnswers]
    );

    return (
        <div>
            <h2>{question}</h2>
            <form>
                {answers.map((answer) => {
                    return (
                        <div key={answer+"1"} >
                            <input
                                key={answer+"2"}
                                type="radio"
                                name={id}
                                id={answer}
                                value={answer}
                                onChange={() => handleChange(index, id, answer)}
                                disabled={check}
                            />
                            <label
                                key={answer+"3"}
                                style={
                                    check
                                        ? {
                                              pointer: "not-allowed",

                                              backgroundColor:
                                                  answer === correctAnswer
                                                      ? "#94D7A2"
                                                      : answer ===
                                                        data[index].answer
                                                      ? answer ===
                                                        correctAnswer
                                                          ? "#94D7A2"
                                                          : "#F8BCBC"
                                                      : "transparent",
                                              border:
                                                  answer === correctAnswer ||
                                                  answer === data[index].answer
                                                      ? "None"
                                                      : "0.1em solid #A1A9CD",
                                              color:
                                                  answer === correctAnswer
                                                      ? "#293264"
                                                      : answer ===
                                                        data[index].answer
                                                      ? "#8F95B0"
                                                      : "#8F95B0",
                                          }
                                        : {}
                                }
                                htmlFor={answer}
                            >
                                {answer}
                            </label>
                        </div>
                    );
                })}
            </form>
            <hr />
        </div>
    );
};
export default Question;
