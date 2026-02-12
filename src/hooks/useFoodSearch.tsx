import { useEffect, useRef, useState } from "react";
import { searchFoods } from "@/src/services/foodSearch";

type Status = "idle" | "loading" | "success" | "empty" | "error";

export function useFoodSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setStatus("idle");
      setResult([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setStatus("loading");

      try {
        const res = await searchFoods(query);
        setStatus(res.status as Status);
        setResult(res.data);
      } catch {
        setStatus("error");
        setResult([]);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return { query, setQuery, result, status };
}