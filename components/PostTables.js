'use client'

/**
 * PostTables — View component.
 * Badge colour configs sourced from constants layer.
 */
import { POST_STATUS_CFG, ROLE_COLOR_MAP } from '@/lib/constants'
import styles from './PostTables.module.css'

/** External link icon — shared between tables. */
const ExternalIcon = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

function StatusBadge({ status }) {
  const cfg = POST_STATUS_CFG[status] ?? { color: 'blue', label: status }
  return <span className={`${styles.badge} ${styles[`badge_${cfg.color}`]}`}>{cfg.label}</span>
}

function RoleBadge({ role }) {
  const color = ROLE_COLOR_MAP[role] ?? 'blue'
  return <span className={`${styles.badge} ${styles[`badge_${color}`]}`}>{role}</span>
}

function MiniBar({ fill, pct, variant = 'blue' }) {
  // Ensure pct is always a valid number for CSS width
  const safePct = typeof pct === 'number' ? Math.min(100, Math.max(0, pct)) : 0
  return (
    <div className={styles.engagementWrap}>
      <div className={`${styles.engBar} ${styles[`engBar_${variant}`]}`}>
        <div
          className={`${styles.engFill} ${styles[`engFill_${variant}`]}`}
          style={{ width: `${safePct}%` }}
        />
      </div>
      <span className={styles.engNum}>{fill}</span>
    </div>
  )
}

/**
 * @param {{
 *   supportPosts: import('@/lib/data').SupportPost[],
 *   counterPosts: import('@/lib/data').CounterPost[]
 * }} props
 */
export default function PostTables({ supportPosts, counterPosts }) {
  const supportTotal = supportPosts.reduce((a, p) => a + p.comments, 0)
  const counterTotal = counterPosts.reduce((a, p) => a + p.comments, 0)

  return (
    <div className={styles.wrap}>
      {/* Support Posts */}
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLeft}>
            <span className={`${styles.typeDot} ${styles.dotGreen}`} />
            <span className={styles.sectionTitle}>Support Posts</span>
            <span className={styles.sectionMeta}>โพสต์เชียร์ / reinforcement</span>
          </div>
          <div className={styles.sectionRight}>
            <span className={styles.totalBadge}>{supportPosts.length} posts</span>
            <span className={styles.totalBadge}>{supportTotal.toLocaleString('th-TH')} comments</span>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Post</th>
                <th>Type</th>
                <th>Comments</th>
                <th>Engagement</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {supportPosts.map((p, i) => (
                <tr key={i}>
                  <td>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {p.name} {ExternalIcon}
                    </a>
                  </td>
                  <td><span className={styles.typeTag}>{p.type}</span></td>
                  <td className={styles.mono}>{p.comments.toLocaleString('th-TH')}</td>
                  <td>
                    {/* Engagement is out of 5; convert to % for the bar */}
                    <MiniBar fill={p.engagement} pct={(p.engagement / 5) * 100} variant="blue" />
                  </td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Posts */}
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLeft}>
            <span className={`${styles.typeDot} ${styles.dotRed}`} />
            <span className={styles.sectionTitle}>Response Posts</span>
            <span className={styles.sectionMeta}>โพสต์ตอบโต้ / containment</span>
          </div>
          <div className={styles.sectionRight}>
            <span className={styles.totalBadge}>{counterPosts.length} posts</span>
            <span className={styles.totalBadge}>{counterTotal.toLocaleString('th-TH')} comments</span>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Post</th>
                <th>Type</th>
                <th>Comments</th>
                <th>Effectiveness</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {counterPosts.map((p, i) => (
                <tr key={i}>
                  <td>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {p.name} {ExternalIcon}
                    </a>
                  </td>
                  <td><span className={styles.typeTag}>{p.type}</span></td>
                  <td className={styles.mono}>{p.comments.toLocaleString('th-TH')}</td>
                  <td>
                    {/* effectiveness is already 0–100 */}
                    <MiniBar fill={`${p.effectiveness}%`} pct={p.effectiveness} variant="green" />
                  </td>
                  <td><RoleBadge role={p.role} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
