<script >
  import { store } from './store';

  export default {
    components: {

    },
    data() {
      return {
        store
      }
    }
  }
</script>

<template>
 
    <router-view></router-view>
  
</template>

<style lang="scss" scoped>
@import './styles/general.scss';

</style>
