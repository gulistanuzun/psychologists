import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { fetchPsychologistsByIds } from "../api/psychologists";
import PsychologistCard from "../components/PsychologistCard/PsychologistCard";
import styles from "./Psychologists.module.css";

export default function Favorites() {
  const { ids, isFavorite, toggleFavorite } = useFavorites();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    if (ids.length === 0) {
      setItems([]);
      return;
    }

    setIsLoading(true);
    fetchPsychologistsByIds(ids)
      .then((rows) => {
        if (!ignore) setItems(rows);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [ids]);

  return (
    <main className={styles.page}>
      {isLoading && <p className={styles.status}>Loading...</p>}

      {!isLoading && items.length === 0 && (
        <p className={styles.status}>You don&apos;t have favorites yet.</p>
      )}

      <ul className={styles.list}>
        {items.map((p) => (
          <li key={p.id}>
            <PsychologistCard
              psychologist={p}
              isFavorite={isFavorite(p.id)}
              onToggleFavorite={() => toggleFavorite(p.id)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
