
export function update(inputs: any, name: string, newValue: any) {
    return { ...inputs, [name]: { ...inputs[name], value: newValue } };
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
    if (!inputs[name].validation) {
        return inputs;
    }

    const isInvalid = !inputs[name].validation(inputs[name].value);

    return {
        ...inputs,
        [name]: {
            ...inputs[name],
            invalid: isInvalid // Agora é booleano
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

export function toDirtyAll(inputs: any) {
    const newInputs: any = {};
    for (const name in inputs) {
        newInputs[name] = { ...inputs[name], dirty: true };
    }
    return newInputs;
}

export function validateAll(inputs: any) {
    const newInputs: any = {};
    for (const name in inputs) {
        if (inputs[name].validation && typeof inputs[name].validation === "function") {
            const isInvalid = !inputs[name].validation(inputs[name].value);
            newInputs[name] = {
                ...inputs[name],
                invalid: isInvalid,  // Agora é booleano
                dirty: inputs[name].dirty ?? false // Mantém dirty se já estava definido
            };
        } else {
            newInputs[name] = { ...inputs[name] };
        }
    }
    return newInputs;
}

export function dirtyAndValidateAll(inputs: any) {
    return validateAll(toDirtyAll(inputs));
}

export function hasAnyInvalid(inputs: any): boolean {
    for (const name in inputs) {
        if (inputs.hasOwnProperty(name) && inputs[name].dirty && inputs[name].invalid) {
            return true;
        }
    }
    return false;
}

// Nova função para verificar se o formulário está completamente válido
export function isFormValid(inputs: any): boolean {
    for (const name in inputs) {
        if (inputs.hasOwnProperty(name)) {
            if (inputs[name].validation && typeof inputs[name].validation === "function") {
                const isInvalid = !inputs[name].validation(inputs[name].value);
                if (isInvalid) {
                    return false;
                }
            }
        }
    }
    return true;
}
