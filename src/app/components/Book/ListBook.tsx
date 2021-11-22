import React, {useState, ChangeEvent, ChangeEventHandler} from 'react';


const ListBook: React.FC = ({books} : any) => {

    return (
        <ul>
            {
                books.map((item: any) => {
                    return (<li key={item.id}>{item.name}</li>)
                })
            }
        </ul>
      );
}

export default ListBook;
