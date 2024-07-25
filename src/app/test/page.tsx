import { db } from '@/db'
export default async function PageTest() {
  console.log(db)
  return (
    <form>
      Neyda
      <input type="email" placeholder="tu correo" />
      <button>Enviar</button>
    </form>
  )
}
