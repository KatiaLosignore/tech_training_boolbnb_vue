<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: 'SingleApartment',

    data() {
        return {
            store,
            apartment: null
        }
    },
    methods: {
        getApartment() {
            const slug = this.$route.params.slug;

            let url = `${this.store.baseUrl}/apartment/${slug}`;
              
            axios.get(url)
            .then(response => {
                console.log(response); 
                if (response.data.success == true) {
                    this.apartment = response.data.apartment;
                } else {
                    this.$router.push({name: 'not-found'});
                }
            })
        },
        getImageUrl(path) {
            if (path.startsWith("http")) {
                return path; // Restituisce l'URL direttamente se inizia con "http"
            } else {
                return `${this.store.baseUrlNoApi}/storage/${path}`;
            }
        },
    },
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                this.getApartment();
            }
        )
    },
    mounted() {
        this.getApartment();
    }
}

</script>


<template>
    <div class="container">
        <div class="row py-5">
            <div class="col-12">
                <div class="card rounded-5 bg-light">
                    
                    <div class="card-body text-center card-single" v-if="apartment">
                        <img v-if="apartment.photo" :src="getImageUrl(apartment.photo)" :alt="apartment.name" class="img-single">
                        <img v-else-if="apartment.photo" :src="apartment.photo" class="card-img-top img-single">
                        <img v-else src="https://cdn.icon-icons.com/icons2/1462/PNG/512/120nophoto_100007.png" class="card-img-detail"/>
                        <div class="card-body blogs">
                            <h5 class="card-title"><b>Name: </b>{{apartment.name}}</h5>
                            <h5 class="card-title"><b>Address:</b> {{apartment.address}}</h5>
                            <h5 class="card-title"><b>Rooms:</b> {{apartment.rooms}}</h5>
                            <h5 class="card-title"><b>Bathrooms:</b> {{apartment.bathrooms}}</h5>
                            <h5 class="card-title"><b>Beds:</b> {{apartment.beds}}</h5>
                            <h5 class="card-title"><b>Mq:</b> {{apartment.mq}}</h5>
                            <div class="mb-5 fw-bold fs-5"> Services:  
                                <span v-for="service in apartment.services" class="badge rounded-pill text-bg-secondary me-2 py-2">{{ service.name }}</span>
                            </div>
                                
                            <router-link :to="{name: 'apartment_list'}" class="btn btn-outline-secondary fw-bold">
                                Back
                            </router-link>
                        </div>
                    </div>
                    <div class="text-center mt-2" v-else>
                        <img src="/loader.gif" alt="Caricamento in corso"/>
                    </div>

                </div>

            </div>
        </div>

    </div>
</template>
