import React, { useEffect, useState } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";

const Setting = () => {
    const [limit, setLimit] = useState({
        max: 30,
        min: 0,
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

    return (
        <div className="App">
            <fieldset>
                <legend>Questions Setting</legend>
                <form>
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
                    <br />
{/*                     
                    <Multiselect
                        isObject={false}
                        placeholder="Select categories"
                        options={Object.keys(categories)}
                        showArrow={true}
                        displayValue="Categories"
                        selectedValues={selectedCategories}
                        onSelect={changeSelectedCategories}
                        onRemove={changeSelectedCategories}
                    />
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
                    /> */}
                </form>
            </fieldset>
            <a
                href={`https://the-trivia-api.com/api/questions?${
                    selectedCategories.length !== 0
                        ? "categories=" + categoriesToUrl()
                        : ""
                }&limit=${limit.value}${
                    selectedDifficulty
                        ? "&difficulty=" + selectedDifficulty
                        : ""
                }`}
            >
                Link
            </a>
            {/* <a href={
            "https://the-trivia-api.com/api/questions?"+
            {selectedCategories.length !== 0 &&
                "categories=" + categoriesToUrl()}
            &limit={limit.value}
            {selectedDifficulty && "&difficulty=" + selectedDifficulty[0]} */}
        </div>
    );
};

export default Setting