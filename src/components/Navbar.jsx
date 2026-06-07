import "../styles/navbar.css";

export default function Navbar({ onChangePage, selectedPage }) {
    return (
        <nav id="navbar__container">
            <button
                className="navbar__button"
                onClick={() => onChangePage("explore")}
            >
                <picture>
                    {selectedPage === "explore" ? (
                        <img src="./icons/browse_purple.svg"></img>
                    ) : (
                        <img src="./icons/browse_grey.svg"></img>
                    )}
                </picture>
                <p>Explore</p>
            </button>

            <button
                className="navbar__button"
                onClick={() => onChangePage("favorites")}
            >
                <picture>
                    {selectedPage === "favorites" ? (
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
