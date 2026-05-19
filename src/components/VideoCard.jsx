import React from 'react'

export default function VideoCard({ video, onOpen }) {
  return (
    <div className="video-card" onClick={onOpen}>
      <div className="thumb">
        <img src={video.poster || 'https://via.placeholder.com/320x180?text=Video'} alt={video.title} />
      </div>
      <div className="meta">
        <div className="title">{video.title}</div>
        <div className="channel">Yutoob Channel</div>
      </div>
    </div>
  )
}
