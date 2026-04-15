"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Wand2, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export default function Home() {
  const [state, setState] = useState({
    adText: "",
    url: "",
    loading: false,
    error: null,
    original: null,
    generated: null,
    verification: null,
    activeTab: "personalized",
  });

  const handleGenerate = async () => {
    try {
      if (!state.adText || !state.url) {
        return setState(prev => ({ ...prev, error: "All fields required" }));
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      const adRes = await fetch("/api/analyze-ad", {
        method: "POST",
        body: JSON.stringify({ adText: state.adText }),
      });
      const adData = await adRes.json();

      const pageRes = await fetch("/api/analyze-page", {
        method: "POST",
        body: JSON.stringify({ url: state.url }),
      });
      const pageData = await pageRes.json();

      const genRes = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({
          adAnalysis: adData,
          pageContent: pageData,
        }),
      });
      const genData = await genRes.json();

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
        original: pageData,
        generated: genData,
        verification: verifyData,
        loading: false,
        activeTab: "personalized",
      }));

    } catch (err) {
      setState(prev => ({
        ...prev,
        error: "Something went wrong",
        loading: false,
      }));
    }
  };

  const displayData =
    state.activeTab === "original" ? state.original : state.generated;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1a1040 40%, #0d1b3e 70%, #0a0a1a 100%)" }}>

      {/* Background decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(236,72,153,0.06) 0%, transparent 70%)" }} />
      </div>

      {/* Glass Loader Overlay */}
      <AnimatePresence>
        {state.loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backdropFilter: "blur(16px)", background: "rgba(10,10,30,0.55)" }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "24px",
                padding: "48px 56px",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
              }}
            >
              {/* Spinner */}
              <div style={{ position: "relative", width: "64px", height: "64px" }}>
                <div style={{
                  position: "absolute", inset: 0,
                  borderRadius: "50%",
                  border: "3px solid rgba(255,255,255,0.08)",
                }} />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, ease: "linear", repeat: Infinity }}
                  style={{
                    position: "absolute", inset: 0,
                    borderRadius: "50%",
                    border: "3px solid transparent",
                    borderTopColor: "#a78bfa",
                    borderRightColor: "#60a5fa",
                  }}
                />
                <div style={{
                  position: "absolute", inset: "18px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  opacity: 0.8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Sparkles size={14} color="white" />
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <p style={{ color: "white", fontWeight: 600, fontSize: "18px", marginBottom: "6px", letterSpacing: "-0.01em" }}>
                  Analyzing & Personalizing
                </p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>
                  Matching your ad intent to the page...
                </p>
              </div>

              {/* Animated dots */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity }}
                    style={{ width: "7px", height: "7px", borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa, #60a5fa)" }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "20px",
          }}>
            <Sparkles size={13} color="#a78bfa" />
            <span style={{ color: "#a78bfa", fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em" }}>AI-Powered Landing Page Optimizer</span>
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 54px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            background: "linear-gradient(135deg, #ffffff 30%, #a78bfa 60%, #60a5fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "14px",
          }}>
            AdSync AI
          </h1>

          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", maxWidth: "380px", margin: "0 auto", lineHeight: 1.6 }}>
            Personalize any landing page to match your ad's intent — instantly.
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "24px",
            padding: "32px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            marginBottom: "28px",
          }}
        >
          {/* Ad Text */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
              <Wand2 size={12} />
              Ad Copy
            </label>
            <textarea
              placeholder="Paste your ad text here..."
              rows={4}
              value={state.adText}
              onChange={(e) => setState(prev => ({ ...prev, adText: e.target.value }))}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                padding: "14px 16px",
                color: "rgba(255,255,255,0.9)",
                fontSize: "14px",
                lineHeight: 1.6,
                resize: "vertical",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {/* URL */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
              <Globe size={12} />
              Landing Page URL
            </label>
            <input
              placeholder="https://yoursite.com/landing"
              value={state.url}
              onChange={(e) => setState(prev => ({ ...prev, url: e.target.value }))}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                padding: "14px 16px",
                color: "rgba(255,255,255,0.9)",
                fontSize: "14px",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(139,92,246,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>

          {/* Generate Button */}
          <motion.button
            onClick={handleGenerate}
            disabled={state.loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "15px 24px",
              borderRadius: "14px",
              border: "none",
              cursor: state.loading ? "not-allowed" : "pointer",
              background: state.loading
                ? "rgba(255,255,255,0.06)"
                : "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
              color: "white",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: state.loading ? "none" : "0 8px 32px rgba(99,102,241,0.35)",
              transition: "all 0.2s",
            }}
          >
            <Sparkles size={16} />
            {state.loading ? "Analyzing & Optimizing..." : "Generate Personalized Page"}
            {!state.loading && <ArrowRight size={16} />}
          </motion.button>

          {/* Error */}
          <AnimatePresence>
            {state.error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ color: "#f87171", marginTop: "12px", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}
              >
                <AlertTriangle size={14} />
                {state.error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tabs */}
        <AnimatePresence>
          {state.generated && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
            >
              {["original", "personalized"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setState(prev => ({ ...prev, activeTab: tab }))}
                  style={{
                    padding: "9px 22px",
                    borderRadius: "100px",
                    border: state.activeTab === tab ? "none" : "1px solid rgba(255,255,255,0.12)",
                    background: state.activeTab === tab
                      ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                      : "rgba(255,255,255,0.04)",
                    color: state.activeTab === tab ? "white" : "rgba(255,255,255,0.45)",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    boxShadow: state.activeTab === tab ? "0 4px 20px rgba(99,102,241,0.3)" : "none",
                    transition: "all 0.25s",
                    textTransform: "capitalize",
                  }}
                >
                  {tab === "personalized" && state.activeTab === tab && <span style={{ marginRight: "6px" }}>✦</span>}
                  {tab}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Landing Page Preview */}
        <AnimatePresence mode="wait">
          {displayData && (
            <motion.div
              key={state.activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 32px 80px rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Hero gradient header */}
              <div style={{
                background: state.activeTab === "personalized"
                  ? "linear-gradient(135deg, #1e0a4a 0%, #0f2060 50%, #0a1a4a 100%)"
                  : "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
                padding: "56px 48px 48px",
                position: "relative",
                overflow: "hidden",
              }}>
                {state.activeTab === "personalized" && (
                  <>
                    <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
                    <div style={{ position: "absolute", bottom: "-40px", left: "10%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
                  </>
                )}

                <p style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  color: state.activeTab === "personalized" ? "#a78bfa" : "rgba(255,255,255,0.4)",
                  fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  marginBottom: "20px",
                  background: state.activeTab === "personalized" ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${state.activeTab === "personalized" ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "100px", padding: "4px 12px",
                }}>
                  {state.activeTab === "personalized" ? <><Sparkles size={11} /> Personalized Preview</> : "Original Page"}
                </p>

                <h1 style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  marginBottom: "20px",
                  background: state.activeTab === "personalized"
                    ? "linear-gradient(135deg, #ffffff 0%, #c4b5fd 60%, #93c5fd 100%)"
                    : "white",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  maxWidth: "600px",
                }}>
                  {displayData.headline}
                </h1>

                <p style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "16px",
                  lineHeight: 1.75,
                  maxWidth: "520px",
                  marginBottom: "36px",
                }}>
                  {displayData.paragraph}
                </p>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: "14px 32px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    background: state.activeTab === "personalized"
                      ? "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)"
                      : "white",
                    color: state.activeTab === "personalized" ? "white" : "#111827",
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    boxShadow: state.activeTab === "personalized"
                      ? "0 8px 32px rgba(99,102,241,0.5)"
                      : "0 4px 16px rgba(0,0,0,0.2)",
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    transition: "all 0.2s",
                  }}
                >
                  {displayData.cta}
                  <ArrowRight size={15} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verifier Warning */}
        <AnimatePresence>
          {state.verification && state.verification.valid === false && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: "20px",
                padding: "16px 20px",
                borderRadius: "14px",
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.25)",
                display: "flex", alignItems: "center", gap: "10px",
                color: "#fbbf24", fontSize: "14px", fontWeight: 500,
              }}
            >
              <AlertTriangle size={16} />
              Output may not fully align with ad intent
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}