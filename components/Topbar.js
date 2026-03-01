'use client'

import { useState, useEffect } from 'react'
import styles from './Topbar.module.css'

export default function Topbar({ data }) {
  const [time, setTime] = useState('')
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' }))
    update()
    const iv = setInterval(update, 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const iv = setInterval(() => setPulse(p => !p), 2000)
    return () => clearInterval(iv)
  }, [])

  const used = data.budget.used
  const target = data.budget.target
  const totalPosts = data.supportPosts.length + data.counterPosts.length

  return (
    <header className={styles.topbar}>
      {/* Left: Brand */}
      <div className={styles.brand}>
        <div className={styles.logoWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://admin.bhumjaithai.com/wp-content/uploads/2025/04/bjt_logo_h.png"
            alt="พรรคภูมิใจไทย"
            className={styles.logo}
          />
        </div>
        <div className={styles.divider} />
        <div className={styles.brandInfo}>
          <div className={styles.systemTag}>
            <span className={styles.systemDot} />
            IO CONTROL TOWER
          </div>
          <h1 className={styles.title}>Engagement Monitoring Dashboard</h1>
          <p className={styles.sub}>
            {data.mission.province} • {data.mission.districts} เขต • Campaign <code className={styles.code}>{data.campaignId}</code>
          </p>
        </div>
      </div>

      {/* Right: Status Pills */}
      <div className={styles.meta}>
        <div className={styles.pill}>
          <span className={styles.pillLabel}>Report Time</span>
          <span className={styles.pillValue}>{time || '—'}</span>
        </div>
        <div className={`${styles.pill} ${styles.pillGreen}`}>
          <span className={styles.pillLabel}>Health</span>
          <span className={styles.pillValue}>
            <span className={`${styles.dot} ${styles.dotGreen} ${pulse ? styles.pulse : ''}`} />
            {data.health}
          </span>
        </div>
        <div className={styles.pill}>
          <span className={styles.pillLabel}>Progress</span>
          <span className={styles.pillValue}>{((used / target) * 100).toFixed(1)}%</span>
        </div>
        <div className={styles.pill}>
          <span className={styles.pillLabel}>Posts</span>
          <span className={styles.pillValue}>{totalPosts}</span>
        </div>
        <div className={`${styles.pill} ${data.riskLevel === 1 ? styles.pillGreen : data.riskLevel === 2 ? styles.pillAmber : styles.pillRed}`}>
          <span className={styles.pillLabel}>Risk</span>
          <span className={styles.pillValue}>{data.risk}</span>
        </div>
        <div className={styles.pill}>
          <span className={styles.pillLabel}>Teams Active</span>
          <span className={styles.pillValue}>{data.mission.activeTeams}</span>
        </div>
      </div>
    </header>
  )
}
