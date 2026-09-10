import { useState } from "react";
import { usePsychologists } from "../hooks/usePsychologists";
import { SORT_OPTIONS } from "../api/psychologists";
import { useAuth } from "../context/AuthContext";
import { useFavorites } from "../context/FavoritesContext";
import PsychologistCard from "../components/PsychologistCard/PsychologistCard";
import Modal from "../components/Modal/Modal";
import LoginForm from "../components/AuthForm/LoginForm";
import styles from "./Psychologists.module.css";

export default function Psychologists() {
  const { items, sort, changeSort, loadMore, hasMore, isLoading, error } =
    usePsychologists();

  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [authOpen, setAuthOpen] = useState(false);

  const handleToggleFavorite = (id) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    toggleFavorite(id);
  };

  return (
    <main className={styles.page}>
      <div className={styles.toolbar}>
        <label className={styles.filterLabel} htmlFor="sort">
          Filters
        </label>
        <select
          id="sort"
          className={styles.select}
          value={sort}
          onChange={(e) => changeSort(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className={styles.error}>
          Something went wrong loading psychologists. Please try again.
        </p>
      )}

      <ul className={styles.list}>
        {items.map((p) => (
          <li key={p.id}>
            <PsychologistCard
              psychologist={p}
              isFavorite={isFavorite(p.id)}
              onToggleFavorite={() => handleToggleFavorite(p.id)}
            />
          </li>
        ))}
      </ul>

      {isLoading && <p className={styles.status}>Loading...</p>}

      {!isLoading && hasMore && (
        <button type="button" className={styles.loadMore} onClick={loadMore}>
          Load more
        </button>
      )}

      <Modal isOpen={authOpen} onClose={() => setAuthOpen(false)}>
        <LoginForm onSuccess={() => setAuthOpen(false)} />
      </Modal>
    </main>
  );
}
