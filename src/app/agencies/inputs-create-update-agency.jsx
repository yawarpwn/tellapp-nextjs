import Input from '@/components/input'
export default function InputsCreateUpdateAgency({ agency }) {
  return (
    <>
      <Input
        name="company"
        labelText={'Agencia'}
        type="text"
        required
        defaultValue={agency?.company}
      />
      <Input
        labelText={'Ruc'}
        name="ruc"
        type="number"
        defaultValue={agency?.ruc}
        required
      />

      <Input
        labelText={'Dirección'}
        name="address"
        placeholder="Dirección"
        type="text"
        defaultValue={agency?.address}
      />
      <input className="sr-only" name="id" defaultValue={agency?.id} />
    </>
  )
}
