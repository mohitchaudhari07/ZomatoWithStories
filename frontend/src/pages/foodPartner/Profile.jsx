import React, { useState, useEffect } from "react";
import "../../styles/Profile.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VideoModal from "./VideoModal";

const Profile = () => {
  const { id } = useParams();
  // console.log(id);
  const [profileData, setProfileData] = useState(null);
  // const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  const [activeVideo, setActiveVideo] = useState(null);
  console.log("videos:", videos);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          {
            withCredentials: true,
          },
        );
        setProfileData(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [id]);


  

  return (
    <div className="pp-container">
      <div className="pp-card">
        <div className="pp-card-top">
          <div className="pp-avatar" >
            <img className="pp-avatar" src="https://res.cloudinary.com/dqgfgmkkc/image/upload/v1770036629/djwbzux7izf09kvrl3xp.jpg" alt="" />
            </div>
          <div className="pp-pills">
            <div className="pp-pill">
              {profileData?.fullName || "Business Name"}
            </div>
            <div className="pp-pill">{profileData?.address || "Address"}</div>
          </div>
        </div>

        <div className="pp-stats">
          <div className="pp-stat">
            <div className="pp-stat-label"> total meals</div>
            <div className="pp-stat-value">43</div>
          </div>
          <div className="pp-stat">
            <div className="pp-stat-label">customer serve</div>
            <div className="pp-stat-value">15K</div>
          </div>
        </div>
      </div>

      <div className="pp-grid">
        {/* {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="pp-tile">
            video
          </div> */}
        {/* ))} */}
        {videos.map((video) => (
          <div key={video._id} className="pp-tile">
            <video onClick={() => setActiveVideo(video.videoUrl)} className="pp-video" >
              <source  src={video.videoUrl} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

       {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
};

export default Profile;
