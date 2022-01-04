// import React, { useEffect, useState } from 'react';
// import Button from '../Button';

// import { Container } from './styles';
// import { trigger } from '../../util/EventHandler';
// import { AppEvent } from '../../../common/AppEvent';


// const ListTitle: React.FC = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const result = window.api.sendSync('listTitle', {
//       entity: 'Title',
//     }) as Title[];
//     setItems(result);
//   }, []);

//   const handleUpdate = (item: Title): void => {
//     trigger(AppEvent.titleTab, { action: 'update', value: item });
//   };

//   const handleRead = (item: Title): void => {
//     trigger(AppEvent.titleTab, { action: 'read', value: item });
//   };

//   const handleDelete = (item: Title): void => {
//     const result = window.api.sendSync('delete', {
//       entity: 'Title',
//       value: item,
//     }) as Title[];
//     setItems(result);
//   };

//   return (
//     <Container>
//       <>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>ISBN</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, index) => {
//               return (
//                 <tr key={index}>
//                   <td>{item.name}</td>
//                   <td>{item.ISBN}</td>
//                   <td>
//                     <Button onClick={() => handleRead(item)}> Ver </Button>
//                     <Button onClick={() => handleUpdate(item)}> Editar </Button>
//                     <Button onClick={() => handleDelete(item)}> Delete </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </>
//     </Container>
//   );
// };

// export default ListTitle;
