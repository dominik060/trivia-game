import React, { useState, useEffect } from "react";
import axios from "axios";
import StartGame from "./components/StartGame.js";
import Game from "./components/Game.js";
import Setting from "./components/Setting.js";

function App() {
    const [GameView, setGameView] = useState(false);
    const [check, setCheck] = useState(false);
    const [data, setData] = useState([]);
    const [score, setScore] = useState(0);
    const [settingView, setSettingView] = useState(false);
    const [questionsUrl, setQuestionsUrl] = useState(
        "https://the-trivia-api.com/api/questions"
    );

    function startGame() {
        setSettingView(true);
    }

    function playGame(gameUrl) {
        // console.log(gameUrl);
        setQuestionsUrl(gameUrl);
        setGameView(true);
        setSettingView(false);
    }

    useEffect(() => {
        axios
            .get(`${questionsUrl}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [questionsUrl]);

    function handleChange(index, id, value) {
        // console.log(index, id, value);
        // data.map(x=>console.log(x.answer))
        let newArr = [...data];
        newArr[index].answer = value;
        setData(newArr);
    }

    function checkAnswers() {
        setCheck((prevCheck) => !prevCheck);
        data.forEach((e) => {
            if (e.answer === e.correctAnswer) {
                setScore((prevScore) => prevScore + 1);
            }
        });
    }

    function playAgain() {
        setGameView(false);
        setSettingView(true);
        setCheck(false);
        setScore(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="App">
            {/* Start GameView view */}
            {!GameView && !settingView && <StartGame startGame={startGame} />}

            {/* Questions Setting view */}
            {settingView && !GameView && (
                <div>
                    <Setting playGame={playGame} />
                    {/* <button onClick={playGame}></button> */}
                </div>
            )}

            {/* Game view */}
            {GameView && !settingView && (
                <Game
                    data={data}
                    score={score}
                    checkAnswers={checkAnswers}
                    handleChange={handleChange}
                    check={check}
                    playAgain={playAgain}
                />
            )}

            {/* Background blobs */}
            <div className="bg">
                <img src="./img/blob1.svg" alt="" />
                <img src="./img/blob2.svg" alt="" />
            </div>
        </div>
    );
}

export default App;
