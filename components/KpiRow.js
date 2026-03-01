'use client'

import styles from './KpiRow.module.css'

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

export default function KpiRow({ data }) {
  const { budget, allocation } = data
  const used = budget.used
  const target = budget.target
  const remain = Math.max(0, target - used)
  const rate = (used / target) * 100

  const fmt = (n) => n.toLocaleString('th-TH')

  return (
    <div className={styles.row}>
      <KpiCard
        label="Comment Target"
        value={fmt(target)}
        hint="กำหนดจาก scope งาน"
        color="blue"
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
      />
      <KpiCard
        label="Deployed"
        value={fmt(used)}
        hint="รวมทุกโพสต์"
        color="green"
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
      />
      <KpiCard
        label="Completion"
        value={rate.toFixed(1) + '%'}
        hint="Used ÷ Target"
        color={rate >= 90 ? 'green' : rate >= 70 ? 'amber' : 'blue'}
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
      />
      <KpiCard
        label="Remaining"
        value={fmt(remain)}
        hint="สำหรับ phase ปิดงาน"
        color="violet"
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
      />
      <KpiCard
        label="Active Teams"
        value={data.mission.activeTeams}
        hint={`sync: ${data.mission.lastSync}`}
        color="teal"
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
      />
      <KpiCard
        label="Health Score"
        value={`${data.healthScore}%`}
        hint={data.tone}
        color="green"
        icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
      />
    </div>
  )
}
