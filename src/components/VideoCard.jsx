import React from 'react'

export default function VideoCard({ video, onOpen, stats = {}, onToggleLike }) {
  const poster = video.poster || 'https://via.placeholder.com/320x180?text=Video'
  const watched = Math.floor((stats.watchTime || 0) / 60)

  return (
    <div className="video-card" onClick={onOpen}>
      <div className="thumb">
        <img src={poster} alt={video.title} />
        <button className="like-btn" onClick={e => { e.stopPropagation(); onToggleLike && onToggleLike() }}>
          {stats.liked ? '♥' : '♡'}
        </button>
      </div>
      <div className="meta">
        <div className="title">{video.title}</div>
        <div className="channel">Yutoob Channel • {watched} min</div>
      </div>
    </div>
  )
}

