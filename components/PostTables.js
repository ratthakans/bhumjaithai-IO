'use client'

import styles from './PostTables.module.css'

const STATUS_CFG = {
  Completed: { color: 'green', label: 'Completed' },
  Active: { color: 'amber', label: 'Active' },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { color: 'blue', label: status }
  return <span className={`${styles.badge} ${styles['badge_' + cfg.color]}`}>{cfg.label}</span>
}

function RoleBadge({ role }) {
  const colorMap = {
    'Direct Response': 'red',
    'Soft Counter': 'amber',
    'Fact Challenge': 'blue',
    'Emotional Neutralize': 'violet',
    'Containment': 'teal',
  }
  const color = colorMap[role] || 'blue'
  return <span className={`${styles.badge} ${styles['badge_' + color]}`}>{role}</span>
}

export default function PostTables({ supportPosts, counterPosts }) {
  const supportTotal = supportPosts.reduce((a, p) => a + p.comments, 0)
  const counterTotal = counterPosts.reduce((a, p) => a + p.comments, 0)

  return (
    <div className={styles.wrap}>
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
                    <a href={p.url} target="_blank" rel="noopener" className={styles.link}>
                      {p.name}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </td>
                  <td><span className={styles.typeTag}>{p.type}</span></td>
                  <td className={styles.mono}>{p.comments.toLocaleString('th-TH')}</td>
                  <td>
                    <div className={styles.engagementWrap}>
                      <div className={styles.engBar}>
                        <div className={styles.engFill} style={{ width: `${(p.engagement / 5) * 100}%` }} />
                      </div>
                      <span className={styles.engNum}>{p.engagement}</span>
                    </div>
                  </td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
                    <a href={p.url} target="_blank" rel="noopener" className={styles.link}>
                      {p.name}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  </td>
                  <td><span className={styles.typeTag}>{p.type}</span></td>
                  <td className={styles.mono}>{p.comments.toLocaleString('th-TH')}</td>
                  <td>
                    <div className={styles.engagementWrap}>
                      <div className={`${styles.engBar} ${styles.engBarGreen}`}>
                        <div className={`${styles.engFill} ${styles.engFillGreen}`} style={{ width: `${p.effectiveness}%` }} />
                      </div>
                      <span className={styles.engNum}>{p.effectiveness}%</span>
                    </div>
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
