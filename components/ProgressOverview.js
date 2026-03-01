'use client'

import styles from './ProgressOverview.module.css'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

export default function ProgressOverview({ data }) {
  const { budget, allocation, tone, risk } = data
  const used = budget.used
  const target = budget.target
  const remain = Math.max(0, target - used)
  const rate = (used / target) * 100
  const fmt = (n) => n.toLocaleString('th-TH')

  // Normalize allocation
  const s = allocation.supportUsed
  const c = allocation.counterUsed
  const sum = s + c
  const sPct = sum > 0 ? ((s / sum) * 100).toFixed(1) : '—'
  const cPct = sum > 0 ? ((c / sum) * 100).toFixed(1) : '—'

  const pieData = [
    { name: 'Used', value: used, color: '#1a56e0' },
    { name: 'Remaining', value: remain, color: '#e8eaf2' },
  ]

  const allocationPieData = [
    { name: 'Support', value: s, color: '#059669' },
    { name: 'Response', value: c, color: '#dc2626' },
  ]

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <div className={styles.sectionTag}>DEPLOYMENT OVERVIEW</div>
          <h2 className={styles.title}>Campaign Progress</h2>
        </div>
        <div className={styles.statusPills}>
          <div className={styles.pill}>
            <span className={styles.pillLabel}>Narrative Tone</span>
            <span className={`${styles.pillVal} ${styles.blue}`}>{tone}</span>
          </div>
          <div className={styles.pill}>
            <span className={styles.pillLabel}>Risk</span>
            <span className={`${styles.pillVal} ${styles.green}`}>{risk}</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressTop}>
            <span className={styles.progressLabel}>Completion Rate</span>
            <span className={styles.progressPct}>{rate.toFixed(1)}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${Math.min(100, rate)}%` }} />
          </div>
          <div className={styles.progressStats}>
            <span>Deployed: <strong>{fmt(used)}</strong></span>
            <span>Target: <strong>{fmt(target)}</strong></span>
            <span>Remaining: <strong>{fmt(remain)}</strong></span>
          </div>
        </div>

        {/* Charts Row */}
        <div className={styles.chartsRow}>
          {/* Donut - Used vs Remaining */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Budget Usage</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={60} startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  formatter={(v) => [v.toLocaleString('th-TH'), '']}
                  contentStyle={{ background: '#fff', border: '1px solid #dde1f0', borderRadius: 10, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.chartCenter}>
              <span className={styles.chartBig}>{rate.toFixed(0)}%</span>
              <span className={styles.chartSub}>used</span>
            </div>
            <div className={styles.chartLegend}>
              {pieData.map((d) => (
                <span key={d.name} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: d.color }} />
                  {d.name}
                </span>
              ))}
            </div>
          </div>

          {/* Donut - Allocation */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Support vs Response</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={allocationPieData} cx="50%" cy="50%" innerRadius={42} outerRadius={60} startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
                  {allocationPieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  formatter={(v) => [v.toLocaleString('th-TH'), '']}
                  contentStyle={{ background: '#fff', border: '1px solid #dde1f0', borderRadius: 10, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#059669' }} />
                Support {sPct}%
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#dc2626' }} />
                Response {cPct}%
              </span>
            </div>
          </div>

          {/* Allocation Bars */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Allocation Detail</div>
            <div className={styles.allocBars}>
              <div className={styles.allocBar}>
                <div className={styles.allocLabel}>Support</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFillGreen} style={{ width: `${sPct}%` }} />
                </div>
                <div className={styles.allocNum}>{fmt(s)}</div>
              </div>
              <div className={styles.allocBar}>
                <div className={styles.allocLabel}>Response</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFillRed} style={{ width: `${cPct}%` }} />
                </div>
                <div className={styles.allocNum}>{fmt(c)}</div>
              </div>
            </div>
            <div className={styles.execNote}>
              การตอบโต้กระจายหลายโพสต์เพื่อลดความเสี่ยง spike เชิงลบ และรักษาภาพรวมการสนทนาให้อยู่ในโทนบวก
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
