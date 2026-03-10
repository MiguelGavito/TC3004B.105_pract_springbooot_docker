type FormularioProps = {
    onEnviar: (datos: { nombre: string; grupo: string }) => void
}

function Formulario({ onEnviar }: FormularioProps) {
    const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const nombre = String(formData.get('nombre') ?? '')
        const grupo = String(formData.get('grupo') ?? '')

        onEnviar({ nombre, grupo })
    }

    return (
        <section>
            <h2 className="mb-3 text-lg font-semibold">Formulario</h2>
            <form onSubmit={handleSubmit} className="search-bar">
                <div className="flex flex-col">
                    <label htmlFor="nombre" className="mb-1">
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        className="border border-gray-300 p-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="grupo" className="mb-1">
                        Grupo
                    </label>
                    <input
                        id="grupo"
                        name="grupo"
                        type="text"
                        className="border border-gray-300 p-2"
                        required
                    />
                </div>

                {/* Luego ver si esta pagina la modifico a que se vea como el searchbar.tsx */}
                <button type="submit" className="border border-gray-300 p-2">
                    Enviar
                </button>
            </form>
        </section>
    )
}

export default Formulario