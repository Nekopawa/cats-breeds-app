import "../styles/breedList.css";
import BreedCard from "./BreedCard";

export default function BreedList({ breeds, loading, error }) {
    return (
        <main id="breed-list">
            <p id="list__info">
                <span id="list__count">{breeds.length}</span> breeds found
            </p>

            {error ? (
                <p className="list__message">{error}</p>
            ) : loading ? (
                <p className="list__message">Loading...</p>
            ) : (
                <section id="breed-list__container">
                    {breeds.map((breed) => {
                        return <BreedCard key={breed.id} breed={breed} />;
                    })}
                </section>
            )}
        </main>
    );
}
