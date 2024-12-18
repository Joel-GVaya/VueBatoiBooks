<script>
import ModulesList from './ModulesList.vue';
import { mapState, mapActions } from 'pinia';
import { store } from '@/stores/store'
export default {
  props: ['id'],

  components: {
    ModulesList,
  },

  data() {
    return {
      book: null,
    };
  },
  computed: {
      ...mapState(store, ['modules'])
  },
  async mounted() {
    await this.fetchModules();

    if (this.id) {
      this.book = await this.fetchBook(this.id);
      if (this.book) {
        this.fillForm(this.book);
      }
    } else {
      document.querySelector('.id-camp').classList.add('id');
    }
  },
  methods: {
    ...mapActions(store, ['addMessage', 'fetchModules', 'fetchBook', 'changeDBBook', 'fetchBooks', 'addDBBook']),
    fillForm(book) {
      document.getElementById('book-id').value = book.id;
      document.getElementById('id-module').value = book.moduleCode;
      document.getElementById('publisher').value = book.publisher;
      document.getElementById('price').value = book.price;
      document.getElementById('pages').value = book.pages;
      document.querySelector(`input[name="status"][value="${book.status}"]`).checked = true;
      document.getElementById('comments').value = book.comments;
    },

    async handleSubmit(event) {
      event.preventDefault();

      const moduleCode = document.getElementById('id-module').value;
      const publisher = document.getElementById('publisher').value;
      const price = parseFloat(document.getElementById('price').value);
      const pages = parseInt(document.getElementById('pages').value, 10);
      const status = document.querySelector('input[name="status"]:checked')?.value;
      const comments = document.getElementById('comments').value;
      if (this.book) {
        const id = document.getElementById('book-id').value;
        const newBook = {
          id: id,
          moduleCode: moduleCode,
          publisher: publisher,
          price: price,
          pages: pages,
          status: status,
          comments: comments
        };
        const result = await this.changeDBBook(newBook)
        this.addMessage('Libro editado correctamente')
      } else {
        const newBook = {
          moduleCode: moduleCode,
          publisher: publisher,
          price: price,
          pages: pages,
          status: status,
          comments: comments
        };

        try {
          const result = await this.addDBBook(newBook);
          this.addMessage('Libro con añadido correctamente')
        } catch (error) {
          this.addMessage(error)
        }
      }
      const form = document.getElementById('bookForm');
      this.$router.push('/')
      form.reset();
      this.fetchBooks()
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

      <div class="id-camp">
        <label for="id">ID:</label>
        <input type="text" id="book-id" :value="book?.id || ''" readonly>

      </div>
      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module" required>
          <option v-if="!id">- Selecciona un módulo -</option>
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