"use client";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState({
    adText: "",
    url: "",
    loading: false,
    error: null,
    original: null,
    generated: null,
    verification: null,
  });

  const handleGenerate = async () => {
    try {
      if (!state.adText || !state.url) {
        return setState(prev => ({ ...prev, error: "All fields required" }));
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      // API 1: Analyse Ad
      const adRes = await fetch("/api/analyze-ad", {
        method: "POST",
        body: JSON.stringify({ adText: state.adText })
      });
      const adData = await adRes.json();

      // API 2: Analyse Page
      const pageRes = await fetch("/api/analyze-page", {
        method: "POST",
        body: JSON.stringify({ url: state.url }),
      });
      const pageData = await pageRes.json();

      setState(prev => ({ ...prev, original: pageData }));

      // API 3: Generate
      const genRes = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          adAnalysis: adData,
          pageContent: pageData,
        }),
      });
      const genData = await genRes.json();

      setState(prev => ({ ...prev, generated: genData }));

      // API 4: Verify
      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({
          original: pageData,
          generated: genData,
          adAnalysis: adData,
        }),
      });
      const verifyData = await verifyRes.json();

      setState(prev => ({
        ...prev,
        verification: verifyData,
        loading: false,
      }));

    } catch (err) {
      setState(prev => ({
        ...prev,
        error: "Something went wrong",
        loading: false,
      }));
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">AdSync AI</h1>

      {/* Inputs */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <textarea
          placeholder="Enter ad text..."
          className="w-full p-3 border rounded mb-4"
          value={state.adText}
          onChange={(e) =>
            setState(prev => ({ ...prev, adText: e.target.value }))
          }
        />

        <input
          placeholder="Enter landing page URL..."
          className="w-full p-3 border rounded mb-4"
          value={state.url}
          onChange={(e) =>
            setState(prev => ({ ...prev, url: e.target.value }))
          }
        />

        <button
          onClick={handleGenerate}
          disabled={state.loading}
          className="bg-black text-white px-6 py-2 rounded"
       >
        {state.loading ? "Generating..." : "Generate"}
       </button>

       {state.error && (
        <p className="text-red-500 mt-3">{state.error}</p>
       )}
      </div>

       {/* Results */}
       {state.generated && (
        <div className="grid grid-cols-2 gap-6">
          {/* Original */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold mb-4">Original</h2>
            <p><strong>Headline:</strong> {state.original.headline}</p>
            <p><strong>CTA:</strong> {state.original.cta}</p>
            <p><strong>Paragraph:</strong> {state.original.paragraph}</p>
          </div>

          {/* Generated */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold mb-4">Modified</h2>
            <p><strong>Headline:</strong> {state.generated.headline}</p>
            <p><strong>CTA:</strong> {state.generated.cta}</p>
            <p><strong>Paragraph:</strong> {state.generated.paragraph}</p>
          </div>
        </div>
       )}

       {/* Warning */}
       {state.verification && state.verification.valid === false && (
        <div className="mt-6 p-4 bg-yellow-200 rounded">
          ⚠️ Output may not fully align with ad intent
        </div>
       )}
    </main>
  )
}