import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './Componentes/NavBar';
import Cidadaos from './Paginas/Cidadaos/Cidadaos'
import CidadaosCadastro from './Paginas/Cidadaos/CidadaosCadastro';
import Funcionarios from './Paginas/Funcionarios/Funcionarios';
import FuncionariosCadastro from './Paginas/Funcionarios/FuncionariosCadastro';
import Secretarias from './Paginas/Secretarias/Secretarias';
import SecretariasCadastro from './Paginas/Secretarias/SecretariasCadastro';

const router =createBrowserRouter(
[
  { 
    //raiz
    element:<NavBar></NavBar>,
    children:[
      {
        path:'/',
        element:<App></App>
      },
      {
        path:'/cidadaos',
        element:<Cidadaos></Cidadaos>
      },
      {
        path:'/cidadaos/:idCidadao',
        element:<CidadaosCadastro></CidadaosCadastro>
      },
      {
        path:'/cidadaos/novo',
        element:<CidadaosCadastro></CidadaosCadastro>
      },
      
      {
        path:'/funcionarios',
        element:<Funcionarios></Funcionarios>
      },
      {
        path:'/funcionarios/:idFuncionario',
        element:<FuncionariosCadastro></FuncionariosCadastro>
      },
      {
        path:'/funcionarios/novo',
        element:<FuncionariosCadastro></FuncionariosCadastro>
      },
      {
        path:'/secretarias',
        element:<Secretarias></Secretarias>
      },
      {
        path:'/secretarias/:idSecretaria',
        element:<SecretariasCadastro></SecretariasCadastro>
      },
      {
        path:'/secretarias/novo',
        element:<SecretariasCadastro></SecretariasCadastro>
      },
      {
       
      
      }
      
    ]
    

  }
]

)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} >

     </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
