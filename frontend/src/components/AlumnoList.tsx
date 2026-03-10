import type { Alumno } from '../lib/api';

type AlumnoListProps = {
  alumnos: Alumno[];
  selectedAlumnoId: number | null;
  onSelectAlumno: (alumno: Alumno) => void;
  loading: boolean;
  error: string;
};

export default function AlumnoList({ alumnos, selectedAlumnoId, onSelectAlumno, loading, error }: AlumnoListProps) {
  if (loading) {
    return <section className="panel"><p>Cargando publicaciones...</p></section>;
  }

  if (error) {
    return <section className="panel"><p className="error-text">{error}</p></section>;
  }

  if (!alumnos.length) {
    return <section className="panel"><p>No hay publicaciones que coincidan con la busqueda.</p></section>;
  }

  return (
    <section>
      {alumnos.map((alumno) => (
        <button
          key={alumno.id}
          type="button"
          className={`post-card ${selectedAlumnoId === alumno.id ? 'selected' : ''}`}
          onClick={() => onSelectAlumno(alumno)}
        >
          <span className="post-card-id">Alumno #{alumno.id}</span>
          <strong>{alumno.nombre}</strong>
          <p>Grupo {alumno.grupo}</p>
        </button>
      ))}
    </section>
  );
}
