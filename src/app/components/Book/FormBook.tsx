import React, {useState, ChangeEvent, ChangeEventHandler} from 'react';


const FormBook: React.FC = () => {
    const [name, setName] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const retorno = window.api.sendSync('add', {
            entity: 'Book',
            value: {
                name: name
            }
        });
        console.log(retorno);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setName(e.target.value)
     }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <label>
            Nome:
            <input type="text" value={name} onChange={(event) => handleChange(event)} />
            </label>
            <input type="submit" value="Enviar" />
        </form>
      );
}

export default FormBook;
