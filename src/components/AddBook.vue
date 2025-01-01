<script>
import ModulesList from './ModulesList.vue';
import { mapState, mapActions } from 'pinia';
import { store } from '@/stores/store';
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
  props: ['id'],

  components: {
    ModulesList,
    Form,
    Field,
    ErrorMessage,
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

    validateLength(value) {
      if (value <= 0) {
        return "El valor debe ser mayor que 0"
      }
      return true
    },

    validateComment(value) {
      if (value) {
        if (value.length > 50) {
          return 'El comentario no puede exceder los 500 caracteres';
        }
      }
      return true;

    },

    validateEditorial(value) {
      if (!/^[a-zA-ZÀ-ÿ\s]{2,20}$/.test(value)) {
        return 'La editorial solo puede contener letras, mínimo 2 y máximo 20 caracteres';
      }
      return true;
    },

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
    },

    vaciarFormulario(book) {
      document.querySelector('.id-camp').classList.add('id');
      document.getElementById('book-id').value = '';
      document.getElementById('id-module').value = '';
      document.getElementById('publisher').value = '';
      document.getElementById('price').value = '';
      document.getElementById('pages').value = '';
      document.querySelector(`input[name="status"][value="${book.status}"]`).checked = false;
      document.getElementById('comments').value = '';

    }
  },

  watch: {
    '$route'(to, from) {
      if (to.path === '/create') {
        this.vaciarFormulario(this.book);
      }
    }
  }

};
</script>

<template>
  <div id="form">
    <Form id="bookForm" @submit="handleSubmit">
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
        <label>Editorial</label>
        <Field name="publisher" id="publisher" type="text" :rules="validateEditorial"></Field>
        <ErrorMessage name="publisher" />
      </div>

      <div>
        <label>Precio:</label>
        <Field name="price" id="price" type="number" :rules="validateLength" />
        <ErrorMessage name="price" />
      </div>

      <div>
        <label>Páginas:</label>
        <Field name="pages" id="pages" type="number" :rules="validateLength" />
        <ErrorMessage name="pages" />
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
        <label>Comentarios:</label>
        <Field name="comments" id="comments" type="text" :rules="validateComment" />
        <ErrorMessage name="comments" />
      </div>

      <button>Enviar</button>
    </Form>
  </div>
</template>