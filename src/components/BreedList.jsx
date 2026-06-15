import "../styles/breedList.css";
import BreedCard from "./BreedCard";
import Filter from "./Filter";

export default function BreedList({
    breeds,
    loading,
    error,
    favorites,
    temperamentList,
    originList,
    filters,
    onToggleFavorite,
    onSearch,
    onOpenDetails,
    onChangeFilter,
    onResetFilter,
    onFilter,
}) {
    return (
        <main id="breed-list">
            <Filter
                onSearch={onSearch}
                temperamentList={temperamentList}
                originList={originList}
                filters={filters}
                onChangeFilter={onChangeFilter}
                onResetFilter={onResetFilter}
                onFilter={onFilter}
            />

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
            )}
        </main>
    );
}
