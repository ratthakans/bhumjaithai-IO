'use client'

import { CAMPAIGN_DATA } from '@/lib/data'
import Topbar from '@/components/Topbar'
import KpiRow from '@/components/KpiRow'
import ProgressOverview from '@/components/ProgressOverview'
import ScenarioPanel from '@/components/ScenarioPanel'
import ThreatPanel from '@/components/ThreatPanel'
import SurveyPanel from '@/components/SurveyPanel'
import PostTables from '@/components/PostTables'
import ActivityLog from '@/components/ActivityLog'
import styles from './page.module.css'

export default function Dashboard() {
  const data = CAMPAIGN_DATA

  return (
    <div className={styles.layout}>
      <Topbar data={data} />
      <KpiRow data={data} />

      {/* Row 1: Progress + Scenario */}
      <div className={styles.row2}>
        <ProgressOverview data={data} />
        <ScenarioPanel scenarios={data.scenarios} />
      </div>

      {/* Row 2: Threats + Activity Log */}
      <div className={styles.row2b}>
        <ThreatPanel threats={data.threats} />
        <ActivityLog log={data.activityLog} mission={data.mission} />
      </div>

      {/* Full width: Survey */}
      <SurveyPanel survey={data.survey} ubon7={data.ubon7} />

      {/* Full width: Post Tables */}
      <PostTables supportPosts={data.supportPosts} counterPosts={data.counterPosts} />

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerBrand}>IO Control Tower</span>
          <span className={styles.footerSep}>•</span>
          <span>Campaign <code className={styles.footerCode}>{data.campaignId}</code></span>
          <span className={styles.footerSep}>•</span>
          <span>{data.mission.province} • {data.mission.districts} เขต</span>
        </div>
        <div className={styles.footerRight}>
          <span>ใช้เพื่อรายงานผลผู้บริหารเท่านั้น</span>
          <span className={styles.footerSep}>•</span>
          <span className={styles.footerVersion}>v5.0 Next.js</span>
        </div>
      </footer>
    </div>
  )
}
