import React, { useRef, useEffect } from "react";
import "../../styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

const Home = () => {
  const [videoData, setVideoData] = React.useState([]);
  const isClicking = useRef(false);


  const videoRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const options = { threshold: [0.6] };
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;
        if (entry.intersectionRatio >= 0.6) {
          // try to play
          video.muted = true;
          const p = video.play();
          if (p && p.catch) p.catch(() => {});
        } else {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    videoRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [videoData]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Fetched videos:", response.data);

        setVideoData(response.data.foodItems);
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, []);

  const onVisitStore = (item) => {
    // placeholder action; replace with actual navigation

    navigate(`/food-partner/${item.FoodPartner}`);
    console.log(item.FoodPartner);
  };

  async function toggleLike(item) {
    if (isClicking.current) return;

    isClicking.current = true;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like",
        { foodId: item._id },
        { withCredentials: true },
      );

      if (response.data.like) {
        console.log("Video liked");
        setVideoData((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v,
          ),
        );
      } else {
        console.log("Video unliked");
        setVideoData((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v,
          ),
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setTimeout(() => {
        isClicking.current = false;
      }, 300);
    }
  }

  const toggleSave = async(item) => {
    const response = await axios.post(
      "http://localhost:3000/api/food/save",
      { foodId: item._id , videoUrl: item.videoUrl },
      { withCredentials: true },
    );
     if (response.data.save) {
        console.log("Video saved");
        setVideoData((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v,
          ),
        );
      } else {
        console.log("Video unsaved");
        setVideoData((prev) =>
          prev.map((v) =>
            v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v,
          ),
        );
      }
  };

  return (
    <div className="reels-container" aria-label="video reels">
      {videoData.map((item, idx) => (
        <div
          key={item._id}
          className="reel"
          ref={(el) => (videoRefs.current[idx] = el)}
        >
          <video
            src={item.videoUrl}
            playsInline
            muted
            loop
            preload="metadata"
            style={{ display: "block" }}
          />

          <div className="reel-overlay">
            <div className="reel-desc">{item.description}</div>
            <div className="reel-actions">
              <button
                className="visit-store-btn"
                onClick={() => onVisitStore(item)}
              >
                Visit Store
              </button>
            </div>
          </div>

          <div className="reel-side-actions">
            <button
              className={"action-btn like " + (item.likeCount > 0 ? "on" : "")}
              onClick={toggleLike ? () => toggleLike(item) : undefined}
              // aria-label={liked.includes(item._id) ? "Unlike" : "Like"}
            >
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="count">
                {item.likeCount > 0 ? item.likeCount : "0"}
              </div>
            </button>

            <button
              className={
                "action-btn save "
              }
              onClick={toggleSave ? () => toggleSave(item) : undefined}
            >
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M6 2h12v18l-6-3-6 3V2z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="count">{item.saveCount > 0 ? item.saveCount : "0"}</div>
            </button>

            <div
              className="action-btn comment"
              role="button"
              tabIndex={0}
              aria-label="Comments"
            >
              <div className="icon">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="count">
                {item.comments ? item.comments.length : 0}
              </div>
            </div>
          </div>
        </div>
      ))}
      <BottomNav />
    </div>
  );
};

export default Home;
