import React from "react";
import {Route,Routes,Navigate, BrowserRouter} from  "react-router-dom";
import CreateItem from "./CreateItem";
import CreatorDashboard from "./CreatorDashboard";
import Homepage from "./Homepage";
import NavMenu from './NavMenu'

export default function Routing(){
    return(
        <>
        
        <BrowserRouter>
        <NavMenu/>
         <Routes>
            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/dashboard" element={<CreatorDashboard/>}  />
            <Route path="/create" element={<CreateItem/>} />
           
         </Routes>

        </BrowserRouter>

        </>
    )
    
}
