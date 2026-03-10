import { useMemo, useState } from 'react'
import './App.css'
import Formulario from './components/formulario'
import SearchBar from './components/SearchBar'
import AlumnoList from './components/AlumnoList'
import { useAlumnos } from './hooks/useAlumnos'
import { postAlumno, type Alumno, type NuevoAlumno } from './lib/api'


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const { filteredAlumnos, alumnos, loading, error, refetch } = useAlumnos(searchTerm);

  const handleEnviar = async (datos: NuevoAlumno) => {
    try {
      setSubmitError('');
      await postAlumno(datos);
      await refetch();
    } catch (createError) {
      setSubmitError(createError instanceof Error ? createError.message : 'No se pudo crear el alumno');
    }
  }

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
          <span>Total de Alumnos</span>
          <strong>{stats.totalAlumnos}</strong>
        </article>
        <article className="stat-card">
          <span>Alumnos filtrados</span>
          <strong>{stats.filteredAlumnos}</strong>
        </article>
        <article className="stat-card">
          <span>Alumno seleccionado</span>
          <strong>{stats.selectedAlumnoId}</strong>
        </article>
      </section>

      <Formulario onEnviar={handleEnviar} />

      {submitError ? <p className="error-text">{submitError}</p> : null}



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
