import axios from 'axios';
import { reactive } from 'vue';

const API_URL = 'http://localhost:3000/';

export const store = {
    state: reactive({
        books: [],
        modules: [],
        messages:[],
        cart:[],
    }),

    addToCart(code){
        const index = this.state.cart.indexOf(code)
        if(index !== -1){
            this.addMessage('Ya has añadido ese libro al carrito')
        }else{
            this.state.cart.push(code)
            this.addMessage('Libro añadido al carrito correctamente')
        }
        
    },

    delFromCart(code){
        const index = this.state.cart.indexOf(code)
        this.state.cart.splice(index, 1)
    },

    addMessage(message){
        this.state.messages.push(message)
    },

    delMessage(index){
        this.state.messages.splice(index, 1);
    
    },

    async fetchBooks() {
        try {
            const response = await axios.get(`${API_URL}books`);
            this.state.books = response.data;
        } catch (error) {
            this.addMessage('Error al obtener libros:', error);
        }
    },

    async fetchBook(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data; 
        } catch (error) {
            this.addMessage(`Error al obtener el libro con ID ${id}:`, error);
        }
    },

    async fetchModules() {
        try {
            const response = await axios.get(`${API_URL}modules`);
            this.state.modules = response.data;
        } catch (error) {
            this.addMessage('Error al obtener libros:', error);
        }
    },

    async addDBBook(newBook){
        try {
            const response = await axios.post(`${API_URL}books`, newBook);
            return response.data;
        } catch (error) {
            this.addMessage('Error al añadir el libro:', error);
            throw error;
        }
    },

    async removeDBBook(id) {
        try {
            await axios.delete(`${API_URL}books/${id}`);
        } catch (error) {
            this.addMessage(`Error al eliminar el libro con ID ${id}:`, error);
            throw error;
        }
    },
};







export const removeDBBook = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar el libro con ID ${id}:`, error);
        throw error;
    }
};

/*export const changeDBBook = async (updatedBook) => {
    try {
        const response = await axios.put(`${API_URL}/${updatedBook.id}`, updatedBook);
        return response.data;
    } catch (error) {
        console.error('Error al modificar el libro:', error);
        throw error;
    }
};

export const getModuleUsed = async (userId, moduleCode) => {
    try {
        const response = await axios.get(`${API_URL}?userId=${userId}&moduleCode=${moduleCode}`);
        return response.data.length > 0;
    } catch (error) {
        console.error(`Error al verificar si el módulo con userId ${userId} y moduleCode ${moduleCode} está en uso:`, error);
        throw error;
    }
}
*/