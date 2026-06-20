import { useState } from "react";
import "../styles/filter.css";
import { FILTER_INITIAL_STATE } from "../reducer/filterReducer";

export default function Filter({
    temperamentList,
    originList,
    filters,
    sortOption,
    onChangeFilter,
    onResetFilter,
    onChangeSort,
    onRemoveFilter,
}) {
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [sortIsOpen, setSortIsOpen] = useState(false);

    const sortOptions = [
        { id: "sort_name_asc", value: "name_asc", label: "Name (A - Z)" },
        { id: "sort_name_desc", value: "name_desc", label: "Name (Z - A)" },
        {
            id: "sort_weight_asc",
            value: "weight_asc",
            label: "Weight (Low to High)",
        },
        {
            id: "sort_weight_desc",
            value: "weight_desc",
            label: "Weight (High to Low)",
        },
        {
            id: "sort_life_span_asc",
            value: "life_span_asc",
            label: "Life span (Low to High)",
        },
        {
            id: "sort_life_span_desc",
            value: "life_span_desc",
            label: "Life span (High to Low)",
        },
    ];

    const minWeight = filters.weight[0];
    const maxWeight = filters.weight[1];

    //deal with arrays (temperament and weight)
    const hasActiveFilters =
        JSON.stringify(filters) !== JSON.stringify(FILTER_INITIAL_STATE);
    const hasActiveSort = sortOption !== "name_asc";

    function handleToggleTemperament(temperament) {
        const isSelected = filters.temperaments?.includes(temperament);

        const newTemperaments = isSelected
            ? filters.temperaments.filter((item) => item !== temperament)
            : [...filters.temperaments, temperament];

        onChangeFilter("temperaments", newTemperaments);
    }

    function handleToggleChildDogFriendly(option, value) {
        const isSelected = filters[option] === value;

        if (isSelected) {
            onChangeFilter(option, "any");
        } else {
            onChangeFilter(option, value);
        }
    }

    function handleChangeMinWeight(event) {
        const newMin = Number(event.target.value);

        onChangeFilter("weight", [Math.min(newMin, maxWeight), maxWeight]);
    }

    function handleChangeMaxWeight(event) {
        const newMax = Number(event.target.value);

        onChangeFilter("weight", [minWeight, Math.max(newMax, minWeight)]);
    }

    function handleSearchChange(event) {
        onChangeFilter("search", event.target.value);
    }

    function getFilterDescription(key, value) {
        switch (key) {
            case "search": {
                return `Name: ${value}`;
            }
            case "childFriendly": {
                return `Child Friendly: ${value}`;
            }
            case "dogFriendly": {
                return `Dog Friendly: ${value}`;
            }
            case "hypoallergenic": {
                return "Hypoallergenic";
            }
            case "origin": {
                return `Origin: ${value}`;
            }
            case "weight": {
                return `Weight: ${value[0]}kg - ${value[1]}kg`;
            }
            default: {
                return null;
            }
        }
    }

    return (
        <section id="filter__bar">
            <div id="filter__input-wrapper">
                <input
                    id="filter__input"
                    type="text"
                    placeholder="Search cat breeds..."
                    value={filters.search}
                    onChange={handleSearchChange}
                />
            </div>

            <button
                className="filter__button"
                onClick={() => {
                    setSortIsOpen(false);
                    setFilterIsOpen(!filterIsOpen);
                }}
            >
                <picture>
                    <img src="./icons/filter.svg"></img>
                </picture>
                <p>Filter</p>
            </button>

            <button
                className="filter__button"
                onClick={() => {
                    setFilterIsOpen(false);
                    setSortIsOpen(!sortIsOpen);
                }}
            >
                <picture>
                    <img src="./icons/sort.svg"></img>
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
                        <button
                            id="filter__reset-button"
                            onClick={onResetFilter}
                        >
                            Reset
                        </button>
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

                    <div id="options__hypoallergenic">
                        <h3>Hypoallergenic</h3>
                        <label className="hypoallergenic__toggle">
                            <input
                                type="checkbox"
                                checked={filters.hypoallergenic}
                                onChange={(event) =>
                                    onChangeFilter(
                                        "hypoallergenic",
                                        event.target.checked,
                                    )
                                }
                            ></input>
                            <span className="hypoallergenic__toggle-slider"></span>
                        </label>
                    </div>

                    <div id="options__origin">
                        <h3>Origin</h3>
                        <select
                            value={filters.origin || ""}
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
                            <p>{minWeight} kg</p>
                            <div className="range-slider">
                                <div className="range-slider__track"></div>

                                <div
                                    className="range-slider__selected"
                                    style={{
                                        left: `${(minWeight / 10) * 100}%`,
                                        right: `${100 - (maxWeight / 10) * 100}%`,
                                    }}
                                ></div>

                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="1"
                                    value={minWeight}
                                    onChange={handleChangeMinWeight}
                                ></input>
                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="1"
                                    value={maxWeight}
                                    onChange={handleChangeMaxWeight}
                                ></input>
                            </div>
                            <p>
                                {maxWeight === 10
                                    ? `10+ kg`
                                    : `${maxWeight} kg`}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {sortIsOpen && (
                <section id="sort__options">
                    <div id="sort__header">
                        <button
                            id="sort__close-button"
                            onClick={() => setSortIsOpen(false)}
                        >
                            <picture>
                                <img src="./icons/close.svg"></img>
                            </picture>
                        </button>
                        <h2>Sort By</h2>
                    </div>

                    <ul id="sort__container">
                        {sortOptions.map((option) => {
                            return (
                                <li key={option.id}>
                                    <label
                                        className="sort__item"
                                        htmlFor={option.id}
                                    >
                                        <picture>
                                            {option.id.includes("name") ? (
                                                <img src="./icons/sort_name.svg"></img>
                                            ) : option.id.includes("weight") ? (
                                                <img src="./icons/weight.svg"></img>
                                            ) : (
                                                option.id.includes(
                                                    "life_span",
                                                ) && (
                                                    <img src="./icons/calendar.svg"></img>
                                                )
                                            )}
                                        </picture>
                                        <p>{option.label}</p>
                                        <input
                                            type="radio"
                                            name="sort"
                                            id={option.id}
                                            value={option.value}
                                            checked={
                                                option.value === sortOption
                                            }
                                            onChange={(event) =>
                                                onChangeSort(event.target.value)
                                            }
                                        ></input>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            )}

            {(hasActiveFilters || hasActiveSort) && (
                <section id="selected-filters__container">
                    <ul>
                        {Object.entries(filters).map(([key, value]) => {
                            //deal with arrays (temperament and weight)
                            const hasChanged =
                                JSON.stringify(value) !==
                                JSON.stringify(FILTER_INITIAL_STATE[key]);

                            if (!hasChanged) return null;

                            if (key !== "temperaments") {
                                return (
                                    <li key={key}>
                                        <p>
                                            {getFilterDescription(key, value)}
                                        </p>
                                        <button
                                            type="button"
                                            className="delete_filter_button"
                                            onClick={() => onRemoveFilter(key)}
                                        >
                                            <picture>
                                                <img
                                                    src="./icons/close_purple.svg"
                                                    alt={`Delete filter ${key} button`}
                                                ></img>
                                            </picture>
                                        </button>
                                    </li>
                                );
                            }

                            if (key === "temperaments") {
                                return value.map((temperament) => (
                                    <li key={temperament}>
                                        <p>Temperament: {temperament}</p>
                                        <button
                                            type="button"
                                            className="delete_filter_button"
                                            onClick={() =>
                                                onRemoveFilter(
                                                    "temperaments",
                                                    temperament,
                                                )
                                            }
                                        >
                                            <picture>
                                                <img
                                                    src="./icons/close_purple.svg"
                                                    alt={`Delete filter ${temperament} button`}
                                                ></img>
                                            </picture>
                                        </button>
                                    </li>
                                ));
                            }
                        })}

                        {sortOption !== "name_asc" && (
                            <li key="sort">
                                <p>
                                    Sort:{" "}
                                    {
                                        sortOptions.find(
                                            (option) =>
                                                option.value === sortOption,
                                        ).label
                                    }
                                </p>
                                <picture>
                                    <button
                                        type="button"
                                        className="delete_filter_button"
                                        onClick={() => onChangeSort("name_asc")}
                                    >
                                        <img
                                            src="./icons/close_purple.svg"
                                            alt={`Delete selected sort button`}
                                        ></img>
                                    </button>
                                </picture>
                            </li>
                        )}
                    </ul>
                </section>
            )}
        </section>
    );
}
