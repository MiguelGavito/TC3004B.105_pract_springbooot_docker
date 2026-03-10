import { useMemo, useState } from 'react'
import './App.css'
import Formulario from './components/formulario'
import Header from './components/header'
import Info from './components/info'
import SearchBar from './components/SearchBar'
import AlumnoList from './components/AlumnoList'
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
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Practica SpringBoot </p>
        <h1>Explorador de Alumnos</h1>
        <p>
          Usa Spingboot como backend y react + tailwind para frontend con typescript.
        </p>
      </header>

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

        <Formulario onEnviar={function (datos: { nombre: string; grupo: string }): void {
        throw new Error('Function not implemented.')
      } }/>



      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <section className="layout">
        <AlumnoList
          alumnos={filteredAlumnos}
          selectedAlumnoId={selectedAlumno?.id ?? null}
          onSelectAlumno={setSelectedAlumno}
          loading={loading}
          error={error}
        />

      </section>
    </main>
  );
}

export default App
