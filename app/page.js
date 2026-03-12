"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Home() {
  const router = useRouter();

  async function createDoc() {
    const { data, error } = await supabase
      .from("documents")
      .insert([{ title: "Untitled Document", content: "" }])
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    router.push(`/doc/${data.id}`);
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        onClick={createDoc}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Create New Document
      </button>
    </main>
  );
}
