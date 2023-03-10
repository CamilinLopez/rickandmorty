import './App.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "./configAxios";

import { useState, useEffect } from 'react';

import Cards from './components/Cards/Cards';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Favoritos from './components/Favoritos/Favoritos';
import Login from './components/Login/Login';
import Singup from './components/singUp/Singup';


function App() {
  const [characters, setCharacters] = useState(
    JSON.parse(localStorage.getItem("characters")) || []
  )
  const [access, setAccess] = useState(
    JSON.parse(localStorage.getItem("access")) || { login: false }
  )
  const navigate = useNavigate();
  const location = useLocation();


  const login = async (user) => {

    try {
      const data = (await axiosInstance.post("/login",
        {
          email: user.email,
          password: user.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })).data;
      if (data.status !== "succes") setAccess({...access, login:false});
      if (data.email === user.email && data.password === user.password) {

        setAccess({ ...access, login: true });
        navigate("/home");
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const pn = location.pathname;


    localStorage.setItem("access", JSON.stringify(access));
    localStorage.setItem("characters", JSON.stringify(characters));

    if (access.login && (pn === "/singup" || pn === "/login")) return navigate(-1);
    if (!access.login && (pn === "/home" || pn === "/about" || pn === "/Favoritos")) return navigate("/login");

  }, [access, characters, navigate, location])

  const onSearch = async (character) => {
    try {
      const findCharacter = characters.find(item => item.id === parseInt(character));
      if (findCharacter) return console.log("ya existe este personaje en su pagina");

      const response = (await axiosInstance.get(`http://localhost:3001/rickandmorty/character/one?parametro=${character}`)).data;
      setCharacters((oldChars) => [...oldChars, response]);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const onClose = (id) => {
    setCharacters(characters.filter(item => item.id !== id))
  }

  const singOff = async () => {
    await axiosInstance.get("/logout");
    setAccess({ ...access, login: false });
    localStorage.removeItem("access", false);

    setCharacters([]);
    localStorage.removeItem("characters", []);

    navigate("/login");
  }


  const singUp = async (user) => {
    try {
      const data = (await axiosInstance.post("/user/singup",
        {
          email: user.email,
          password: user.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )).data;

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="App">
      {
        !access.login
          ?
          <div>
            <Routes>
              <Route path='/login' element={<Login login={login} />} />
              <Route path='/singup' element={<Singup singUp={singUp} />} />
            </Routes>

          </div>
          :
          <div>
            <Nav onSearch={onSearch} />
            <Routes>
              <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
              <Route path='/about' element={<About />} />
              <Route path='/detail/:detaiId' element={<Detail />} />
              <Route path='/Favoritos' element={<Favoritos />} />
            </Routes>
            <button onClick={singOff} >Sign off</button>
          </div>
      }

    </div>
  );
}

export default App;
