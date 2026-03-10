export type Alumno = {
  id: number;
  nombre: string;
  grupo: string;
};

export type NuevoAlumno = Omit<Alumno, 'id'>

const API_BASE_URL = 'http://localhost:8080/api';

async function handleResponse<T>(response: Response, defaultMessage: string): Promise<T> {
  if (!response.ok) {
    throw new Error(defaultMessage);
  }

  return response.json() as Promise<T>;
}

export async function fetchAlumnos(): Promise<Alumno[]> {
  const response = await fetch(`${API_BASE_URL}/items`);
  return handleResponse<Alumno[]>(response, 'No se pudieron cargar los alumnos');
}

export async function postAlumno(payload: NuevoAlumno): Promise<Alumno> {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return handleResponse<Alumno>(response, 'No se pudo crear el alumno')
}