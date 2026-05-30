import "../styles/filter.css";

export default function Filter({ onSearch }) {
    function handleChangeInput(event) {
        onSearch(event.target.value);
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

            <button id="filter__button">
                <picture>
                    <img src="/icons/filter.svg"></img>
                </picture>
            </button>
        </section>
    );
}
