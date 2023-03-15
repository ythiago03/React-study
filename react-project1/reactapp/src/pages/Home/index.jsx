import React, { useState, useEffect } from 'react'
import './styles.css'

import { Card } from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})
  //useState tem como primeiro valor o nome do estado e como segundo a função que muda esse estado

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second:'2-digit',
      })
    }

    setStudents(prevState => [...prevState, newStudent]);
  }

 
  useEffect(() => {
    //corpo do useEffect(é executado assim que a interface é renderizada)
    async function renderUser(){
      const response = await fetch('https://api.github.com/users/ythiago03')
      const data = await response.json()
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    renderUser()
  }, [])//o array recebe quais os estados que o useEffect depende

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      
      <input 
        type="text" 
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}/>
          ))
      }
    </div>
  )
}


