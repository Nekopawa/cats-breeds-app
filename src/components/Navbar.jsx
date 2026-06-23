import "../styles/navbar.css";

export default function Navbar({ onChangePage, selectedPage }) {
    function isPageSelected(page) {
        return selectedPage === page;
    }

    return (
        <nav id="navbar__container">
            <button
                className={
                    isPageSelected("explore")
                        ? "navbar__button--selected"
                        : "navbar__button"
                }
                onClick={() => onChangePage("explore")}
            >
                <picture>
                    {isPageSelected("explore") ? (
                        <img src="./icons/browse_purple.svg"></img>
                    ) : (
                        <img src="./icons/browse_grey.svg"></img>
                    )}
                </picture>
                <p>Explore</p>
            </button>

            <button
                className={
                    isPageSelected("favorites")
                        ? "navbar__button--selected"
                        : "navbar__button"
                }
                onClick={() => onChangePage("favorites")}
            >
                <picture>
                    {isPageSelected("favorites") ? (
                        <img src="./icons/favorite_purple.svg"></img>
                    ) : (
                        <img src="./icons/favorite_grey.svg"></img>
                    )}
                </picture>
                <p>Favorites</p>
            </button>

            {/* future feature
            <button
                className="navbar__button"
                onClick={() => onChangePage("more")}
            >
                <picture>
                    <img src="./icons/dots_more.svg"></img>
                </picture>
                <p>More</p>
            </button>*/}
        </nav>
    );
}
