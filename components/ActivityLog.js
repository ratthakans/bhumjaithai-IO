'use client'

/**
 * ActivityLog — View component.
 * Icon/colour config sourced from constants layer.
 */
import { ACTIVITY_TYPE_CFG } from '@/lib/constants'
import styles from './ActivityLog.module.css'

/** @param {{ log: import('@/lib/data').ActivityEntry[], mission: import('@/lib/data').Mission }} props */
export default function ActivityLog({ log, mission }) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <div className={styles.sectionTag}>ACTIVITY LOG</div>
          <h2 className={styles.title}>Operations Timeline</h2>
        </div>
        <div className={styles.missionBar}>
          <div className={styles.missionItem}>
            <span className={styles.missionLabel}>Start</span>
            <span className={styles.missionVal}>{mission.startDate}</span>
          </div>
          <div className={styles.missionDivider} />
          <div className={styles.missionItem}>
            <span className={styles.missionLabel}>End</span>
            <span className={styles.missionVal}>{mission.endDate}</span>
          </div>
          <div className={styles.missionDivider} />
          <div className={styles.missionItem}>
            <span className={styles.missionLabel}>Last Sync</span>
            <span className={styles.missionVal}>{mission.lastSync}</span>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        {log.map((entry, i) => {
          const cfg = ACTIVITY_TYPE_CFG[entry.type] ?? ACTIVITY_TYPE_CFG.system
          const isLast = i === log.length - 1

          return (
            <div key={`${entry.time}-${i}`} className={styles.entry}>
              <div className={styles.entryLeft}>
                <div className={`${styles.entryIcon} ${styles[`icon_${cfg.color}`]}`}>
                  {cfg.icon}
                </div>
                {!isLast && <div className={styles.connector} />}
              </div>
              <div className={styles.entryRight}>
                <div className={styles.entryTop}>
                  <span className={`${styles.typeBadge} ${styles[`badge_${cfg.color}`]}`}>
                    {cfg.label}
                  </span>
                  <span className={styles.entryTime}>{entry.time}</span>
                  <span className={styles.entryUser}>{entry.user}</span>
                </div>
                <p className={styles.entryAction}>{entry.action}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
