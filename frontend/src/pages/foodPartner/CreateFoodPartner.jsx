import React, { useState, useRef, useEffect } from "react";
import "../../styles/CreateFoodPartner.css";
import axios from "axios";

const CreateFoodPartner = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cfp-dark");
    if (saved !== null) setDarkMode(saved === "1");
    else {
      // default to user's color-scheme preference
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cfp-dark", darkMode ? "1" : "0");
  }, [darkMode]);

  useEffect(() => {
    if (!videoFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      setVideoFile(null);
      setPreviewUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // upload form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (videoFile) formData.append("video", videoFile);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food",
        formData,
        {
          withCredentials: true,
        },
      );
      console.log("response:", response);

      // reset form only on success
      setName("");
      setDescription("");
      setVideoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`cfp-wrapper ${darkMode ? "cfp-dark" : ""}`}>
      <div className="cfp-card">
        {loading && (
          <div className="cfp-overlay" role="status" aria-live="polite">
            <div className="cfp-spinner" aria-hidden></div>
            <div className="cfp-overlay-text">Uploading video…</div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="cfp-title">Add New Food Item</h2>
          <button
            type="button"
            aria-pressed={darkMode}
            className={`cfp-toggle ${darkMode ? "on" : ""}`}
            onClick={() => setDarkMode((d) => !d)}
            title="Toggle dark theme"
          >
            {darkMode ? (
              <span aria-hidden>🌙</span>
            ) : (
              <span aria-hidden>☀️</span>
            )}
          </button>
        </div>

        <div className="cfp-grid">
          <form className="cfp-form" onSubmit={handleSubmit}>
            <label className="cfp-label">
              Name
              <input
                className="cfp-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Butter Panner"
                required
                disabled={loading}
              />
            </label>

            <label className="cfp-label">
              Description
              <textarea
                className="cfp-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short, tasty description..."
                rows={4}
                disabled={loading}
              />
            </label>

            <label className="cfp-label">
              Video
              <input
                ref={fileInputRef}
                className="cfp-file"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={loading}
              />
            </label>

            <div className="cfp-actions">
              <button
                className="cfp-btn primary"
                type="submit"
                disabled={!name || !videoFile || loading}
              >
                {loading ? "Uploading…" : "Create"}
              </button>
              <button
                type="button"
                className="cfp-btn ghost"
                onClick={() => {
                  setName("");
                  setDescription("");
                  setVideoFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = null;
                }}
                disabled={loading}
              >
                Reset
              </button>
            </div>
          </form>

          <div className="cfp-preview">
            <div className="cfp-preview-inner">
              {previewUrl ? (
                <video className="cfp-video" controls src={previewUrl} />
              ) : (
                <div className="cfp-placeholder">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 22V2L21 12L3 22Z" fill="currentColor" />
                  </svg>
                  <p className="cfp-placeholder-text">
                    Video preview will appear here
                  </p>
                </div>
              )}
            </div>
            <div className="cfp-hint">
              Tip: Use short clips (5–15s) for best results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFoodPartner;
