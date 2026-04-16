import InfoPage from '@/components/InfoPage'

export default function ResponsibleGamingPage() {
  return (
    <InfoPage
      badge="Responsible Gaming"
      title="Responsible gaming"
      intro="Betting should stay controlled, entertaining, and within limits that feel safe. This page gives users a simple reminder to set boundaries and pause when needed."
      highlights={[
        'Set deposit and spending limits early',
        'Take breaks instead of chasing losses',
        'Seek support if betting stops feeling manageable',
      ]}
      sections={[
        {
          title: 'Set limits early',
          description: 'Users should set clear budget limits, take regular breaks, and avoid placing bets when stressed, rushed, or trying to recover previous losses.',
        },
        {
          title: 'Know when to pause',
          description: 'If betting stops feeling controlled, step away, disable access if necessary, and seek support from a trusted person or an appropriate local support service.',
        },
      ]}
      ctaHref="/dashboard"
      ctaLabel="Go to Dashboard"
    />
  )
}
