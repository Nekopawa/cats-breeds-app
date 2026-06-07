import "../styles/favoritesList.css";

import BreedCard from "./BreedCard";

export default function FavoritesList({
    favorites,
    onToggleFavorite,
    onOpenDetails,
}) {
    return (
        <section id="favorites-list">
            <p id="favorite-list__info">
                <span id="list__count">{favorites.length}</span> favorites
            </p>

            {favorites.length === 0 ? (
                <div id="favorites-list__empty">
                    <picture>
                        <img src="./icons/favorite_purple_border.svg"></img>
                    </picture>
                    <p>No favorites yet?</p>
                    <p>
                        Tap the heart on any breed to add it to your favorites.
                    </p>
                </div>
            ) : (
                <section>
                    <section id="favorites-list__container">
                        {favorites.map((breed) => {
                            return (
                                <BreedCard
                                    key={breed.id}
                                    breed={breed}
                                    favorites={favorites}
                                    onToggleFavorite={onToggleFavorite}
                                    onOpenDetails={onOpenDetails}
                                />
                            );
                        })}
                    </section>
                </section>
            )}
        </section>
    );
}
