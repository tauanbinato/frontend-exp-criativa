<template>
  <div>
    <v-container>
      <div class="row">
        <div
         class="col-md-3 col-sm-3 col-xs-12"
        >
          <v-card outlined>
            <v-card-title>Filtros</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview :items="items" :open="[1]" :active="[5]" :selected-color="'#fff'" activatable open-on-click dense></v-treeview>
            </template>
            <v-divider></v-divider>
            <v-card-title>Price</v-card-title>
            <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(range, 0, $event)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">ATÉ</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(range, 1, $event)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Estrelas</v-card-title>
            <v-container class="pt-0"  fluid>
              <v-checkbox append-icon="mdi-star" label="4 & above" hide-details dense></v-checkbox>
              <v-checkbox append-icon="mdi-star" label="3 & above" hide-details dense></v-checkbox>
              <v-checkbox append-icon="mdi-star" label="2 & above" hide-details dense></v-checkbox>
              <v-checkbox append-icon="mdi-star" label="1 & above" hide-details dense></v-checkbox>
            </v-container>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Tamanho</v-card-title>
            <v-container class="pt-0" fluid>
              <v-checkbox  label="XS" hide-details dense></v-checkbox>
              <v-checkbox  label="S" hide-details dense></v-checkbox>
              <v-checkbox  label="M" hide-details dense></v-checkbox>
              <v-checkbox  label="L" hide-details dense></v-checkbox>
              <v-checkbox  label="XL" hide-details dense></v-checkbox>
              <v-checkbox  label="XXL" hide-details dense></v-checkbox>
              <v-checkbox  label="XXXL" hide-details dense></v-checkbox>
            </v-container>

          </v-card>
        </div>
        <div
          class="col-md-9 col-sm-9 col-xs-12"
        >

          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Mostrando 1-12 of 200 produtos</small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select class="pa-0" v-model="select" :items="options" style="margin-bottom: -20px;" outlined dense></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <div class="row text-center">
            <!-- Componente Card, fazemos um for loop imbutido no html para listar todos os produtos -->
            <!-- Classes para lidar com o FlexBox do Vuetify e sua responsividade. -->
            <div class="col-md-3 col-sm-6 col-xs-12" :key="pro.id" v-for="pro in products">
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16/9"
                    height="200px"
                    :src="pro.src"
                  >
                    <v-card-title>{{pro.type}} </v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <!-- Botão que aparece ao dar hover sobre um produto na lista. Ao clicar adicionamos na pilha do router os dados do produto. -->
                        <v-btn v-if="hover" @click="$router.push({
                          name: 'Product',
                          params: {
                            id: pro.id
                          }
                          })" class="" outlined>VIEW
                        </v-btn>
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div>{{pro.name}}</div>
                    <div>R$ {{pro.price}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <div class="text-center mt-12">
            <v-pagination
              v-model="page"
              :length="6"
            ></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .8;
    position: absolute;
    width: 100%;
  }
</style>
<script>
    import api from '../services/api.js';
    export default {
        // Antes terminar de montar o DOM nós buscamos os produtos na API para popular nossa lista.
        beforeMount() {
          this.populateList();
        },
        methods: {
          // Trazemos os produtos da API através da rota /products adicionamos uma imagem estática a cada produto
          populateList() {
            api.get('/products').then(res => {
            // Se tudo ocorrer com sucesso status = 200 continuamos.
            if (res.status === 200) {
              // Pegamos uma imagem static no nosso local.
              let src=require('../assets/img/home/slider3.jpg');
              // Armazenamos no nosso array de produtos os dados do servidor.
              this.products = res.data;
              // Atribuímos uma imagem estática.
              this.products.forEach(prod => {
                prod.src = src;
              });
            }
            // Printamos caso ocorra um problema.
          }).catch(err => {
            console.log(err);
          });
          }
        },
        data: () => ({
            // Nosso array onde guardamos os produtos da lista.
            products:[],
            range: [0, 10000],
            select:'Popularidade',
            options: [
                'Default',
                'Popularidade',
                'Relevancia',
                'Preço: baixo para alto',
                'Preço: alto para baixo',
            ],
            page:1,
            breadcrums: [
                {
                    text: 'Home',
                    disabled: false,
                    href: 'breadcrumbs_home',
                },
                {
                    text: 'Roupas',
                    disabled: false,
                    href: 'breadcrumbs_clothing',
                },
                {
                    text: 'Camisetas',
                    disabled: true,
                    href: 'breadcrumbs_shirts',
                },
            ],
            min:0,
            max:10000,
            items: [
                {
                    id: 2,
                    name: 'Tênis',
                    children: [
                        { id: 2, name: 'Casuais' },
                        { id: 3, name: 'Formais' },
                    ],
                },
                {
                    id: 1,
                    name: 'Roupas',
                    children: [
                        { id: 5, name: 'Camisetas' },
                        { id: 6, name: 'Tops' },
                        { id: 7, name: 'Tunicas' },
                        { id: 8, name: 'Roupa de Banho' },
                    ],
                }
            ]
        }),
    }
</script>
