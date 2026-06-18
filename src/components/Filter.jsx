import { useState } from "react";
import "../styles/filter.css";

export default function Filter({
    temperamentList,
    originList,
    filters,
    onChangeFilter,
    onResetFilter,
    onFilter,
}) {
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [sortIsOpen, setSortIsOpen] = useState(false);

    const minWeight = filters.weight[0];
    const maxWeight = filters.weight[1];

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
        const searchValue = event.target.value;
        const nextFilters = { ...filters, search: searchValue };
        onChangeFilter("search", searchValue);
        onFilter(nextFilters);
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
                            defaultValue=""
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

                    <button
                        id="filter__apply-button"
                        onClick={() => onFilter(filters)}
                    >
                        Apply filters
                    </button>
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
                        <li>
                            <label
                                className="sort__item"
                                htmlFor="sort_name_asc"
                            >
                                <picture>
                                    <img src="./icons/sort_name.svg"></img>
                                </picture>
                                <p>Name (A - Z)</p>
                                <input
                                    type="radio"
                                    name="sort"
                                    id="sort_name_asc"
                                    value="name_asc"
                                ></input>
                            </label>
                        </li>
                        <li>
                            <label
                                className="sort__item"
                                htmlFor="sort_name_desc"
                            >
                                <picture>
                                    <img src="./icons/sort_name.svg"></img>
                                </picture>
                                <p>Name (Z - A)</p>
                                <input
                                    type="radio"
                                    name="sort"
                                    id="sort_name_desc"
                                    value="name_desc"
                                ></input>
                            </label>
                        </li>
                        <li>
                            <label
                                className="sort__item"
                                htmlFor="sort_weight_asc"
                            >
                                <picture>
                                    <img src="./icons/weight.svg"></img>
                                </picture>
                                <p>Weight (Low to High)</p>
                                <input
                                    type="radio"
                                    name="sort"
                                    id="sort_weight_asc"
                                    value="weight_asc"
                                ></input>
                            </label>
                        </li>
                        <li>
                            <label
                                className="sort__item"
                                htmlFor="sort_weight_desc"
                            >
                                <picture>
                                    <img src="./icons/weight.svg"></img>
                                </picture>
                                <p>Weight (High to Low)</p>
                                <input
                                    type="radio"
                                    name="sort"
                                    id="sort_weight_desc"
                                    value="weight_desc"
                                ></input>
                            </label>
                        </li>
                        <li>
                            <label
                                className="sort__item"
                                htmlFor="sort_life-span_asc"
                            >
                                <picture>
                                    <img src="./icons/calendar.svg"></img>
                                </picture>
                                <p>Life Span (Low to High)</p>
                                <input
                                    type="radio"
                                    name="sort"
                                    id="sort_life-span_asc"
                                    value="life_span_asc"
                                ></input>
                            </label>
                        </li>
                        <li>
                            <label
                                className="sort__item"
                                htmlFor="sort_life-span_desc"
                            >
                                <picture>
                                    <img src="./icons/calendar.svg"></img>
                                </picture>
                                <p>Life Span (High to Low)</p>
                                <input
                                    type="radio"
                                    name="sort"
                                    id="sort_life-span_desc"
                                    value="life_span_desc"
                                ></input>
                            </label>
                        </li>
                    </ul>
                </section>
            )}
        </section>
    );
}
