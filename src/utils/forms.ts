// Atualiza o valor de um campo específico no formulário
export function update(inputs: any, name: string, newValue: any) {
    return { ...inputs, [name]: { ...inputs[name], value: newValue } };
}

// Atualiza os valores de todos os campos do formulário com base em um objeto de novos valores
export function updateAll(inputs: any, newValues: any) {
    const newInputs: any = {};
    for (const name in inputs) {
        newInputs[name] = { ...inputs[name], value: newValues[name] };
    }
    return newInputs;
}

// Extrai os valores de todos os campos do formulário e retorna um objeto com esses valores
export function toValues(inputs: any) {
    const data: any = {};
    for (const name in inputs) {
        data[name] = inputs[name].value;
    }
    return data;
}

// Valida um campo específico e marca como `invalid` se a validação falhar
export function validate(inputs: any, name: string) {
    if (!inputs[name].validation) {
        return inputs;
    }

    const isInvalid = !inputs[name].validation(inputs[name].value);

    return {
        ...inputs,
        [name]: {
            ...inputs[name],
            invalid: isInvalid // Marca como inválido
        }
    };
}

// Marca um campo específico como `dirty`
export function toDirty(inputs: any, name: string) {
    return {
        ...inputs,
        [name]: {
            ...inputs[name],
            dirty: true // Marca como "sujo" (dirty)
        }
    };
}

// Atualiza o valor de um campo e o valida
export function updateAndValidate(inputs: any, name: string, newValue: any) {
    const dataUpdated = update(inputs, name, newValue);
    const dataValidated = validate(dataUpdated, name);
    return dataValidated;
}

// Marca um campo como `dirty` e o valida
export function dirtyAndValidate(inputs: any, name: string) {
    const dataDirty = toDirty(inputs, name);
    const dataValidated = validate(dataDirty, name);
    return dataValidated;
}

// Marca todos os campos como `dirty`
export function toDirtyAll(inputs: any) {
    const newInputs: any = {};
    for (const name in inputs) {
        newInputs[name] = { ...inputs[name], dirty: true };
    }
    return newInputs;
}

// Valida todos os campos do formulário
export function validateAll(inputs: any) {
    const newInputs: any = {};
    for (const name in inputs) {
        if (inputs[name].validation && typeof inputs[name].validation === "function") {
            const isInvalid = !inputs[name].validation(inputs[name].value);
            newInputs[name] = {
                ...inputs[name],
                invalid: isInvalid,  // Marca como inválido
                dirty: inputs[name].dirty ?? false // Mantém dirty se já estava definido
            };
        } else {
            newInputs[name] = { ...inputs[name] };
        }
    }
    return newInputs;
}

// Marca todos os campos como `dirty` e os valida
export function dirtyAndValidateAll(inputs: any) {
    return validateAll(toDirtyAll(inputs));
}

// Verifica se há algum campo inválido no formulário
export function hasAnyInvalid(inputs: any): boolean {
    for (const name in inputs) {
        if (inputs.hasOwnProperty(name) && inputs[name].dirty && inputs[name].invalid) {
            return true;
        }
    }
    return false;
}

// Verifica se o formulário está completamente válido
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

// Aplica os erros retornados pelo backend ao formulário
export function setBackendErrors(inputs: any, errors: any[]) {
    const newInputs: any = { ...inputs }; // Cria uma cópia dos inputs

    errors.forEach(item => {
        const { fieldName, message } = item;

        // Verifica se o campo existe no formulário
        if (newInputs[fieldName]) {
            // Atualiza o campo com a mensagem de erro e marca como inválido e "sujo"
            newInputs[fieldName] = {
                ...newInputs[fieldName], // Mantém as outras propriedades do campo
                message: message, // Adiciona a mensagem de erro
                dirty: true,     // Marca como "sujo" (dirty)
                invalid: true     // Marca como inválido
            };
        }
    });

    return newInputs;
}