import React, { useEffect, useState } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";

const Setting = ({ playGame }) => {
    const [limit, setLimit] = useState({
        max: 50,
        min: 1,
        value: 10,
    });

    const [categories, setCategories] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState();

    useEffect(() => {
        axios
            .get("https://the-trivia-api.com/api/categories")
            .then((res) => {
                // console.log(res)
                setCategories(Object(res.data));
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function changeSelectedCategories(event) {
        setSelectedCategories(event);
    }

    function changeSelectedDifficulty(event) {
        setSelectedDifficulty(event);
    }

    function categoriesToUrl() {
        let categoriesUrl = [];
        selectedCategories.forEach((e) => {
            categoriesUrl.push(
                e.toLowerCase().replace("&", "and").replace(/\s+/g, "_")
            );
        });

        return categoriesUrl;
    }

    function makeUrl() {
        let gameUrl = `https://the-trivia-api.com/api/questions?${
            selectedCategories.length !== 0
                ? "categories=" + categoriesToUrl()
                : ""
        }&limit=${limit.value}${
            selectedDifficulty ? "&difficulty=" + selectedDifficulty : ""
        }`;
        // console.log(gameUrl)

        playGame(gameUrl);
    }

    return (
        <div className="App">
            <fieldset>
                <legend>Questions Setting</legend>
                <form>
                    <div className="input">
                        <div className="range">
                            <input
                                type="range"
                                name="limit"
                                id="limit"
                                max={limit.max}
                                min={limit.min}
                                value={limit.value}
                                onChange={(e) =>
                                    setLimit((prevLimit) => {
                                        return {
                                            ...prevLimit,
                                            value: e.target.value,
                                        };
                                    })
                                }
                            />
                            <label htmlFor="limit">Limit: {limit.value}</label>
                        </div>
                        <label>Select maximum number of questions (1 - 50)</label>
                    </div>
                    <div className="input">
                        <Multiselect
                            isObject={false}
                            placeholder="Select categories"
                            options={Object.keys(categories)}
                            showArrow={true}
                            displayValue="Categories"
                            selectedValues={selectedCategories}
                            onSelect={changeSelectedCategories}
                            onRemove={changeSelectedCategories}
                            className="Multiselect"
                        />
                        <label>Primary category for questions (10 categories)</label>
                    </div>
                    <div className="input">
                        <Multiselect
                            isObject={false}
                            singleSelect={true}
                            placeholder="Select difficulty"
                            options={["easy", "medium", "hard"]}
                            showArrow={true}
                            displayValue="Difficulty"
                            selectedValues={selectedDifficulty}
                            onSelect={changeSelectedDifficulty}
                            onRemove={changeSelectedDifficulty}
                            className="Multiselect"
                        />
                        <label>Three difficulties (easy, medium and hard)</label>
                    </div>
                </form>
            </fieldset>
            <button className="submit-play" onClick={makeUrl}>Submit and Play</button>
        </div>
    );
};

export default Setting;
