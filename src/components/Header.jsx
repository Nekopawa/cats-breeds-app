import "../styles/header.css";

export default function Header() {
    return (
        <header>
            <picture className="header__icons">
                <img src="./icons/paw.svg" alt="Cat paw"></img>
            </picture>
            <h1 id="header__title">Cat Breed Explorer</h1>
            <button id="header__button">
                <picture className="header__icons">
                    <img src="./icons/lines.svg" alt="More"></img>
                </picture>
            </button>
        </header>
    );
}
