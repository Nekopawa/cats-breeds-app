import { useEffect, useState } from "react";
import "../styles/breedCard.css";

export default function BreedCard({ breed, favorites, onToggleFavorite }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id, name, temperament, origin, lifeSpan, image } = breed;
    const temperamentSplit = temperament.split(", ", 3);

    const isFavorite = favorites.find((breed) => breed.id === id);

    useEffect(() => {
        async function getImageUrl() {
            try {
                setLoading(true);
                setError(null);

                if (!image) {
                    throw Error("Could not fetch image.");
                }
                const response = await fetch(
                    `https://api.thecatapi.com/v1/images/${image}`,
                );

                if (!response.ok) {
                    throw Error("Could not fetch image.");
                }

                const data = await response.json();
                setImageUrl(data.url);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        getImageUrl();
    }, [image]);

    return (
        <div className="breed__card">
            {error ? (
                <p className="breed__image-message">{error}</p>
            ) : loading || !imageUrl ? (
                <p className="breed__image-message">Loading...</p>
            ) : (
                <picture className="breed__image">
                    <img src={imageUrl}></img>
                </picture>
            )}

            <div className="breed__information">
                <h2>{name}</h2>

                <p>{temperamentSplit.join(", ")}</p>

                <div className="information__origin">
                    <picture>
                        <img src="./icons/world.svg" alt="Word icon"></img>
                    </picture>
                    <p>{origin}</p>
                </div>

                <div className="information__life-span">
                    <picture>
                        <img
                            src="./icons/calendar.svg"
                            alt="Calendar icon"
                        ></img>
                    </picture>
                    <p>{lifeSpan} years</p>
                </div>

                <picture className="information__favorite">
                    {isFavorite ? (
                        <img
                            src="./icons/favorite_purple.svg"
                            alt="Favorite icon"
                            onClick={() => onToggleFavorite(id)}
                        ></img>
                    ) : (
                        <img
                            src="./icons/favorite_grey.svg"
                            alt="Favorite icon"
                            onClick={() => onToggleFavorite(id)}
                        ></img>
                    )}
                </picture>
            </div>
        </div>
    );
}
