// Función para obtener residuos
export const getResiduos = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/residuos");
        if (!response.ok) throw new Error('Error al obtener residuos');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

// Función para crear un residuo
export const createResiduo = async (data) => {
    try {
        const response = await fetch("http://localhost:8080/api/residuos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al crear residuo');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

// Función para actualizar un residuo
export const updateResiduo = async (id, data) => {
    try {
        const response = await fetch(`http://localhost:8080/api/residuos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al actualizar residuo');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

// Función para eliminar un residuo
export const deleteResiduo = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/residuos/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error('Error al eliminar residuo');
        return true;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

// Función para obtener resumen de categorías
export const getResumenCategorias = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/residuos/resumen");
        if (!response.ok) throw new Error('Error al obtener resumen');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

// Alertas
export const getAlertasActivas = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/alertas/activas");
        if (!response.ok) throw new Error('Error al obtener alertas');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};

export const resolverAlerta = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/alertas/${id}/resolver`, {
            method: "PATCH"
        });
        if (!response.ok) throw new Error('Error al resolver alerta');
        return true;
    } catch (error) {
        console.error('API Error:', error.message);
        throw error;
    }
};
