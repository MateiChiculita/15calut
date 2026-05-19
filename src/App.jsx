import React, { useEffect, useState } from 'react'
import VideoCard from './components/VideoCard'
import { recommend } from './utils/recommender'

const sampleVideos = [
  { id: 1, title: 'Big Buck Bunny', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217' },
  { id: 2, title: 'Elephants Dream', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/ElephantsDream.png/640px-ElephantsDream.png' },
  { id: 3, title: 'For Bigger Blazes', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', poster: '' },
  { id: 4, title: 'Sintel Trailer', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', poster: 'https://durian.blender.org/wp-content/uploads/2010/05/sintel_post.jpg' },
  { id: 5, title: 'Tears of Steel', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', poster: '' },
  { id: 6, title: 'For Bigger Escape', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', poster: '' },
  { id: 7, title: 'Subaru Outback', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', poster: '' },
  { id: 8, title: 'Volkswagen GTI Review', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4', poster: '' }
]

const STORAGE_KEY = 'yutoob_stats'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [playStart, setPlayStart] = useState(null)
  const [stats, setStats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    } catch (e) {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  }, [stats])

  function saveStats(newStats) {
    setStats(newStats)
  }

  function handlePlay(id) {
    setPlayStart({ id, ts: Date.now() })
  }

  function handlePause() {
    if (!playStart) return
    const delta = Math.floor((Date.now() - playStart.ts) / 1000)
    const id = playStart.id
    const s = { ...stats }
    s[id] = s[id] || { watchTime: 0, liked: false }
    s[id].watchTime = (s[id].watchTime || 0) + delta
    saveStats(s)
    setPlayStart(null)
  }

  function toggleLike(id) {
    const s = { ...stats }
    s[id] = s[id] || { watchTime: 0, liked: false }
    s[id].liked = !s[id].liked
    saveStats(s)
  }

  function closeModal() {
    handlePause()
    setSelected(null)
  }

  const recommended = recommend(sampleVideos, stats)

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
            {recommended.map(v => (
              <VideoCard key={v.id} video={v} onOpen={() => setSelected(v)} stats={stats[v.id] || {}} onToggleLike={() => toggleLike(v.id)} />
            ))}
          </div>
        </main>
      </div>

      {selected && (
        <div className="modal" onClick={closeModal}>
          <div className="player" onClick={e => e.stopPropagation()}>
            <video controls autoPlay src={selected.src} poster={selected.poster} onPlay={() => handlePlay(selected.id)} onPause={handlePause} onEnded={handlePause} />
            <div className="player-title">{selected.title}</div>
            <div style={{padding:'0 12px 12px'}}>
              <button onClick={() => toggleLike(selected.id)}>{(stats[selected.id] && stats[selected.id].liked) ? 'Unlike' : 'Like'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
