import { useState } from 'react'
import './App.css'
import Formulario from './components/formulario'
import Header from './components/header'
import Info from './components/info'

function App() {
  const [alumno, setAlumno] = useState({
    nombre: '',
    id: '0001',
    grupo: '',
  })

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <Header />
      <Formulario
        onEnviar={({ nombre, grupo }) =>
          setAlumno((prev) => ({
            ...prev,
            nombre,
            grupo,
          }))
        }
      />
      <Info nombre={alumno.nombre} id={alumno.id} grupo={alumno.grupo} />
    </div>
  )
}

export default App
