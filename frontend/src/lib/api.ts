export type Alumno = {
  id: number;
  nombre: string;
  grupo: string;
};


const API_BASE_URL = '/api';

async function handleResponse<T>(response: Response, defaultMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(defaultMessage);
  }

  return response.json() as Promise<T>;
}

export async function fetchAlumnos(): Promise<Alumno[]> {
  const response = await fetch(`${API_BASE_URL}/posts`);
  return handleResponse<Alumno[]>(response, 'No se pudieron cargar los alumnos');
}

