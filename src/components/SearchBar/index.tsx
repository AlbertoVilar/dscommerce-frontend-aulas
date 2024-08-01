import { useState } from 'react';
import './styles.css'

type Props = {

    onSearch: (newProductName: string) => void;
};


export default function SearchBar({ onSearch }: Props) {

    const [text, setText] = useState<string>("")

    function handleChange(event: any) {

        
        const productName = event.target.value

        setText(productName)

    }

    function handleResetClick(event: any) {
        
        event.preventDefault();
        setText("");
        onSearch(text) // Faz com que a busca seja refeita com texto vazio
    }

    function handleSubimit(event: any) {

        event.preventDefault();
        onSearch(text)
       

    }

    return (
        <form className="dsc-search-bar" onSubmit={handleSubimit}>
            <button type="submit">🔎︎</button>
                <input
                    value={text}
                    type="text"
                    placeholder="Nome do produto"
                    onChange={handleChange}
                />
            <button onClick={handleResetClick}>🗙</button>
        </form>
    );
}