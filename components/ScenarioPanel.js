'use client'

/**
 * ScenarioPanel — View component.
 * Chart data and risk config sourced from model/constants.
 */
import { useState } from 'react'
import { scenarioChartData } from '@/lib/models'
import { RISK_CFG } from '@/lib/constants'
import styles from './ScenarioPanel.module.css'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'

export default function ScenarioPanel({ scenarios }) {
  const [active, setActive] = useState('A')
  const sc = scenarios[active]
  const chartData = scenarioChartData(sc.line)

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.sectionTag}>SCENARIO PLANNING</div>
          <h2 className={styles.title}>Narrative Projection</h2>
        </div>
        <div className={styles.tabs}>
          {Object.values(scenarios).map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`${styles.tab} ${active === s.id ? styles.tabActive : ''}`}
              style={active === s.id ? { borderColor: s.color, color: s.color } : {}}
            >
              {s.id}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        {/* Scenario Info */}
        <div className={styles.infoCol}>
          <div className={styles.scenarioTitle} style={{ color: sc.color }}>
            {sc.title}
          </div>
          <div className={styles.scenarioSubtitle}>{sc.subtitle}</div>

          <p className={styles.description}>{sc.description}</p>

          <div className={styles.tacticsGrid}>
            {sc.tactics.map((t, i) => (
              <div key={i} className={styles.tactic}>
                <span className={styles.tacticDot} style={{ background: sc.color }} />
                {t}
              </div>
            ))}
          </div>

          <div className={styles.metrics}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Estimated Swing</span>
              <span className={styles.metricValue} style={{ color: sc.color }}>{sc.swing}</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Model Confidence</span>
              <div className={styles.confidenceBar}>
                <div
                  className={styles.confidenceFill}
                  style={{ width: `${sc.confidence}%`, background: sc.color }}
                />
              </div>
              <span className={styles.metricSmall}>{sc.confidence}%</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Risk Level</span>
              <span className={`${styles.riskBadge} ${styles[RISK_CFG[sc.riskLevel]?.color ?? 'gray']}`}>
                {RISK_CFG[sc.riskLevel]?.label ?? sc.riskLevel}
              </span>
            </div>
          </div>

          <div className={styles.note}>
            ⚠ Prediction เป็น scenario-based estimate เพื่อใช้ประกอบการตัดสินใจ — ไม่ใช่การรับประกันผล
          </div>
        </div>

        {/* Chart */}
        <div className={styles.chartCol}>
          <div className={styles.chartLabel}>Effect Index (relative) • 10-day projection</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8eaf2" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: '#9ca3c0' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3c0' }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #dde1f0',
                  borderRadius: 10,
                  fontSize: 13,
                  boxShadow: '0 4px 16px rgba(15,23,60,0.1)',
                }}
                labelStyle={{ color: '#3d4766', fontWeight: 700 }}
              />
              <ReferenceLine y={52} stroke="#9ca3c0" strokeDasharray="4 4" strokeWidth={1} label={{ value: 'Baseline', fill: '#9ca3c0', fontSize: 10 }} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={sc.color}
                strokeWidth={3}
                dot={{ fill: sc.color, strokeWidth: 0, r: 5 }}
                activeDot={{ r: 7, fill: sc.color }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Compare all scenarios mini */}
          <div className={styles.compareRow}>
            {Object.values(scenarios).map((s) => (
              <div key={s.id} className={`${styles.compareCard} ${active === s.id ? styles.compareActive : ''}`} onClick={() => setActive(s.id)}>
                <span className={styles.compareId} style={{ background: s.color }}>{s.id}</span>
                <span className={styles.compareSwing}>{s.swing}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
