import { NextResponse } from 'next/server'
import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'
import { envs } from '@/config'

const htmlTemplate = ({
  message,
  email,
  name,
}: {
  message: string
  email: string
  name: string
}) => `
`
export async function POST(req: Request) {
  const body = await req.json()
  console.log(body)

  const { email, name, message, ruc, phone } = body

  const resend = new Resend(envs.RESEND_API_KEY)

  try {
    const { data, error } = await resend.emails.send({
      from: `${name} <ventas@tellsenales.com>`,
      to: ['tellsenales@gmail.com'],
      subject: 'Cliente desde la WEB',
      react: EmailTemplate({ email, name, message, ruc, phone }),
    })

    if (error) {
      return Response.json(
        {
          error,
        },
        {
          status: 500,
        },
      )
    }

    console.log(data)
    return Response.json({
      data,
    })
  } catch (error) {
    console.log(error)
    return Response.json(
      { error },
      {
        status: 500,
      },
    )
  }

  // try {
  //   const transporter = nodemailer.createTransport({
  //     host: 'mail.tellsenales.com',
  //     port: 465,
  //     secure: true, // Use `true` for port 465, `false` for all other ports
  //     auth: {
  //       user: 'ventas@tellsenales.com',
  //       pass: envs.EMAIL_PASSWORD,
  //     },
  //   })
  //
  //   // send mail with defined transport object
  //   const info = await transporter.sendMail({
  //     from: `"${userInfo!.name} 👻 " <${userInfo!.email}>`, // sender address
  //     to: 'ventas@tellsenales.com', // list of receivers
  //     subject: `MENSAJE WEB: De ${userInfo!.name} - ${userInfo!.email}  ✔`, // Subject line
  //     text: userInfo!.message, // plain text body
  //     // html: '<b>Hello world?</b>', // html body
  //   })
  //
  //   console.log('Message sent: %s', info.messageId)
  //   return NextResponse.json({
  //     success: true,
  //     message: 'Email enviado correctamente',
  //     data: userInfo,
  //   })
  // } catch (error) {
  //   console.log(error)
  //   return NextResponse.json({
  //     success: false,
  //     message: 'No se pudo enviar el email',
  //   })
  // }
}

export async function GET(req: Request) {
  return NextResponse.json({
    success: true,
    message: 'Email Api ventas@tellsenales.com',
  })
}
