<template>
  <div class="verbal-counting">
    <h1 class="text-h1 text-center">Устный счет</h1>
    <router-view/>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LayoutDefault',

  components: {
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
