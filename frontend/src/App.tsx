import { useMemo, useState } from 'react'
import './App.css'
import Formulario from './components/formulario'
import Header from './components/header'
import Info from './components/info'
import { useAlumnos } from './hooks/useAlumnos'
import type { Alumno } from './lib/api'

function App() {
  const [alumno, setAlumno] = useState({
    nombre: '',
    id: '0001',
    grupo: '',
  })
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const { filteredAlumnos, alumnos, loading, error } = useAlumnos(searchTerm);

  const stats = useMemo(() => {
    return {
      totalAlumnos: alumnos.length,
      filteredAlumnos: filteredAlumnos.length,
      selectedAlumnoId: selectedAlumno?.id ?? 'Ninguno',
    };
  }, [alumnos.length, filteredAlumnos.length, selectedAlumno]);


  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <Header />
      <h1>Practica y Comprobacion de Competencias.</h1>
      
      <section className="stats-grid">
        <article className="stat-card">
          <span>Total de posts</span>
          <strong>{stats.totalAlumnos}</strong>
        </article>
        <article className="stat-card">
          <span>Posts filtrados</span>
          <strong>{stats.filteredAlumnos}</strong>
        </article>
        <article className="stat-card">
          <span>Post seleccionado</span>
          <strong>{stats.selectedAlumnoId}</strong>
        </article>
      </section>

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
