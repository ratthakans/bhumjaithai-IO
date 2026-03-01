'use client'

import styles from './SurveyPanel.module.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts'

export default function SurveyPanel({ survey, ubon7 }) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <div className={styles.sectionTag}>CONTEXT LAYER</div>
          <h2 className={styles.title}>Survey Snapshot — อุบลราชธานี</h2>
        </div>
        <div className={styles.meta}>
          <span className={styles.metaChip}>1–3 ก.พ.</span>
          <span className={styles.metaChip}>n = 3,000</span>
          <span className={`${styles.metaChip} ${styles.highlight}`}>ภาพรวมจังหวัด</span>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.chartWrap}>
          <div className={styles.chartTitle}>คะแนนคาดการณ์ระดับจังหวัด (%)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={survey} layout="vertical" margin={{ top: 0, right: 40, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8eaf2" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 30]}
                tick={{ fontSize: 11, fill: '#9ca3c0' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: '#3d4766', fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip
                formatter={(v) => [`${v}%`, 'คะแนน']}
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #dde1f0',
                  borderRadius: 10,
                  fontSize: 13,
                  boxShadow: '0 4px 16px rgba(15,23,60,0.1)',
                }}
              />
              <Bar dataKey="val" radius={[0, 6, 6, 0]} barSize={18}>
                {survey.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.sideCol}>
          {/* Ubon 7 Social Listening */}
          <div className={styles.listeningCard}>
            <div className={styles.listeningHeader}>
              <span className={styles.liveTag}>
                <span className={styles.liveDot} />
                LIVE
              </span>
              <span className={styles.listeningTitle}>Social Listening</span>
              <span className={styles.listeningDistrict}>{ubon7.location}</span>
            </div>
            <div className={styles.leadWrap}>
              <div className={styles.leadValue}>{ubon7.leadText}</div>
              <div className={styles.leadSub}>{ubon7.candidate} • {ubon7.status}</div>
            </div>
            <div className={styles.sparkWrap}>
              <div className={styles.sparkLabel}>Momentum (10-day)</div>
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={ubon7.sparkSeries.map((v, i) => ({ day: i, value: v }))} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="value" fill="#1a56e0" radius={[3, 3, 0, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key insights */}
          <div className={styles.insightsCard}>
            <div className={styles.insightsTitle}>Key Insights</div>
            <ul className={styles.bullets}>
              <li>ภูมิใจไทยนำ 24.2% — เหนือเพื่อไทย 2.9 จุด</li>
              <li>กลุ่ม "ยังไม่ตัดสินใจ" 8.4% — narrative ยังมีผล</li>
              <li>ไทยรวมพลังทรงตัว 13–16% หลายเขต</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
