const validateRequest = (req, next, schema) => {
    const options = {
        errors : {
            label: false,
            language: 'es'
        },
        messages: {
            es: { ...spanishErrors },
            en: { ...englishErrors }
        },
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`${error.details.map((x) => x.message).join(', ')}`);
    } else {
        req.body = value;
        next();
    }
}

const spanishErrors = {
    'string.empty': 'No puede ser vacío',
    'number.base': 'Debe ser número',
    'any.invalid': 'Valor no válido',
    'domain.invalid': 'Dominio no válido',
    'email.invalid': 'Email no válido',
    'array.unique': 'Hay valores duplicados',
};

const englishErrors = {
    'string.empty': 'Cannot be empty',
    'number.base': 'Must be a number',
    'any.invalid': 'Value not valid',
    'domain.invalid': 'Domain not valid',
    'email.invalid': 'Email not valid',
    'array.unique': 'contains a duplicate value',
};

module.exports = validateRequest;