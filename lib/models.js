/**
 * @fileoverview Model layer — derives all computed metrics from raw campaign data.
 * Components should import from here rather than computing inline.
 */

/**
 * @typedef {Object} CampaignMetrics
 * @property {number} used
 * @property {number} target
 * @property {number} remaining
 * @property {number} completionRate   — 0–100
 * @property {number} supportUsed
 * @property {number} counterUsed
 * @property {number} supportPct       — 0–100
 * @property {number} counterPct       — 0–100
 * @property {number} totalPosts
 * @property {Array<{name:string, value:number, color:string}>} pieUsage
 * @property {Array<{name:string, value:number, color:string}>} pieAllocation
 */

/**
 * Derives all numeric campaign metrics from raw CAMPAIGN_DATA.
 * @param {import('./data').CampaignData} data
 * @returns {CampaignMetrics}
 */
export function computeMetrics(data) {
  const { budget, allocation, supportPosts, counterPosts } = data

  const used = budget.used
  const target = budget.target
  const remaining = Math.max(0, target - used)
  const completionRate = target > 0 ? (used / target) * 100 : 0

  // Normalise allocation so supportUsed + counterUsed === used
  let supportUsed = allocation.supportUsed
  let counterUsed = allocation.counterUsed
  const allocationSum = supportUsed + counterUsed

  if (allocationSum <= 0) {
    supportUsed = Math.round(used * 0.76)
    counterUsed = used - supportUsed
  } else if (allocationSum !== used) {
    const k = used / allocationSum
    supportUsed = Math.round(supportUsed * k)
    counterUsed = used - supportUsed
  }

  const supportPct = used > 0 ? (supportUsed / used) * 100 : 0
  const counterPct = used > 0 ? (counterUsed / used) * 100 : 0

  const totalPosts = supportPosts.length + counterPosts.length

  const pieUsage = [
    { name: 'Used', value: used, color: '#1a56e0' },
    { name: 'Remaining', value: remaining, color: '#e8eaf2' },
  ]

  const pieAllocation = [
    { name: 'Support', value: supportUsed, color: '#059669' },
    { name: 'Response', value: counterUsed, color: '#dc2626' },
  ]

  return {
    used,
    target,
    remaining,
    completionRate,
    supportUsed,
    counterUsed,
    supportPct,
    counterPct,
    totalPosts,
    pieUsage,
    pieAllocation,
  }
}

/**
 * Returns a colour name ('green' | 'amber' | 'red') from a riskLevel integer.
 * @param {1|2|3} riskLevel
 * @returns {'green'|'amber'|'red'}
 */
export function riskColor(riskLevel) {
  if (riskLevel === 1) return 'green'
  if (riskLevel === 2) return 'amber'
  return 'red'
}

/**
 * Formats a number using Thai locale with no decimal places.
 * @param {number} n
 * @returns {string}
 */
export function fmtTH(n) {
  return n.toLocaleString('th-TH')
}

/**
 * Converts a scenario line array to Recharts-compatible data.
 * @param {number[]} line
 * @returns {Array<{day:string, value:number}>}
 */
export function scenarioChartData(line) {
  return line.map((value, i) => ({ day: `D+${i}`, value }))
}
