import Box from '@mui/material/Box';
import { Outlet} from "react-router-dom";
//+
import AppBar from "../../../share/bars/components/CommerceAppBar";
export default function Home() {
   return (
      <div id='div-home'>
      <div id='div-appbar'>
      <AppBar /> 
   </div>  
      <div id="detail"> 
         <Outlet /> 
      </div> 
   </div>  
   );
}