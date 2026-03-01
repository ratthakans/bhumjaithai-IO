// IO Control Tower — Data Layer
// Edit this file to update campaign data

export const CAMPAIGN_DATA = {
  campaignId: 'UB-ENG-01',
  campaignName: 'Ubon Ratchathani 2569',
  health: 'On Track',
  healthScore: 94,
  tone: 'Positive Bias',
  risk: 'Low',
  riskLevel: 1, // 1=Low, 2=Medium, 3=High

  budget: { target: 8000, used: 7398 },
  allocation: { supportUsed: 5622, counterUsed: 1776 },

  supportPosts: [
    { name: 'Support #1', type: 'Reel', comments: 220, status: 'Completed', url: 'https://www.facebook.com/share/r/1FG1DUGKTR/', engagement: 4.2 },
    { name: 'Support #2', type: 'Post', comments: 170, status: 'Completed', url: 'https://www.facebook.com/share/p/1c8zSBJMCb/', engagement: 3.8 },
    { name: 'Support #3', type: 'Post', comments: 210, status: 'Completed', url: 'https://www.facebook.com/share/p/1BLKYj7gJM/', engagement: 4.5 },
    { name: 'Support #4', type: 'Post', comments: 160, status: 'Completed', url: 'https://www.facebook.com/share/14TpqYTHL75/', engagement: 3.2 },
    { name: 'Support #5', type: 'Post', comments: 130, status: 'Completed', url: 'https://www.facebook.com/share/p/1AUbXiXiqf/', engagement: 2.9 },
    { name: 'Support #6', type: 'Post', comments: 120, status: 'Completed', url: 'https://www.facebook.com/share/14TpqYTHL75/', engagement: 2.7 },
    { name: 'Support #7', type: 'Post', comments: 110, status: 'Completed', url: 'https://www.facebook.com/share/14TpqYTHL75/', engagement: 2.5 },
    { name: 'Support #8', type: 'Post', comments: 130, status: 'Active', url: 'https://www.facebook.com/share/p/1774YRSDxM/', engagement: 3.1 },
    { name: 'Support #9', type: 'Post', comments: 120, status: 'Active', url: 'https://www.facebook.com/share/p/1DskyEwoq8/', engagement: 2.8 },
    { name: 'Support #10', type: 'Post', comments: 110, status: 'Active', url: 'https://www.facebook.com/share/p/1Za7izYJdX/', engagement: 2.6 },
  ],

  counterPosts: [
    { name: 'Response #1', type: 'Post', comments: 120, role: 'Direct Response', url: 'https://www.facebook.com/share/p/1AG1nfpZAY/', effectiveness: 88 },
    { name: 'Response #2', type: 'Post', comments: 90, role: 'Soft Counter', url: 'https://www.facebook.com/share/p/18FMyWREfe/', effectiveness: 74 },
    { name: 'Response #3', type: 'Post', comments: 70, role: 'Fact Challenge', url: 'https://www.facebook.com/share/p/17D1KbtV2u/', effectiveness: 81 },
    { name: 'Response #4', type: 'Reel', comments: 55, role: 'Emotional Neutralize', url: 'https://www.facebook.com/share/r/19LF5Spf6y/', effectiveness: 69 },
    { name: 'Response #5', type: 'Post', comments: 60, role: 'Soft Counter', url: 'https://www.facebook.com/share/p/1Ao8tdcnCt/', effectiveness: 72 },
    { name: 'Response #6', type: 'Post', comments: 55, role: 'Direct Response', url: 'https://www.facebook.com/share/p/17rhagjZP4/', effectiveness: 77 },
    { name: 'Response #7', type: 'Video', comments: 48, role: 'Containment', url: 'https://www.facebook.com/share/v/1CPGhhhkUi/', effectiveness: 65 },
    { name: 'Response #8', type: 'Post', comments: 44, role: 'Direct Response', url: 'https://www.facebook.com/share/p/1ASMPDCyma/', effectiveness: 71 },
    { name: 'Response #9', type: 'Post', comments: 44, role: 'Containment', url: 'https://www.facebook.com/share/p/1H3wokgErc/', effectiveness: 68 },
  ],

  survey: [
    { name: 'ภูมิใจไทย', val: 24.2, color: '#1a56e0' },
    { name: 'เพื่อไทย', val: 21.3, color: '#dc2626' },
    { name: 'พรรคประชาชน', val: 17.8, color: '#d97706' },
    { name: 'ไทยรวมพลัง', val: 14.6, color: '#7c3aed' },
    { name: 'ประชาธิปัตย์', val: 8.7, color: '#059669' },
    { name: 'พรรคกล้าธรรม', val: 5.0, color: '#0891b2' },
    { name: 'อื่นๆ/ยังไม่ตัดสินใจ', val: 8.4, color: '#9ca3c0' },
  ],

  ubon7: {
    leadText: '+4% (±4%)',
    location: 'อุบล เขต 7',
    candidate: 'กานต์',
    status: 'Leading',
    sparkSeries: [48, 49, 50, 51, 52, 53, 54, 54, 55, 56],
  },

  // Narrative threats / monitoring
  threats: [
    { id: 'T001', priority: 'High', type: 'Disinformation', message: 'ข่าวปลอมเรื่องนโยบายน้ำ — แพร่กระจายในกลุ่มชาวนา', platform: 'Facebook', status: 'Monitoring', time: '2h ago' },
    { id: 'T002', priority: 'Medium', type: 'Negative Sentiment', message: 'เทรนด์เชิงลบ #เลือกตั้งอุบล — engagement ลดลง 12%', platform: 'X (Twitter)', status: 'Contained', time: '4h ago' },
    { id: 'T003', priority: 'Low', type: 'Competitor Surge', message: 'เพื่อไทยเพิ่มการโพสต์ 40% ในเขต 3–5', platform: 'Multi-platform', status: 'Watching', time: '6h ago' },
    { id: 'T004', priority: 'Medium', type: 'Viral Risk', message: 'คลิปวิจารณ์ผู้สมัคร — view กำลังขึ้น เร็ว', platform: 'TikTok', status: 'Responding', time: '1h ago' },
  ],

  // Timeline / Activity log
  activityLog: [
    { time: '07:32', action: 'Deployed 44 comments to Support #9', type: 'deploy', user: 'Ops Team' },
    { time: '06:15', action: 'Scenario B analysis completed', type: 'analysis', user: 'AI Engine' },
    { time: '05:48', action: 'Threat T004 escalated to Responding', type: 'alert', user: 'Monitor Bot' },
    { time: '04:20', action: 'Response #9 published to Facebook', type: 'deploy', user: 'Field Team' },
    { time: '03:55', action: 'Social listening report generated', type: 'report', user: 'System' },
    { time: '02:10', action: 'Campaign health check — All systems nominal', type: 'system', user: 'System' },
  ],

  scenarios: {
    A: {
      id: 'A',
      title: 'Scenario A: Maintain Current Pace',
      subtitle: 'Conservative — รักษาจังหวะปัจจุบัน',
      description: 'คงกลยุทธ์เดิม กระจาย comment อย่างสม่ำเสมอ ไม่เพิ่มความเข้มข้น ลด exposure risk',
      tactics: ['Narrative stability: สูง', 'Risk: ต่ำ', 'Effect window: 7–10 วัน', 'Resource usage: 85%'],
      swing: '+0.5% ถึง +1.2%',
      confidence: 82,
      riskLevel: 'Low',
      line: [52, 54, 55, 56, 56, 57, 57, 58, 58, 58],
      color: '#1a56e0',
    },
    B: {
      id: 'B',
      title: 'Scenario B: Focused Surge',
      subtitle: 'Aggressive — เพิ่มความเข้มข้น surgical',
      description: 'Deploy comment ที่เหลือแบบ targeted เฉพาะจุดแข่งขันสูง ลด undecided voter perception',
      tactics: ['Reinforcement แบบ surgical', 'ลด undecided gap', 'Risk: ต่ำ-กลาง', 'Timeline: 5–7 วัน'],
      swing: '+1.5% ถึง +2.0%',
      confidence: 67,
      riskLevel: 'Medium',
      line: [52, 55, 57, 58, 59, 60, 61, 61, 62, 62],
      color: '#059669',
    },
    C: {
      id: 'C',
      title: 'Scenario C: Hold & Defend',
      subtitle: 'Defensive — หยุด deploy ใหม่',
      description: 'หยุด deployment ใหม่ ให้ organic reach ทำงาน เฝ้าระวัง counter-narrative จากฝั่งตรงข้าม',
      tactics: ['Narrative decay: moderate', 'Risk: กลาง (counter regain)', 'Effect window: 7 วัน', 'Save resources: 100%'],
      swing: '-0.2% ถึง +0.3%',
      confidence: 45,
      riskLevel: 'High',
      line: [52, 51, 51, 50, 50, 50, 49, 49, 49, 48],
      color: '#dc2626',
    },
    D: {
      id: 'D',
      title: 'Scenario D: Emergency Blitz',
      subtitle: 'Maximum — ระดม resource ทั้งหมด',
      description: 'ใช้ทุก resource ที่มีแบบ full-speed เหมาะกับกรณี crisis หรือ ช่วง 48 ชั่วโมงสุดท้าย',
      tactics: ['Max engagement push', 'Cross-platform surge', 'Risk: สูง (visibility spike)', 'All hands deployed'],
      swing: '+2.5% ถึง +3.5%',
      confidence: 54,
      riskLevel: 'High',
      line: [52, 56, 59, 62, 64, 65, 66, 66, 67, 67],
      color: '#d97706',
    },
  },

  // Mission status
  mission: {
    startDate: '1 ก.พ. 2569',
    endDate: '9 มี.ค. 2569',
    province: 'อุบลราชธานี',
    districts: 11,
    activeTeams: 4,
    lastSync: '07:48 น.',
  },
}

export function normalizeAllocation(data) {
  const used = data.budget.used
  let s = data.allocation.supportUsed
  let c = data.allocation.counterUsed
  const sum = s + c
  if (sum <= 0) { s = Math.round(used * 0.76); c = used - s }
  if (sum !== used) {
    const k = used / sum
    s = Math.round(s * k)
    c = used - s
  }
  return { supportUsed: s, counterUsed: c }
}
