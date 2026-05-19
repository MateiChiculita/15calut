import React, { useState } from 'react'
import VideoCard from './components/VideoCard'

const sampleVideos = [
  {
    id: 1,
    title: 'Big Buck Bunny',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217'
  },
  {
    id: 2,
    title: 'Elephants Dream',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/ElephantsDream.png/640px-ElephantsDream.png'
  },
  {
    id: 3,
    title: 'For Bigger Blazes',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: ''
  }
]

export default function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">Yutoob</div>
        <input className="search" placeholder="Search" />
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="side-item active">Home</div>
          <div className="side-item">Trending</div>
          <div className="side-item">Subscriptions</div>
        </aside>

        <main className="main">
          <h2>Recommended</h2>
          <div className="grid">
            {sampleVideos.map(v => (
              <VideoCard key={v.id} video={v} onOpen={() => setSelected(v)} />
            ))}
          </div>
        </main>
      </div>

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="player" onClick={e => e.stopPropagation()}>
            <video controls autoPlay src={selected.src} poster={selected.poster} />
            <div className="player-title">{selected.title}</div>
          </div>
        </div>
      )}
    </div>
  )
}
