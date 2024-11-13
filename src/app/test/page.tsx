import { EmailTemplate } from '@/components/email-template'
export default function Page() {
  return (
    <div>
      <EmailTemplate email="ventas@tellsenales.com" name="johney" message="hola" />
    </div>
  )
}
