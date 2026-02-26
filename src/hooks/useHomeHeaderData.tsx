import { useEffect, useState } from "react";
import { getAuthUser, getProfile } from "@/src/services/user.service";

type Gender = "male" | "female";

export function useHomeHeaderData() {
  const [userName, setUserName] = useState("John Doe");
  const [gender, setGender] = useState<Gender>("male");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const user = await getAuthUser();
        if (!user) return;

        const profile = await getProfile();

        if (!alive) return;

        setUserName(profile?.user_name ?? "John Doe");
        setGender((profile?.gender as Gender) ?? "male");
      } catch (e) {
        throw e;
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { userName, gender, loading };
}
