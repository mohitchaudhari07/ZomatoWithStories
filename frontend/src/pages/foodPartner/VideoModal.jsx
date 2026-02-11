function VideoModal({ video, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <video src={video} controls autoPlay />
      </div>
    </div>
  );
}
export default VideoModal;