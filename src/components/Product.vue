<template>
  <div>
    <v-container>
      <!-- FlexBox Vuetify, setamos as colunas responsivas da linha.-->
      <div class="row">
        <!--  Col média, col pequena, col ultra pequena (xs) - Valor total somado = 12 unidades. -->
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item
              :src="require('../assets/img/home/slider4.jpg')"
            >
            </v-carousel-item>
            <v-carousel-item
              :src="require('../assets/img/home/slider2.jpg')"
            >
            </v-carousel-item>
            <v-carousel-item
              :src="require('../assets/img/home/slider3.jpg')"
            >
            </v-carousel-item>
            <v-carousel-item
              :src="require('../assets/img/home/slider1.jpg')"
            >
            </v-carousel-item>

          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>
          <div class="pl-6">
            <p class="display-1 mb-0">{{ this.product.name }}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3">R${{ this.product.price }} <del style="" class="subtitle-1 font-weight-thin">R$80.00</del></p>
              <v-spacer></v-spacer>
              <v-rating v-model="rating" class="" background-color="warning lighten-3"
                        color="warning" dense></v-rating>
              <span class="body-2	font-weight-thin"> 25 REVIEWS</span>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin"> {{ this.product.description }}</p>
            <p class="title">TAMANHO</p>
            <v-radio-group v-model="row" row>
              <v-radio label="XS" value="XS"></v-radio>
              <v-radio label="S" value="s"></v-radio>
              <v-radio label="M" value="m"></v-radio>
              <v-radio label="L" value="l"></v-radio>
              <v-radio label="XL" value="xl"></v-radio>
            </v-radio-group>
            <p class="title">ITEMS</p>

            <v-text-field
                outlined
                style="width:100px"
                :value="1"
                dense
            ></v-text-field>
            <v-btn class="primary white--text" outlined tile dense><v-icon>mdi-cart</v-icon> ADD AO CARRINHO</v-btn>
            <v-btn class="ml-4" outlined tile>ADD LISTA DE DESEJOS</v-btn>

          </div>
      </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab >Descrição</v-tab>
            <v-tab >Materiais</v-tab>
            <v-tab>REVIEWS</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                {{ this.product.description }}
              </p>
            </v-tab-item>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ultricies mi eget mauris pharetra et. Vel pretium lectus quam id leo in vitae turpis
                massa. Orci dapibus ultrices in iaculis nunc. At auctor urna nunc id cursus metus. Integer feugiat
                scelerisque varius morbi enim nunc. Aliquam sem et tortor consequat id porta nibh venenatis cras.
                Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Malesuada nunc vel risus
                commodo viverra maecenas. Neque volutpat ac tincidunt vitae semper quis.
              </p>
            </v-tab-item>
            <v-tab-item>
              <v-list
                three-line="true"
                avatar="true"
              >
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    inactive="true"
                  >
                    <v-list-item-avatar>
                      <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="item.title"></v-list-item-title><v-rating v-model="rating" class="" background-color="warning lighten-3"
                                                                                           color="warning" dense></v-rating>
                      <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-tab-item>
          </v-tabs>
          <v-card-text
            class="pa-0 pt-4"
            tile
            outlined
          >
            <p class="subtitle-1 font-weight-light pt-3 text-center">RECOMENDADOS</p>
            <v-divider></v-divider>
            <div class="row text-center justify-center">
              <!-- Depois que temos nosso array de produtos recomendados preenchido, conseguimos fazer um loop no html utilizando o v-for para montar os cards dinamicamente.--> 
              <div class="col-md-2 col-sm-4 col-xs-12 text-center" :key="rec.id" v-for="rec in recommended">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                    <v-img
                      class="white--text align-end"
                      height="200px"
                      :src="require('../assets/img/home/deal1.jpg')"
                    >
                      <!-- Mostramos o nome do produto recomendado.--> 
                      <v-card-title>{{ rec.name }} </v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Upto 60% + Extra 10%</div>
                      <!-- Mostramos a descrição do produto recomendado.--> 
                      <div>{{ rec.description }}</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        outlined
                        color="info"
                      >
                        Explore
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>
            </div>
          </v-card-text>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import api from "../services/api.js";
    export default {
        // Antes o DOM ser montado com o componente, populamos nossas váriaveis de produtos e recomendação.
        beforeMount() {
          this.getProduct();
          this.getRecommended();
        },
        props: {
          id: null
        },
        methods: {
          async getProduct () {
            // Chamamos na API na rota /product para buscar nossos produtos.
            let res = await api.get("/products/" + this.$route.params.id);
            if (res.status === 200) {
              this.product = res.data;
            }
            
          },
          // Método responsável para montar o array de produtos recomendados para o usuário.
          async getRecommended () {
            // Pegamos todos os produtos atráves da rota /products
            let res = await api.get("/products");
            // Quando o status for sucesso 
            if (res.status === 200) {
              this.recommended = [];
              // Geramos um array de produtos recomendados excluíndo o produto sendo visualizado.
              res.data.forEach(prod => {
                if (this.$route.params.id !== prod.id) {
                  this.recommended.push(prod);
                }
              });
            }
          }
        },
        data: () => ({
            recommended: [],
            product: {},
            rating:4.5,
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
            item: 5,
            items: [],
        }),
    }
</script>
