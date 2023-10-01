import { getSignals } from '@/services/signals'
import SignalCard from '@/components/signal-card'

export default async function Home() {
  const signals = await getSignals()
  return (
  <div>
      <ul>
        {signals.map(signal => <SignalCard key={signal.id} signal={signal} />)}
      </ul>
    </div>
  )
}
