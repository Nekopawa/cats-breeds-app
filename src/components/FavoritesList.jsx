import "../styles/favoritesList.css";

import BreedCard from "./BreedCard";

export default function FavoritesList({ favorites, onToggleFavorite }) {
    return (
        <section id="favorites-list">
            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <section>
                    <p id="favorite-list__info">
                        <span id="list__count">{favorites.length}</span>{" "}
                        favorites
                    </p>

                    <section id="favorites-list__container">
                        {favorites.map((breed) => {
                            return (
                                <BreedCard
                                    key={breed.id}
                                    breed={breed}
                                    favorites={favorites}
                                    onToggleFavorite={onToggleFavorite}
                                />
                            );
                        })}
                    </section>
                </section>
            )}
        </section>
    );
}
