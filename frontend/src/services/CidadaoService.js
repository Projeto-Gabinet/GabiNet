const API_BASE_URL = 'http://localhost:3001'
class CidadaoService {

    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/cidadaos`, {
            headers: {
                'Content-Type': 'application/json'
            }

        })

        if (!response.ok) {
            console.log('ocorreu um erro ao listar')
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/cidadaos/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Ocorreu um erro ao listar')
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async adicionar(cidadaosDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/cidadaos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cidadaosDados)
            })

            if (!response.ok) {
                console.log('Ocorreu um erro ao adicionar')
                throw new Error('Erro ao cadastrar cidadão')
            }
        } catch (error) {
            throw error;
        }
    }

    async atualizar(idcidadaos, cidadaosDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/cidadaos/${idcidadaos}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cidadaosDados)
            })

            if (!response.ok) {
                console.log('Ocorreu um erro ao atualizar')
                throw new Error('Erro ao atualizar cidadãos')
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(idcidadaos) {

        try {
            const response = await fetch(`${API_BASE_URL}/cidadaos/${idcidadaos}`, {
                method: 'DELETE',


            })

            if (!response.ok) {
                console.log('ocorreu um erro ao deletar')
                throw new Error('Erro ao deletar cidadão')
            }
        } catch (error) {
            throw error;
        }

    }
    async filtrar(termoBusca) {
        const response = await fetch(
            `${API_BASE_URL}/cidadaos/filtrar/${termoBusca}`, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
        })

        if (!response.ok) {
            console.log('ocorreu um erro ao listar')
        } else {
            const dados = await response.json();
            return dados;
        }
    }
}

export default CidadaoService;