import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
  } from "react-router-dom";
 import Home from './components/Home'
 import Login from './components/Login'
 import Sign from './components/Sign';
 import YourTodo from './components/YourTodo'
import { TodoProvider } from "./redux/context";
  function App() {
    return (
      <>
      <TodoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/sign" element={<Sign/>}></Route>
            <Route path="/products" element={<YourTodo/>}></Route>
          
          
          
          </Routes>
        </Router>
         
     
     
        </TodoProvider> 
        </>
    );
  }
  
  export default App;
  