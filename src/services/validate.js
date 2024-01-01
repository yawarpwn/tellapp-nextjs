export function isValidLabel(obj) {
	const { ruc, recipient, phone, destination } = obj

	if (!ruc) {
		return 'Ruc o Dni es requerido'
	}

	if (!recipient) {
		return 'Destinatario es requerido'
	}

	if (!phone) {
		return 'Telefono es requerido'
	}

	if (destination) {
		return 'Destino es requerido'
	}

	return null
}
