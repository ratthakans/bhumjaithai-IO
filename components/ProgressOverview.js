'use client'

/**
 * ProgressOverview — View component.
 * Bug fix: sPct/cPct were strings ('—') when sum=0, causing CSS width to break.
 * Now receives normalised metrics from the model layer.
 */
import { fmtTH } from '@/lib/models'
import styles from './ProgressOverview.module.css'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

/**
 * @param {{ metrics: import('@/lib/models').CampaignMetrics, data: import('@/lib/data').CampaignData }} props
 */
export default function ProgressOverview({ metrics, data }) {
  const {
    used, target, remaining, completionRate,
    supportUsed, counterUsed, supportPct, counterPct,
    pieUsage, pieAllocation,
  } = metrics

  const tooltipStyle = {
    background: '#fff',
    border: '1px solid #dde1f0',
    borderRadius: 10,
    fontSize: 12,
  }

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
            <span className={`${styles.pillVal} ${styles.blue}`}>{data.tone}</span>
          </div>
          <div className={styles.pill}>
            <span className={styles.pillLabel}>Risk</span>
            <span className={`${styles.pillVal} ${styles.green}`}>{data.risk}</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressTop}>
            <span className={styles.progressLabel}>Completion Rate</span>
            <span className={styles.progressPct}>{completionRate.toFixed(1)}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${Math.min(100, completionRate)}%` }} />
          </div>
          <div className={styles.progressStats}>
            <span>Deployed: <strong>{fmtTH(used)}</strong></span>
            <span>Target: <strong>{fmtTH(target)}</strong></span>
            <span>Remaining: <strong>{fmtTH(remaining)}</strong></span>
          </div>
        </div>

        {/* Charts Row */}
        <div className={styles.chartsRow}>
          {/* Donut — Usage */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Budget Usage</div>
            <div className={styles.chartRelative}>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={pieUsage} cx="50%" cy="50%" innerRadius={42} outerRadius={60}
                    startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
                    {pieUsage.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [fmtTH(v), '']} contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.chartCenterOverlay}>
                <span className={styles.chartBig}>{completionRate.toFixed(0)}%</span>
                <span className={styles.chartSub}>used</span>
              </div>
            </div>
            <div className={styles.chartLegend}>
              {pieUsage.map((d) => (
                <span key={d.name} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: d.color }} />
                  {d.name}
                </span>
              ))}
            </div>
          </div>

          {/* Donut — Allocation */}
          <div className={styles.chartCard}>
            <div className={styles.chartTitle}>Support vs Response</div>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={pieAllocation} cx="50%" cy="50%" innerRadius={42} outerRadius={60}
                  startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
                  {pieAllocation.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => [fmtTH(v), '']} contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.chartLegend}>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#059669' }} />
                Support {supportPct.toFixed(1)}%
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#dc2626' }} />
                Response {counterPct.toFixed(1)}%
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
                  {/* Bug fix: supportPct is now always a number (from model), not '—' */}
                  <div className={styles.barFillGreen} style={{ width: `${supportPct.toFixed(1)}%` }} />
                </div>
                <div className={styles.allocNum}>{fmtTH(supportUsed)}</div>
              </div>
              <div className={styles.allocBar}>
                <div className={styles.allocLabel}>Response</div>
                <div className={styles.barTrack}>
                  <div className={styles.barFillRed} style={{ width: `${counterPct.toFixed(1)}%` }} />
                </div>
                <div className={styles.allocNum}>{fmtTH(counterUsed)}</div>
              </div>
            </div>
            <div className={styles.execNote}>
              การตอบโต้กระจายหลายโพสต์เพื่อลดความเสี่ยง spike เชิงลบ
              และรักษาภาพรวมการสนทนาให้อยู่ในโทนบวก
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
