import "../styles/breedDetails.css";

export default function BreedDetails({
    breed,
    favorites,
    onToggleFavorite,
    onCloseDetails,
}) {
    const {
        id,
        name,
        origin,
        lifeSpan,
        affection,
        energy,
        adaptability,
        childFriendly,
        dogFriendly,
        weight,
        hypoallergenic,
        temperament,
        description,
        wikipedia,
    } = breed;

    const isFavorite = favorites.find((breed) => breed.id === id);

    function getLevelDescription(value) {
        if (value >= 1 && value <= 2) {
            return "Low";
        } else if (value >= 4 && value <= 5) {
            return "High";
        } else {
            return "Medium";
        }
    }

    function getWeight() {
        const weightArray = weight.split("-");

        return `${weightArray[0].trim()} - ${weightArray[1].trim()}kg`;
    }

    return (
        <section id="breed-detail__container">
            <picture id="details__image">
                <img src={`./breeds/${id}.webp`} alt={`${name} photo`}></img>
            </picture>

            <button onClick={onCloseDetails}>
                <picture id="details__back-button">
                    <img src="./icons/arrow_back.svg"></img>
                </picture>
            </button>

            <picture id="details__favorite-icon">
                {isFavorite ? (
                    <img src="./icons/favorite_purple.svg"></img>
                ) : (
                    <img src="./icons/favorite_grey.svg"></img>
                )}
            </picture>

            <section id="details__card">
                <h2>{name}</h2>

                <section id="details__header">
                    <div>
                        <picture>
                            <img src="./icons/world.svg" alt="World"></img>
                        </picture>
                        <div>
                            <p>Origin</p>
                            <p>{origin}</p>
                        </div>
                    </div>

                    <div>
                        <picture>
                            <img
                                src="./icons/calendar.svg"
                                alt="Calendar"
                            ></img>
                        </picture>
                        <div>
                            <p>Life Span</p>
                            <p>{lifeSpan} years</p>
                        </div>
                    </div>

                    <div>
                        <picture>
                            <img src="./icons/weight.svg" alt="Weight"></img>
                        </picture>
                        <div>
                            <p>Weight</p>
                            <p>{getWeight()}</p>
                        </div>
                    </div>
                </section>

                <section id="details__info">
                    <div className="info__item">
                        <picture>
                            <img src="./icons/favorite_grey.svg"></img>
                        </picture>
                        <p>Affection Level</p>
                        <p>{getLevelDescription(affection)}</p>
                    </div>

                    <div className="info__item">
                        <picture>
                            <img src="./icons/bolt.svg"></img>
                        </picture>
                        <p>Energy Level</p>
                        <p>{getLevelDescription(energy)}</p>
                    </div>

                    <div className="info__item">
                        <picture>
                            <img src="./icons/happy_face.svg"></img>
                        </picture>
                        <p>Adaptability</p>
                        <p>{getLevelDescription(adaptability)}</p>
                    </div>

                    <div className="info__item">
                        <picture>
                            <img src="./icons/child_friendly.svg"></img>
                        </picture>
                        <p>Child Friendly</p>
                        <p>{getLevelDescription(childFriendly)}</p>
                    </div>

                    <div className="info__item">
                        <picture>
                            <img src="./icons/dog_friendly.svg"></img>
                        </picture>
                        <p>Dog Friendly</p>
                        <p>{getLevelDescription(dogFriendly)}</p>
                    </div>

                    <div className="info__item">
                        <picture>
                            <img src="./icons/hypoallergenic.svg"></img>
                        </picture>
                        <p>Hypoallergenic</p>
                        <p>{hypoallergenic ? "Yes" : "No"}</p>
                    </div>
                </section>

                <section id="details__temperament">
                    <h3>Temperament</h3>
                    <ul>
                        {temperament.split(", ").map((item, index) => {
                            return <li key={index}>{item}</li>;
                        })}
                    </ul>
                </section>

                <section id="details__description">
                    <h3>Description</h3>
                    <p>{description}</p>
                </section>

                <section id="details__more">
                    <h3>More Information</h3>
                    <a href={wikipedia}>
                        <picture>
                            <img src="./icons/world.svg" alt="World"></img>
                        </picture>
                        <p>Wikipedia</p>
                    </a>
                </section>

                <button
                    id="details__add-favorite-button"
                    onClick={() => onToggleFavorite(id)}
                >
                    <picture>
                        <img src="./icons/favorite_white.svg" alt="Heart"></img>
                    </picture>
                    {isFavorite ? (
                        <p>Remove from favorites</p>
                    ) : (
                        <p>Add to favorites</p>
                    )}
                </button>
            </section>
        </section>
    );
}
