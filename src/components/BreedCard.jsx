import "../styles/breedCard.css";

export default function BreedCard({
    breed,
    favorites,
    onToggleFavorite,
    onOpenDetails,
}) {
    const { id, name, temperament, origin, lifeSpan, weight } = breed;
    const temperamentSplit = temperament.split(", ", 3);

    const isFavorite = favorites.find((breed) => breed.id === id);

    function handleClickFavorite(event) {
        //prevents from triggering onOpenDetails
        event.stopPropagation();
        onToggleFavorite(id);
    }

    return (
        <div className="breed__card" onClick={() => onOpenDetails(id)}>
            <picture className="breed__image">
                <img src={`./breeds/${id}.webp`} alt={`${name} photo`}></img>
            </picture>

            <div className="breed__information">
                <h2>{name}</h2>

                <p>{temperamentSplit.join(", ")}</p>

                <div className="information__origin">
                    <picture>
                        <img src="./icons/world.svg" alt="World icon"></img>
                    </picture>
                    <p>{origin}</p>
                </div>

                <div className="information__weight">
                    <picture>
                        <img src="./icons/weight.svg" alt="Weight icon"></img>
                    </picture>
                    <p>{weight}kg</p>
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
                            onClick={handleClickFavorite}
                        ></img>
                    ) : (
                        <img
                            src="./icons/favorite_grey.svg"
                            alt="Favorite icon"
                            onClick={handleClickFavorite}
                        ></img>
                    )}
                </picture>
            </div>
        </div>
    );
}
