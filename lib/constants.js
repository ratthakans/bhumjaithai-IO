/**
 * @fileoverview Centralised UI constants — labels, colours, type mappings.
 * Keep all hard-coded strings here rather than scattered across components.
 */

/** @type {Record<string, {color: string, label: string}>} */
export const RISK_CFG = {
  Low:    { color: 'green', label: 'ความเสี่ยงต่ำ' },
  Medium: { color: 'amber', label: 'ความเสี่ยงกลาง' },
  High:   { color: 'red',   label: 'ความเสี่ยงสูง' },
}

/** @type {Record<string, {color: string, label: string}>} */
export const THREAT_STATUS_CFG = {
  Monitoring: { color: 'amber', label: 'กำลังติดตาม' },
  Contained:  { color: 'teal',  label: 'ควบคุมได้' },
  Watching:   { color: 'gray',  label: 'เฝ้าระวัง' },
  Responding: { color: 'blue',  label: 'กำลังตอบโต้' },
}

/** @type {Record<string, {color: string, label: string}>} */
export const THREAT_PRIORITY_CFG = {
  High:   { color: 'red',   label: 'High' },
  Medium: { color: 'amber', label: 'Medium' },
  Low:    { color: 'green', label: 'Low' },
}

/** @type {Record<string, {icon: string, color: string, label: string}>} */
export const ACTIVITY_TYPE_CFG = {
  deploy:   { icon: '🚀', color: 'blue',   label: 'Deploy' },
  analysis: { icon: '📊', color: 'violet', label: 'Analysis' },
  alert:    { icon: '⚠️', color: 'amber',  label: 'Alert' },
  report:   { icon: '📋', color: 'teal',   label: 'Report' },
  system:   { icon: '⚙️', color: 'gray',   label: 'System' },
}

/** @type {Record<string, string>} */
export const ROLE_COLOR_MAP = {
  'Direct Response':       'red',
  'Soft Counter':          'amber',
  'Fact Challenge':        'blue',
  'Emotional Neutralize':  'violet',
  'Containment':           'teal',
}

/** @type {Record<string, {color: string, label: string}>} */
export const POST_STATUS_CFG = {
  Completed: { color: 'green', label: 'Completed' },
  Active:    { color: 'amber', label: 'Active' },
}

export const LOGO_URL = 'https://admin.bhumjaithai.com/wp-content/uploads/2025/04/bjt_logo_h.png'
