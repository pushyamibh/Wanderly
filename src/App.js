import './App.css';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import {Home} from './Home';
import { AddBucketlist } from './AddBucketlist';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {<Login/>} />
        <Route path="/home/:username" element = {<Home/>}  />
        <Route path="/add-bucketlist/:username" element = {<AddBucketlist/>} />
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
