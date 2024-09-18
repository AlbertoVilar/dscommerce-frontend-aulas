
export default function FormInput(props: any) {
    const { validation, invalid = false, dirty = false, onTurnDirty, ...inputProps } = props;

    function handleBlur() {
        if (onTurnDirty) {
            onTurnDirty(props.name);
        }
    }

    return (
        <input        
            {...inputProps} 
            onBlur={handleBlur} 
            data-invalid={invalid}
            data-dirty={dirty}
        />
    );
}
