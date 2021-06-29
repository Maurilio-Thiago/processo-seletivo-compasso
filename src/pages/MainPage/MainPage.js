import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL, client_id, client_secret } from '../../constants/constants';
import { HiSearchCircle } from 'react-icons/hi';
import useForm from '../../hooks/useForm';
import Spinner from '../../components/Spinner/Spinner';

const MainPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [form, onChange, clear] = useForm({ name: "" })
  const [dataUser, setDataUser] = useState([])
  const [dataUserRepos, setDataUserRepos] = useState([])

  const count = 8;
  const sort = "created: asc";

  const onSubmitForm = (e) => {
    e.preventDefault();
    getUser(setIsLoading);
  }

  const sendFormWithEnter = (e) => {
    if (e.key === 'Enter') {
      onSubmitForm(e)
    }
  }

  const getUser = () => {
    setIsLoading(true)
    axios
      .get(
        `${BASE_URL}/${form.name}?client_id=${client_id}&client_secret=${client_secret}`
      )
      .then((res) => {
        setDataUser(res.data)
        // console.log(res.data)
        // clear()
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        alert("Ocorreu um erro, tente novamente!")
      })
  };

  const getUserRepos = () => {
    setIsLoading(true)
    axios
      .get(`${BASE_URL}/${form.name}/repos?per_page=${count}&{sort}?client_id=${client_id}&client_secret=${client_secret}`)
      .then((res) => {
        setDataUserRepos(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        alert("Ocorreu um erro, tente novamente!")
      })
  }

  const getUserStars = () => {
    setIsLoading(true)
    axios
      .get(`${BASE_URL}/${form.name}/starred?per_page${count}?client_id=${client_id}&client_secret=${client_secret}`)
      .then((res) => {
        setDataUserRepos(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        alert("Ocorreu um erro, tente novamente!")
        setIsLoading(false)
      })
  }

  return (
    <div className="container mt-5">
      <div className="card card-body">
        <h1> Pesquisar:</h1>

        <form onSubmit={onSubmitForm}>
          <input
            id="search"
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="..."
            required
            onKeyPress={sendFormWithEnter}
          />
          <button type="submit">
            {isLoading ? <Spinner /> : <HiSearchCircle />}
          </button >
        </form>
        {dataUser.url && <div>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top" src={dataUser.avatar_url} />
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Repositórios:
                    <span className="badge bg-success">{dataUser.public_repos}</span>
                  </li>
                  <li className="list-group-item">
                    Seguidores:
                    <span className="badge bg-primary">{dataUser.followers}</span>
                  </li>
                  <li className="list-group-item">
                    Seguindo:
                    <span className="badge bg-info">{dataUser.following}</span>
                  </li>
                </ul>
                <div className="card-body">
                  <a href={dataUser.html_url} className="btn btn-success btn-block">Ver perfil</a>

                </div>
                <div className="card-body">
                  <button onClick={getUserRepos} type="button" className="btn btn-secondary">Repos</button>
                  <button onClick={getUserStars} type="button" className="btn btn-dark">Starred</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

        <ul className="list-group">
          {dataUserRepos && dataUserRepos.map((repo) => {
            return (
              <li className="list-group-item list-group-item-dark" key={repo.id}>
                <p>Nome = {repo.name}</p>
                <p>URL = {repo.html_url}</p>
                <p>Linguagem = {repo.language}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MainPage;