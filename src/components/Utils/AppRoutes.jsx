import AssignReturnBook from '../Books/AssignReturnBooks';
import Create from '../Books/Create';
import Books from '../Books';
import CreateStudent from '../Students/CreateStudent';
import Students from '../Students';
import { Navigate } from 'react-router-dom';

export default [
  {
    path: '/book',
    element: <Books />,
  },
  {
    path: '/book/create',
    element: <Create />,
  },
  {
    path: '/book/edit/:id',
    element: <Create />,
  },
  {
    path: '/book/assign-return',
    element: <AssignReturnBook />,
  },
  {
    path: '/student/create',
    element: <CreateStudent />,
  },
  {
    path: '/student',
    element: <Students />,
  },
  {
    path: '*',
    element: <Navigate to="/book" />,
  },
];
