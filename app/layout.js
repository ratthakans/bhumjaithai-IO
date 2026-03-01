import './globals.css'

export const metadata = {
  title: 'IO Control Tower — Engagement Monitoring Dashboard',
  description: 'Information Operations Control Tower for real-time campaign monitoring, narrative management, and scenario planning',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
