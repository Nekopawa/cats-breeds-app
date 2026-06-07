import "../styles/header.css";

export default function Header({ page }) {
    if (page !== "details")
        return (
            <header>
                <picture className="header__icons">
                    {page === "explore" ? (
                        <img src="./icons/paw.svg" alt="Cat paw"></img>
                    ) : page === "favorites" ? (
                        <img
                            src="./icons/favorite_purple.svg"
                            alt="Heart"
                        ></img>
                    ) : (
                        <p>...</p>
                    )}
                </picture>

                {page === "explore" ? (
                    <h1 id="header__title">Cat Breed Explorer</h1>
                ) : page === "favorites" ? (
                    <h1 id="header__title">Favorites</h1>
                ) : (
                    <h1>More</h1>
                )}

                <button id="header__button">
                    <picture className="header__icons">
                        <img src="./icons/lines.svg" alt="More"></img>
                    </picture>
                </button>
            </header>
        );
}
