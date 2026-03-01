'use client'

/**
 * Topbar — View component.
 * Receives pre-computed metrics from the Controller (page.js).
 * Only handles live clock as client-side state (genuinely needs useState/useEffect).
 */
import { useState, useEffect } from 'react'
import { LOGO_URL } from '@/lib/constants'
import { riskColor } from '@/lib/models'
import styles from './Topbar.module.css'

/** Formats current time for Thai locale — used in setInterval. */
function formatThaiTime() {
  return new Date().toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })
}

/**
 * @param {{ data: import('@/lib/data').CampaignData, metrics: import('@/lib/models').CampaignMetrics }} props
 */
export default function Topbar({ data, metrics }) {
  const [time, setTime] = useState(formatThaiTime)
  const [pulsed, setPulsed] = useState(false)

  // Single interval that drives both clock and pulse
  useEffect(() => {
    const tick = setInterval(() => {
      setTime(formatThaiTime())
      setPulsed((p) => !p)
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  const riskPillStyle = `${styles.pill} ${styles[`pill_${riskColor(data.riskLevel)}`]}`

  return (
    <header className={styles.topbar}>
      {/* Left: Brand */}
      <div className={styles.brand}>
        <div className={styles.logoWrap}>
          {/* Using <img> instead of next/image to bypass domain config for external URL */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_URL} alt="พรรคภูมิใจไทย" className={styles.logo} />
        </div>
        <div className={styles.divider} />
        <div className={styles.brandInfo}>
          <div className={styles.systemTag}>
            <span className={styles.systemDot} />
            IO CONTROL TOWER
          </div>
          <h1 className={styles.title}>Engagement Monitoring Dashboard</h1>
          <p className={styles.sub}>
            {data.mission.province} • {data.mission.districts} เขต • Campaign{' '}
            <code className={styles.code}>{data.campaignId}</code>
          </p>
        </div>
      </div>

      {/* Right: Status Pills */}
      <div className={styles.meta}>
        <div className={styles.pill}>
          <span className={styles.pillLabel}>Report Time</span>
          <span className={styles.pillValue}>{time}</span>
        </div>

        <div className={`${styles.pill} ${styles.pill_green}`}>
          <span className={styles.pillLabel}>Health</span>
          <span className={styles.pillValue}>
            <span className={`${styles.dot} ${pulsed ? styles.dotPulsed : ''}`} />
            {data.health}
          </span>
        </div>

        <div className={styles.pill}>
          <span className={styles.pillLabel}>Progress</span>
          <span className={styles.pillValue}>{metrics.completionRate.toFixed(1)}%</span>
        </div>

        <div className={styles.pill}>
          <span className={styles.pillLabel}>Posts</span>
          <span className={styles.pillValue}>{metrics.totalPosts}</span>
        </div>

        <div className={riskPillStyle}>
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
