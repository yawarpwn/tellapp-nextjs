interface Props {
  email: string
  name: string
  message: string
  phone?: string
}
export function EmailTemplate({ email, name, message, phone }: Props) {
  return (
    <div className="container">
      <div className="header">
        <h1 style={{ color: 'red' }} className="text-[#333]">
          Nuevo Mensaje de Contacto
        </h1>
        <p>Has recibido un nuevo mensaje desde tu página web.</p>
      </div>
      <div className="content">
        <p>
          <span className="label font-bold ">Nombre:</span> {name}
        </p>
        <p>
          <span className="label font-bold">Correo Electrónico:</span> {email}
        </p>
        <p>
          <span className="label font-bold">Teléfono:</span> {phone ?? ''}
        </p>
        <p>
          <span className="label font-bold">Mensaje:</span>
        </p>
        <p>{message}</p>
      </div>
    </div>
  )
}

// body { font-family: Arial, sans-serif; color: #333; background-color: #f4f4f9; margin: 0; padding: 0; }
// .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 8px; }
// .header { text-align: center; padding-bottom: 20px; }
// .header h1 { color: #333; }
// .content { padding: 20px; font-size: 16px; line-height: 1.5; }
// .content p { margin: 10px 0; }
// .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #888; }
// .label { font-weight: bold; }
