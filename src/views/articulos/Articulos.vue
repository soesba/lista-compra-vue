<template>
  <TitleView :titulo="titulo" />
  <SearchBox @search="onSearch"></SearchBox>
  <CardList :items="list" :class="getClasses" :mapping="mapping" :sort-by="sortBy" />
</template>

<script lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import get from '@/services/articulo/getArticulo.service';
  import searchArticulo from '@/services/articulo/searchArticulo.service';
  import create from '@/services/articulo/createArticulo.service';
  import update from '@/services/articulo/updateArticulo.service';
  import { eventStore } from '@/main';
  import type ArticuloRequest from '@/services/articulo/models/ArticuloRequest';
  import type ArticuloResponse from '@/services/articulo/models/ArticuloResponse';
  import { sort } from '@/utils/utils';
  import router from '@/router';

</script>

<script setup lang="ts">
  const emit = defineEmits(['close-dialog']);

  eventStore.$onAction(({ args, name }) => {
    switch (name) {
      case 'addCard':
        onAddCard();
        break;
      case 'saveCard':
        onSaveCard(args[0]);
        break;
    }
  });
  // Data
  let cardClass = ref();
  const titulo = ref('Articulos');
  const list = ref();
  const sortBy = ref({ field: 'nombre', order: 'ASC' });
  const mapping = {
    id: 'id',
    title: 'nombre',
    subtitle: 'descripcion',
    text: (item: any) =>
      // item.tienePrecios ? 'Se han introducido precios' : 'No se han introducido precios',
      item.tienePrecios ? '<i class="mdi mdi-currency-eur"></i>' : '<div>&nbsp</div>',
  };
  const routes = {
    detail: '/articulo-detalle',
    edit: '/articulo-edicion',
    add: '/articulo-edicion',
    list: '/articulos',
  };
  eventStore.setRoutes(routes);
  // Computed
  const getClasses = computed(() => {
    return cardClass.value ? cardClass.value.join(' ') : '';
  });

  onMounted(() => {
    getAllData();
  });

  // Methods

  const onAddCard = () => {
    router.push(routes.add);
  };

  const getAllData = () => {
    get().then((response: ArticuloResponse) => {
      const order = sortBy.value.order === 'ASC' ? '' : '-';
      list.value = (response.data as []).sort(sort(`${order}${sortBy.value.field}`));
    });
  };

  const onSaveCard = (cardData: any) => {
    if (cardData.adding) {
      createCard(cardData.data);
    } else {
      updateCard(cardData.data);
    }
  };

  const createCard = (card: ArticuloRequest) => {
    card.borrable = true;
    create(card).then(response => {
      if (response.respuesta === 200) {
        getAllData();
      }
    });
  };

  const updateCard = (card: ArticuloRequest) => {
    update(card).then(response => {
      if (response.respuesta === 200) {
        getAllData();
      }
    });
  };

  const onSearch = (evt: any) => {
    if (evt) {
      searchArticulo(evt).then((response: ArticuloResponse) => {
        list.value = response.data;
      });
    } else {
      getAllData();
    }
  };
</script>
