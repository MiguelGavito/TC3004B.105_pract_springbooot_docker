import { useEffect, useMemo, useState } from 'react';
import { fetchAlumnos, type Alumno } from '../lib/api';

export function useAlumnos(searchTerm: string) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadAlumnos() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchAlumnos();
        if (active) setAlumnos(data);
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Error al cargar alumnos');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadAlumnos();

    return () => {
      active = false;
    };
  }, []);

  const filteredAlumnos = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return alumnos;

    return alumnos.filter((alumno) => alumno.nombre.toLowerCase().includes(normalized));
  }, [alumnos, searchTerm]);

  return {
    alumnos,
    filteredAlumnos,
    loading,
    error,
  };
}
