<script>
import ModulesList from './ModulesList.vue';
import BooksList from './BooksList.vue';
import { store } from '@/stores/store'
export default {
  components: {
    ModulesList,
  },
  computed: {
    modules() {
      return store.state.modules;
    }
  },
  async mounted() {
    await store.fetchModules();
  },
  methods: {
  async handleSubmit(event) {
    event.preventDefault();

    const moduleCode = document.getElementById('id-module').value;
    const publisher = document.getElementById('publisher').value;
    const price = parseFloat(document.getElementById('price').value);
    const pages = parseInt(document.getElementById('pages').value, 10);
    const status = document.querySelector('input[name="status"]:checked')?.value;
    const comments = document.getElementById('comments').value;

    const newBook = {
      module: moduleCode,
      publisher: publisher,
      price: price,
      pages: pages,
      status: status,
      comments: comments
    };

    try {
      const result = await store.addDBBook(newBook);
      store.addMessage('Libro con añadido correctamente')
      const form = document.getElementById('bookForm');
      form.reset();
      store.fetchBooks()
    } catch (error) {
      store.addMessage(error)
    }
  }
}

};
</script>

<template>
  <div id='form'>
    <form id="bookForm" @submit="handleSubmit" novalidate>
      <legend>
        <h3 class="action">AñadirLibro</h3>
      </legend>
      <div class='id'>
        <label for="id">ID:</label>
        <input type="text" id="book-id" disabled>
      </div>
      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module" required>
          <option>- Selecciona un módulo -</option>
          <modules-list v-for="module in modules" :module="module"></modules-list>
        </select>
        <span class='error'></span>
      </div>

      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" required>
        <span class='error'></span>
      </div>

      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price" required>
        <span class='error'></span>
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" required>
        <span class='error'></span>
      </div>

      <div>
        <label>Estado:</label>
        <!-- Aquí poned un radiobutton para cada estado -->
        <input type="radio" name="status" value="new" required>Nuevo
        <input type="radio" name="status" value="good">Bueno
        <input type="radio" name="status" value="used">Usado
        <input type="radio" name="status" value="bad">Malo
        <input type="radio" name="status" value="digital">Digital
        <span class='error'></span>
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments"></textarea>
      </div>

      <button class="anadir" type="submit">Añadir</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>