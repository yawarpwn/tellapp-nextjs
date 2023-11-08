import TellLogo from '@/ui/components/tell-logo'
const PrintLabel = ({ label }) => {
  const { ruc, destination, recipient, phone, address } = label
  return (
    <>
      {[1, 2, 3].map((_, index) => {
        return (
          <div
            key={index}
            className="shipping-label bg-white p-4 text-black border border-black h-[350px]"
          >
            <div className="flex flex-col justify-between">
              {/* Top */}
              <div className="flex items-center border-2 border-black">
                <div className="w-1/2 flex flex-row justify-center p-2 border-r-2 border-r-black">
                  <TellLogo />
                </div>
                <div className="w-1/2  border-l-black p-2 ">
                  <p>Señalizaciones y dispositivos de seguridad</p>
                  <p className="text-center font-semibold">tellsenales.com</p>
                </div>
              </div>
              {/* Mid */}
              <div className="flex border-r-2 border-l-2 border-l-black border-r-black">
                <div className="w-1/2 border-r-2 border-r-black p-3">
                  <h3 className="text-xl font-bold uppercase">Destinatario:</h3>
                  <p>{recipient}</p>
                  <h3 className="text-xl font-bold uppercase">Ruc/Dni:</h3>
                  <p>{ruc}</p>
                </div>
                <div className="w-1/2 p-3">
                  <h3 className="text-xl font-bold uppercase">Destino:</h3>
                  <p className="">{destination}</p>
                  <h3 className="text-xl font-bold uppercase">Teléfono:</h3>
                  <p>{phone ?? ''}</p>
                </div>
              </div>
              {/* Bottom */}
              <div className="flex justify-center items-center border-2 border-black p-3 ">
                <img src="/shipping-icons.svg" alt="" className="h-[58px]" />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default PrintLabel

