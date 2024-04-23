import './App.css';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import {Home} from './Home';
import { AddBucketlist } from './AddBucketlist';
import VlogForm from './VlogForm';
import VlogSearch from './VlogSearch';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Login/>} />
        <Route path="/home/:username" element = {<Home/>}  />
        <Route path="/add-bucketlist/:username" element = {<AddBucketlist/>} />
        <Route path="/add-vlog/:username" element = {<VlogForm/>} />
        <Route path="/vlogsearch" element = {<VlogSearch/>} />
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
