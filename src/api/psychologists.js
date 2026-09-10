import { ref, query, orderByChild, limitToFirst, limitToLast, get } from "firebase/database";
import { database } from "../firebase";

const SORTS = {
  "name-asc": { field: "name", reverse: false },
  "name-desc": { field: "name", reverse: true },
  "price-asc": { field: "price_per_hour", reverse: false },
  "price-desc": { field: "price_per_hour", reverse: true },
  "rating-desc": { field: "rating", reverse: true },
};

export const SORT_OPTIONS = [
  { value: "name-asc", label: "A to Z" },
  { value: "name-desc", label: "Z to A" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating-desc", label: "Popular" },
];

export async function fetchPsychologists(sortKey, limit) {
  const { field, reverse } = SORTS[sortKey] ?? SORTS["name-asc"];
  const q = query(
    ref(database, "psychologists"),
    orderByChild(field),
    reverse ? limitToLast(limit) : limitToFirst(limit)
  );

  const snap = await get(q);
  if (!snap.exists()) return [];

  const rows = [];
  snap.forEach((child) => {
    rows.push({ id: child.key, ...child.val() });
  });

  return reverse ? rows.reverse() : rows;
}

export async function fetchPsychologistsByIds(ids) {
  const snaps = await Promise.all(
    ids.map((id) => get(ref(database, `psychologists/${id}`)))
  );
  return snaps
    .filter((snap) => snap.exists())
    .map((snap) => ({ id: snap.key, ...snap.val() }));
}
