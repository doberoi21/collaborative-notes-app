"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import Editor from "../../components/Editor";

export default function DocumentPage() {
  const params = useParams();
  const id = params.id;

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function fetchDocument() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setDocument(data);
    setLoading(false);
  }

  if (loading) {
    return <div className="p-10">Loading document...</div>;
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold mb-6">{document.title}</h1>

      <Editor documentId={document.id} initialContent={document.content} />
    </main>
  );
}
