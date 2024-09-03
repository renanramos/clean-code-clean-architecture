const CEP_VALID_LENGHT = 9;

export function validarCEP(cep: any) {
	cep = cep.replace('.', '').replace('-', '');

	if (cep === '') {
		return '';
	}

	if (isNaN(cep)) {
		return 'O CEP informado contém dígitos inválidos. Corrija-o!';
	}

	if (cep.length + 1 != CEP_VALID_LENGHT) {
		return 'Nº de dígitos do CEP menor que o normal ou em branco. Redigite-o!';
	}

	if (isAllDigitsEquals(cep)) {
		return 'CEP inválido!';
	}

	return '';
}

function isAllDigitsEquals(cep: string) {
	return [...cep].every(digit => digit == cep[0]);
}