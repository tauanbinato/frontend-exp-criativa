<template>
  <v-container class="column justify-center align-center">
    <p class="display-1 font-weight-light text-center pa-4">Admin Page</p>
    <div class="row">
      <div class="col-md-12 col-sm-4 col-xs-12">
        <v-card class="mx-auto" max-width="1200" outlined tile>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :search="search"
            :loading="isLoadingData"
            loading-text="Carregando dados.."
            height="500"
            :headers="headers"
            :items="data"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Produtos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Add Item
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
 
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.price"
                              label="Price"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.description"
                              label="Description"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
 
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                      </v-btn>
                      <!-- Método save/edit -->
                      <v-btn color="blue darken-1" text @click="save">
                        Salvar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Você tem certeza que deseja deletar esse
                      item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <!-- Metodo editItem é chamado ao clicar no icone do lápis -->
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <!-- Metodo deleteItem é chamado ao clicar no icone da lixeira -->
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> recarregar </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
  </v-container>
</template>
<script>
import api from "../services/api.js";
export default {
  data: () => ({
    search: '',
    isLoadingData: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ID", value: "id" },
      { text: "Nome", value: "name" },
      { text: "Preço", value: "price" },
      { text: "Descrição", value: "description" },
      { text: "Criado Em", value: "createdAt" },
      { text: "Modificado Em", value: "updatedAt", sortable: true },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    data: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      price: null,
      description: "",
    },
    defaultItem: {
      name: "",
      price: null,
      description: "",
    },
  }),
 
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Produto" : "Editar Produto";
    },
  },
 
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
 
  beforeMount() {
    this.initialize();
  },
 
  methods: {
    async initialize() {
      // Váriavel onde armazenamos os produtos.
      this.data = [];
      this.isLoadingData = true;
      // Chamamos na API na rota /product para buscar nossos produtos.
      let res = await api.get("/products");
      // Ao termos resposta positiva armazenamos na variavel data a resposta do servidor.
      if (res.status === 200) {
        this.data = res.data;
      }
      this.isLoadingData = false;
    },
 
    editItem(item) {
      // Pegamos o index do item a ser editado do nosso array de dados.
      this.editedIndex = this.data.indexOf(item);
      // Criamos um novo objeto via cópia desse item a ser editado.
      this.editedItem = Object.assign({}, item);
      // Abre o dialog front-end de edição.
      this.dialog = true;
    },
 
    deleteItem(item) {
      // Pegamos o index do item a ser editado do nosso array de dados. 
      this.editedIndex = this.data.indexOf(item);
      // Criamos um novo objeto via cópia desse item a ser editado.
      this.editedItem = Object.assign({}, item);
      // Abre o dialog (pop up) de deletar.
      this.dialogDelete = true;
    },
 
    // Ao clicar OK no delete item.
    async deleteItemConfirm() {
      // Mandamos para a API o id do produto que vamos deletar  ex: /products/2 
      let res = await api.delete("/products/" + this.editedItem.id);
        if (res.status === 200) {
          // Reload na tabela
          this.initialize();
        }
      this.closeDelete();
    },
 
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
 
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
 
    async save() {
      this.isLoadingData = true;
      // Edit Product Mode
      if (this.editedIndex > -1) {
        // rota ex: /products/2 => body (name, price, description )
        let res = await api.post("/products/" + this.editedItem.id, JSON.stringify(this.editedItem));
        // Se tudo ocorrer bem damos reload nos dados chamando o método initialize();
        if (res.status === 200) {
          this.initialize();
        }
      }
      // Add Product Mode
      else {
        // Convertemos um obj em JSON para enviar na rota /products no backend, aguardamos resposta status 200.
        let res = await api.post("/products", JSON.stringify(this.editedItem));
        if (res.status === 200) {
          // Recarrega os produtos.
          this.initialize();
        }
      }
      this.isLoadingData = false;
      this.close();
    },
  },
};
</script>