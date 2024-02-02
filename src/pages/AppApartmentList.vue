<script>
import ApartmentCard from '../components/ApartmentCard.vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
     name: 'AppApartmentList',
     data() {
        return {
            store,
            currentPage: 1,
            lastPage: null,
            loading: true
        }
     },
     components: {
        ApartmentCard
     }, 
     methods: {
        getApartments(gotoPage) {
            this.loading = true;

            let url = `${this.store.baseUrl}/apartments`;
              
            axios.get(url,
               {
                  params: {
                    page: gotoPage
                  }
               }
             )
            .then(response => {
                console.log(response);
                this.store.apartments = response.data.results.data;
                this.currentPage = response.data.results.current_page;
                this.lastPage = response.data.results.last_page;
                this.loading = false;
            })
        },
     },
     mounted() {
        this.getApartments(1);
     }

}

</script>

<template>
    <div v-if="loading == false">
      <ApartmentCard :cards="this.store.apartments"></ApartmentCard>
    
      <nav aria-label="Page navigation example">
        <ul class="pagination ms-5 mt-5">
          <li class="page-item"><button class="page-link" @click="getApartments(currentPage - 1)" :class="{'disabled' : currentPage == 1}">Previous</button></li>
          
          <li class="page-item" v-for="page in lastPage" :class="{'active': page==currentPage}">
            <button @click="getApartments(page)" :class="{'page-link': true}">{{ page }}</button>
          </li>
    
          <li class="page-item"><button class="page-link" @click="getApartments(currentPage + 1)" :class="{'disabled' : currentPage == lastPage}">Next</button></li>
        </ul>
      </nav>
    </div>

    <div class="text-center mt-5" v-else>
      <img src="/loader.gif" alt="caricamento in corso..." />
    </div>

    
</template>

<style>

body {
    background-color: beige;
}
</style>