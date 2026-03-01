/**
 * Dashboard Page — Server Component (Controller layer)
 *
 * Responsibility: fetch data, compute derived metrics, pass to View components.
 * No client state or side-effects here.
 */
import { CAMPAIGN_DATA } from '@/lib/data'
import { computeMetrics } from '@/lib/models'
import Topbar from '@/components/Topbar'
import KpiRow from '@/components/KpiRow'
import ProgressOverview from '@/components/ProgressOverview'
import ScenarioPanel from '@/components/ScenarioPanel'
import ThreatPanel from '@/components/ThreatPanel'
import SurveyPanel from '@/components/SurveyPanel'
import PostTables from '@/components/PostTables'
import ActivityLog from '@/components/ActivityLog'
import styles from './page.module.css'

export const metadata = {
  title: 'IO Control Tower — Engagement Monitoring Dashboard',
  description:
    'Information Operations Control Tower for real-time campaign monitoring, narrative management, and scenario planning.',
}

export default function DashboardPage() {
  const data = CAMPAIGN_DATA
  const metrics = computeMetrics(data)

  return (
    <div className={styles.layout}>
      <Topbar data={data} metrics={metrics} />
      <KpiRow metrics={metrics} data={data} />

      <div className={styles.gridRow}>
        <ProgressOverview metrics={metrics} data={data} />
        <ScenarioPanel scenarios={data.scenarios} />
      </div>

      <div className={styles.gridRow}>
        <ThreatPanel threats={data.threats} />
        <ActivityLog log={data.activityLog} mission={data.mission} />
      </div>

      <SurveyPanel survey={data.survey} ubon7={data.ubon7} />
      <PostTables supportPosts={data.supportPosts} counterPosts={data.counterPosts} />

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerBrand}>IO Control Tower</span>
          <span className={styles.footerSep}>•</span>
          <span>
            Campaign <code className={styles.footerCode}>{data.campaignId}</code>
          </span>
          <span className={styles.footerSep}>•</span>
          <span>
            {data.mission.province} • {data.mission.districts} เขต
          </span>
        </div>
        <div className={styles.footerRight}>
          <span>ใช้เพื่อรายงานผลผู้บริหารเท่านั้น</span>
          <span className={styles.footerSep}>•</span>
          <span className={styles.footerVersion}>v5.1 Next.js</span>
        </div>
      </footer>
    </div>
  )
}
