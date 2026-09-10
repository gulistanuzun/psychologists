import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext(null);

const keyFor = (uid) => `favorites:${uid}`;

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    if (!user) {
      setIds([]);
      return;
    }
    try {
      const raw = localStorage.getItem(keyFor(user.uid));
      setIds(raw ? JSON.parse(raw) : []);
    } catch {
      setIds([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(keyFor(user.uid), JSON.stringify(ids));
  }, [ids, user]);

  const isFavorite = (id) => ids.includes(id);

  const toggleFavorite = (id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <FavoritesContext.Provider value={{ ids, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
