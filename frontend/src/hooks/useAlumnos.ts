import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchAlumnos, type Alumno } from '../lib/api';

export function useAlumnos(searchTerm: string) {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchAlumnos();
      setAlumnos(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Error al cargar alumnos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

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
    refetch,
  };
}
