import React from "react";
import { useEffect } from "react";
import "../../styles/Saved.css";
import BottomNav from "../../components/BottomNav";
import axios from "axios";
import VideoModal from "../foodPartner/VideoModal";

const Saved = () => {
  const [saved, setSaved] = React.useState([]);
  const [activeVideo, setActiveVideo] = React.useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/saved", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Fetched videos:", response.data);

        setSaved(response.data.savedItems);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, []);

  const remove = (id) => {
    axios
      .post(
        "http://localhost:3000/api/food/remove-save",
        { foodId: id },
        { withCredentials: true },
      )
      .then((response) => {
        if (response.data.success) {
          setSaved((prev) => prev.filter((it) => it._id !== id));
        }
      })
      .catch((error) => {
        console.error("Error unsaving item:", error);
      });

    //refresh the page after 500ms to allow the backend to process the request
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  if (!saved || saved.length === 0) {
    return (
      <div className="saved-page">
        <div className="saved-empty">No saved items yet.</div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="saved-page">
      <div className="saved-list">
        {saved.map((it) => (
          <div className="saved-card" key={it._id}>
            <div className="thumb">
              {it.videoUrl ? (
                <video
                  onClick={() => setActiveVideo(it.videoUrl)}
                  src={it.videoUrl}
                  muted
                  preload="metadata"
                />
              ) : (
                <div className="placeholder">No preview</div>
              )}
            </div>
            <div className="meta">
              {/* <div className="desc">{it.description}</div> */}
              <button className="unsave" onClick={() => remove(it.food)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        {activeVideo && (
          <VideoModal
            video={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Saved;
