
export function update(inputs: any, name: string, newValue: any) {
    return { ...inputs, [name]: { ...inputs[name], value: newValue } }
}

export function updateAll(inputs: any, newValues: any) {
    const newInputs: any = {};
    for (var name in inputs) {
        newInputs[name] = { ...inputs[name], value: newValues[name] };
    }
    return newInputs;
}

export function toValues(inputs: any) {

    const data: any = {};
    for (var name in inputs) {
        data[name] = inputs[name].value;
    }

    return data;
}

export function validate(inputs: any, name: string) {
    const value = inputs[name].value;

    // Se o valor do campo está vazio, exibe mensagem de erro
    if (!value) {
        return {
            ...inputs,
            [name]: {
                ...inputs[name],
                invalid: true,
                message: "Este campo é obrigatório."
            }
        };
    }

    // Verifica se o valor é válido
    const isInvalid = !inputs[name].validation(value);

    return {
        ...inputs,
        [name]: {
            ...inputs[name],
            invalid: isInvalid,
            message: isInvalid ? inputs[name].message : ""
        }
    };
}



export function toDirty(inputs: any, name: string) {
    return {
        ...inputs,
        [name]: {
            ...inputs[name],
            dirty: true // Mudar para booleano
        }
    };
}

export function updateAndValidate(inputs: any, name: string, newValue: any) {
    const dataUpdated = update(inputs, name, newValue);
    const dataValidated = validate(dataUpdated, name);
    return dataValidated;
}

export function dirtyAndValidate(inputs: any, name: string) {
    const dataDirty = toDirty(inputs, name);
    const dataValidated = validate(dataDirty, name);
    return dataValidated;
}


