import { useRouter } from "expo-router";
import { useEffect } from "react";
import { supabase } from "@/src/lib/supabase"; 
import { useSession } from "@/src/hooks/useSession"; 

export default function Index() {
  const { session, loading } = useSession();

  const router = useRouter();

  useEffect(() => {

    if(loading) return;

    if(!session?.user) {
      router.replace("/info");
      return;
    }

    const checkProfile = async () => {
      const {data, error} = await supabase.from("profiles").select("has_completed_setup").eq("id", session.user.id).single();

      const completed = !error && data?.has_completed_setup === true;

      if(!completed) {
        router.replace("/(setup-screens)/name");
      } else {
        router.replace("/(main-screens)/home");
      }
    };


    checkProfile();

  }, [loading, router, session?.user]);

  return null;

}
