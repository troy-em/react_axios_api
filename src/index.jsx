import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css'
import Counter from './Counter'
import UserAPI from "./UserAPI"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Counter/>
    <UserAPI/>
  </>

)