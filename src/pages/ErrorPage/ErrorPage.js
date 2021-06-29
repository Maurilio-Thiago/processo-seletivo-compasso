import React from 'react';
import { MdError } from 'react-icons/md';

const ErrorPage = () => {
  return (
    <div className="container mt-5">
      <div className="card card-body">
        <h1> Página não encontrada.</h1>
        <p className="lead">
          Verifique se o caminho da URL foi digitado corretamente.  <MdError />
        </p>
      </div>
    </div>
  )
}

export default ErrorPage;