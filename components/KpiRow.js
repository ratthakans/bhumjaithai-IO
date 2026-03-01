'use client'

/**
 * KpiRow — View component.
 * Receives pre-computed metrics; no inline business logic.
 */
import { fmtTH } from '@/lib/models'
import styles from './KpiRow.module.css'

/** Inline SVG icons — kept as functions to avoid repeating strokeWidth etc. */
const Icons = {
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  checkFull: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  monitor: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  team: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  pulse: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
}

/**
 * @param {{ label: string, value: string|number, hint?: string, color?: string, icon: React.ReactNode }} props
 */
function KpiCard({ label, value, hint, color = 'blue', icon }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.iconWrap}>{icon}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
  )
}

/**
 * @param {{ metrics: import('@/lib/models').CampaignMetrics, data: import('@/lib/data').CampaignData }} props
 */
export default function KpiRow({ metrics, data }) {
  const { used, target, remaining, completionRate } = metrics

  const completionColor = completionRate >= 90 ? 'green' : completionRate >= 70 ? 'amber' : 'blue'

  return (
    <div className={styles.row}>
      <KpiCard label="Comment Target" value={fmtTH(target)} hint="กำหนดจาก scope งาน" color="blue" icon={Icons.clock} />
      <KpiCard label="Deployed" value={fmtTH(used)} hint="รวมทุกโพสต์" color="green" icon={Icons.check} />
      <KpiCard label="Completion" value={`${completionRate.toFixed(1)}%`} hint="Used ÷ Target" color={completionColor} icon={Icons.checkFull} />
      <KpiCard label="Remaining" value={fmtTH(remaining)} hint="สำหรับ phase ปิดงาน" color="violet" icon={Icons.monitor} />
      <KpiCard label="Active Teams" value={data.mission.activeTeams} hint={`sync: ${data.mission.lastSync}`} color="teal" icon={Icons.team} />
      <KpiCard label="Health Score" value={`${data.healthScore}%`} hint={data.tone} color="green" icon={Icons.pulse} />
    </div>
  )
}
