'use client'

import styles from './ThreatPanel.module.css'

const PRIORITY_CONFIG = {
  High: { color: 'red', label: 'สูง', icon: '🔴' },
  Medium: { color: 'amber', label: 'กลาง', icon: '🟡' },
  Low: { color: 'green', label: 'ต่ำ', icon: '🟢' },
}

const STATUS_CONFIG = {
  Monitoring: { color: 'blue', label: 'กำลังติดตาม' },
  Contained: { color: 'green', label: 'ควบคุมได้' },
  Watching: { color: 'violet', label: 'เฝ้าระวัง' },
  Responding: { color: 'amber', label: 'กำลังตอบโต้' },
}

export default function ThreatPanel({ threats }) {
  const high = threats.filter(t => t.priority === 'High').length
  const active = threats.filter(t => t.status === 'Responding' || t.status === 'Monitoring').length

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <div className={styles.sectionTag}>THREAT INTELLIGENCE</div>
          <h2 className={styles.title}>Narrative Threats</h2>
        </div>
        <div className={styles.summary}>
          <div className={`${styles.summaryItem} ${styles.red}`}>
            <span className={styles.summaryNum}>{high}</span>
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
        {threats.map((threat) => {
          const pCfg = PRIORITY_CONFIG[threat.priority]
          const sCfg = STATUS_CONFIG[threat.status]
          return (
            <div key={threat.id} className={`${styles.item} ${styles['border_' + pCfg.color]}`}>
              <div className={styles.itemTop}>
                <div className={styles.itemLeft}>
                  <span className={`${styles.priorityBadge} ${styles[pCfg.color]}`}>
                    {pCfg.icon} {threat.priority}
                  </span>
                  <span className={styles.threatType}>{threat.type}</span>
                </div>
                <div className={styles.itemRight}>
                  <span className={`${styles.statusBadge} ${styles['status_' + sCfg.color]}`}>
                    {sCfg.label}
                  </span>
                  <span className={styles.time}>{threat.time}</span>
                </div>
              </div>
              <p className={styles.message}>{threat.message}</p>
              <div className={styles.platform}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                {threat.platform}
                <span className={styles.threatId}>{threat.id}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
