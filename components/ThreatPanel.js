'use client'

/**
 * ThreatPanel — View component.
 * Config-driven: threat colours/labels come from constants, not inline logic.
 */
import { THREAT_STATUS_CFG, THREAT_PRIORITY_CFG } from '@/lib/constants'
import styles from './ThreatPanel.module.css'

function PriorityBadge({ priority }) {
  const cfg = THREAT_PRIORITY_CFG[priority] ?? { color: 'gray', label: priority }
  return (
    <span className={`${styles.badge} ${styles[`badge_${cfg.color}`]}`}>
      {cfg.label}
    </span>
  )
}

function StatusBadge({ status }) {
  const cfg = THREAT_STATUS_CFG[status] ?? { color: 'gray', label: status }
  return (
    <span className={`${styles.statusBadge} ${styles[`status_${cfg.color}`]}`}>
      {cfg.label}
    </span>
  )
}

/** @param {{ threats: import('@/lib/data').Threat[] }} props */
export default function ThreatPanel({ threats }) {
  const critical = threats.filter((t) => t.priority === 'High').length
  const active = threats.filter((t) => t.status === 'Monitoring' || t.status === 'Responding').length

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <div className={styles.sectionTag}>THREAT INTELLIGENCE</div>
          <h2 className={styles.title}>Narrative Threats</h2>
        </div>
        <div className={styles.summary}>
          <div className={`${styles.summaryItem} ${styles.red}`}>
            <span className={styles.summaryNum}>{critical}</span>
            <span className={styles.summaryLabel}>Critical</span>
          </div>
          <div className={`${styles.summaryItem} ${styles.amber}`}>
            <span className={styles.summaryNum}>{active}</span>
            <span className={styles.summaryLabel}>Active</span>
          </div>
          <div className={`${styles.summaryItem} ${styles.blue}`}>
            <span className={styles.summaryNum}>{threats.length}</span>
            <span className={styles.summaryLabel}>Total</span>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {threats.map((t) => {
          const priorityCfg = THREAT_PRIORITY_CFG[t.priority] ?? { color: 'gray' }
          return (
            <div
              key={t.id}
              className={`${styles.threatItem} ${styles[`border_${priorityCfg.color}`]}`}
            >
              <div className={styles.threatTop}>
                <PriorityBadge priority={t.priority} />
                <span className={styles.threatType}>{t.type}</span>
                <StatusBadge status={t.status} />
                <span className={styles.threatTime}>{t.time}</span>
              </div>
              <p className={styles.threatMsg}>{t.message}</p>
              <div className={styles.threatMeta}>
                <span className={styles.platformTag}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  {t.platform}
                </span>
                <span className={styles.threatId}>{t.id}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
