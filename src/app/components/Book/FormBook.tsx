import React, {
  useState,
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
} from "react";
import ListBook from "./ListBook";

const FormBook: React.FC = () => {
  const [name, setName] = useState("");
  const [books, setBooks] = useState([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const retorno = window.api.sendSync("add", {
      entity: "Book",
      value: {
        name: name,
      },
    });
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const retorno = window.api.sendSync("delete", {
      entity: "Book",
      value: {
        id: 1,
        name: "testeTE",
      },
    });
  };

  const handleUpdate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const retorno = window.api.sendSync("edit", {
      entity: "Book",
      value: {
        id: 1,
        name: "testeTE",
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
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
//<ListBook books={books}></ListBook>

export default FormBook;
