"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { socket } from "../../lib/socket";

export default function Editor({ initialContent, documentId }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    socket.emit("join-document", documentId);

    socket.on("receive-changes", (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, []);

  function handleChange(e) {
    const newContent = e.target.value;

    setContent(newContent);

    socket.emit("send-changes", {
      documentId,
      content: newContent,
    });
  }

  async function saveDocument() {
    setSaving(true);

    const { error } = await supabase
      .from("documents")
      .update({ content })
      .eq("id", documentId);

    if (error) {
      console.error("Save failed:", error);
    }

    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-[400px] border rounded-lg p-4"
      />

      <button
        onClick={saveDocument}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
