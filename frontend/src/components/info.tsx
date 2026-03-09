type InfoProps = {
    nombre: string
    id: string
    grupo: string
}

function Info({ nombre, id, grupo }: InfoProps) {
    return (
        <section className="border border-gray-300 p-4">
            <h2 className="mb-3 text-lg font-semibold">Informacion del alumno</h2>
            <p className="border border-gray-300 p-2">Nombre: {nombre || '-'}</p>
            <p className="mt-2 border border-gray-300 p-2">ID: {id || '-'}</p>
            <p className="mt-2 border border-gray-300 p-2">Grupo: {grupo || '-'}</p>
        </section>
    )
}

export default Info