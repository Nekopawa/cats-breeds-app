import { useState } from "react";
import "../styles/filter.css";

export default function Filter({
    onSearch,
    temperamentList,
    originList,
    filters,
    onChangeFilter,
}) {
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [sortIsOpen, setSortIsOpen] = useState(false);

    function handleChangeInput(event) {
        onSearch(event.target.value);
    }

    function handleToggleTemperament(temperament) {
        const isSelected = filters.temperaments?.includes(temperament);

        const newTemperaments = isSelected
            ? filters.temperaments.filter((item) => item !== temperament)
            : [...filters.temperaments, temperament];

        onChangeFilter("temperaments", newTemperaments);
    }

    function handleToggleChildDogFriendly(option, value) {
        let newOptions;

        if (value !== "any") {
            const isSelected = filters[option].includes(value);

            newOptions = isSelected
                ? filters[option].filter((item) => item !== value)
                : [...filters[option], value];
            newOptions = newOptions.filter((item) => item !== "any");

            if (newOptions.length === 0 || newOptions.length === 3)
                newOptions = ["any"];
        } else {
            newOptions = ["any"];
        }

        onChangeFilter(option, newOptions);
    }

    return (
        <section id="filter__bar">
            <div id="filter__input-wrapper">
                <input
                    id="filter__input"
                    type="text"
                    placeholder="Search cat breeds..."
                    onChange={handleChangeInput}
                />
            </div>

            <button
                className="filter__button"
                onClick={() => setFilterIsOpen(!filterIsOpen)}
            >
                <picture>
                    <img src="/icons/filter.svg"></img>
                </picture>
                <p>Filter</p>
            </button>

            <button className="filter__button">
                <picture>
                    <img src="/icons/sort.svg"></img>
                </picture>
                <p>Sort</p>
            </button>

            {filterIsOpen && (
                <section id="filter__options">
                    <div id="filter__header">
                        <button
                            id="filter__close-button"
                            onClick={() => setFilterIsOpen(false)}
                        >
                            <picture>
                                <img
                                    src="./icons/close.svg"
                                    alt="Close button"
                                ></img>
                            </picture>
                        </button>
                        <h2>Filters</h2>
                        <button id="filter__reset-button">Reset</button>
                    </div>

                    <div id="options__temperament">
                        <h3>Temperament</h3>
                        <ul>
                            {temperamentList.map((temperament) => (
                                <li
                                    key={temperament}
                                    className={
                                        filters.temperaments?.includes(
                                            temperament,
                                        )
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        handleToggleTemperament(temperament)
                                    }
                                >
                                    {temperament}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div id="options__child-friendly">
                        <h3>Child Friendly</h3>
                        <ul>
                            {["any", "low", "medium", "high"].map((option) => {
                                return (
                                    <li
                                        key={option}
                                        className={
                                            filters.childFriendly.includes(
                                                option,
                                            )
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() =>
                                            handleToggleChildDogFriendly(
                                                "childFriendly",
                                                option,
                                            )
                                        }
                                    >
                                        {option}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div id="options__dog-friendly">
                        <h3>Dog Friendly</h3>
                        <ul>
                            {["any", "low", "medium", "high"].map((option) => {
                                return (
                                    <li
                                        key={option}
                                        className={
                                            filters.dogFriendly.includes(option)
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() =>
                                            handleToggleChildDogFriendly(
                                                "dogFriendly",
                                                option,
                                            )
                                        }
                                    >
                                        {option}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div>
                        <h3>Hypoallergenic</h3>
                    </div>

                    <div id="options__origin">
                        <h3>Origin</h3>
                        <select
                            onChange={(event) =>
                                onChangeFilter(
                                    "origin",
                                    event.target.value || null,
                                )
                            }
                        >
                            <option value="">All Origins</option>
                            {originList.map((origin) => (
                                <option key={origin}>{origin}</option>
                            ))}
                        </select>
                    </div>

                    <div id="options__weigth">
                        <h3>Weight (Metric)</h3>
                        <div id="weight__wrapper">
                            <p>0kg</p>
                            <input
                                type="range"
                                min="0"
                                max="99"
                                step="1"
                            ></input>
                            <p>10+ kg</p>
                        </div>
                    </div>

                    <button id="filter__apply-button">Apply filters</button>
                </section>
            )}
        </section>
    );
}
