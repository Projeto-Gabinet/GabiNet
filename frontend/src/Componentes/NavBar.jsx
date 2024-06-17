
import { Link, Outlet } from 'react-router-dom';
import {FaCogs, FaHome, FaBars, FaUserCircle} from 'react-icons/fa'
import {Container} from 'react-bootstrap'
import './NavBar.css'
import { useState } from 'react';
function NavBar() {
    const  [show,setShow] =useState(true);
    const handeShow=()=>{
        setShow(!show)
    }
    return ( <>
      <div className={`side-navbar ${show?'active-nav':'' }`} id="sidebar" >
         <ul className="nav flex-column text-white w-100" >
           <span className="nav-link h3 text-white my-2">GabiNET</span>
         </ul>
         <li className="nav-link" >
            <Link to='/'>
             <FaHome></FaHome>    
            <span className="mx-2">Home</span>   
            </Link>

         </li>
         <li className="nav-link">
         <Link to='/cidadaos'>
              <FaUserCircle></FaUserCircle>
            <span className="mx-2">Cidadãos</span>   
         </Link>
         </li>

         <li className="nav-link">
         <Link to='/funcionarios'>
              <FaUserCircle></FaUserCircle>
            <span className="mx-2">Funcionários</span>   
         </Link>
         </li>
         <li className="nav-link">
         <Link to='/secretarias'>
              <FaUserCircle></FaUserCircle>
            <span className="mx-2">Secretarias</span>   
         </Link>
         </li>
      </div>
       <div className={`p-1 my-container ${show?'active-cont':'' }`}   >
       <nav onClick={handeShow} class="navbar top-navbar navbar-light bg-light px-1">
          <FaBars ></FaBars>
          <p>Olá, Usuário</p>
        </nav>
        </div> 


       <Container>
       <Outlet></Outlet>
       </Container>
    </> );
}

export default NavBar;