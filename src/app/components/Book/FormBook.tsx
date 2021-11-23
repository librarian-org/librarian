import React, { useState } from "react";

const FormBook: React.FC = () => {
  const [name, setName] = useState("");
  const [books, setBooks] = useState([]);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const retorno: any = window.api.sendSync("create", {
      entity: "Book",
      value: {
        name: name,
      },
    });
    setBooks(retorno);
    console.log(retorno);
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const retorno: any = window.api.sendSync("delete", {
      entity: "Book",
      value: {
        id: 1,
        name: "testeTE",
      },
    });
    setBooks(retorno);
    console.log(retorno);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const retorno: any = window.api.sendSync("update", {
      entity: "Book",
      value: {
        id: 1,
        name: "testeTE",
      },
    });
    setBooks(retorno);
    console.log(retorno);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <form onSubmit={(event) => handleCreate(event)}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(event) => handleChange(event)}
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>

      <button onClick={(event) => handleDelete(event)}>delete</button>
      <button onClick={(event) => handleUpdate(event)}>update</button>
    </>
  );
};

export default FormBook;
