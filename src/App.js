import './App.css';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import {Home} from './Home';
import { AddBucketlist } from './AddBucketlist';
import VlogForm from './VlogForm';
import VlogSearch from './VlogSearch';
import { Statistics } from './statistics';
import UnfinishedActions from './UnfinishedActions';

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
        <Route path="/statistics" element = {<Statistics/>} />
        <Route path="/unfinishedActions" element = {<UnfinishedActions/>} />
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
