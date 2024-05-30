import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from './Components/getUser/User.js';
import Add from './Components/addUser/Add.js';
import Update from './Components/updateUser/Update.js';
function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />

    },
    {
      path: "/add",
      element: <Add />,

    },
    {
      path: "/edit/:id",
      element: <Update />,

    },
  ])
  return (
    <div className="App">
      <RouterProvider router={route}>

      </RouterProvider>
    </div>
  );
}

export default App;
