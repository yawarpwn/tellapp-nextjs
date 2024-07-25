import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { envs } from '@/config'

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

class UserInfo {
  constructor(
    public name: string,
    public email: string,
    public message: string,
  ) {}
  static validate(obj: { [key: string]: string }): [string?, UserInfo?] {
    const { name, email, message } = obj
    if (!name) return ['Nombre es requerido']
    if (name.length < 3) return ['Nombre debe tener al menos 3 caracteres']
    if (!email) return ['Email es requerido']
    if (!emailRegex.test(email)) return ['Email invalido']
    if (!message) return ['Email es requerido']
    if (message.length < 10) return ['Mesaje muy corto']

    return [undefined, new UserInfo(name, email, message)]
  }
}

export async function POST(req: Request) {
  const body = await req.json()

  const [error, userInfo] = UserInfo.validate(body)
  //handle error
  if (error) {
    return NextResponse.json({ success: false, message: error })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.tellsenales.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'ventas@tellsenales.com',
        pass: envs.EMAIL_PASSWORD,
      },
    })

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${userInfo!.name} 👻 " <${userInfo!.email}>`, // sender address
      to: 'ventas@tellsenales.com', // list of receivers
      subject: `MENSAJE WEB: De ${userInfo!.name} - ${userInfo!.email}  ✔`, // Subject line
      text: userInfo!.message, // plain text body
      // html: '<b>Hello world?</b>', // html body
    })

    console.log('Message sent: %s', info.messageId)
    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente',
      data: userInfo,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: 'No se pudo enviar el email',
    })
  }
}

export async function GET(req: Request) {
  return NextResponse.json({
    success: true,
    message: 'Email Api ventas@tellsenales.com',
  })
}
