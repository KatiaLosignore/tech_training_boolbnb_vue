<script>
 import { store } from '../store.js';

 export default {
    name: 'ApartmentCard',

    data() {
        return {
            store
        }
    },
    props: {
        cards: Array
    },
    methods: {
        getImageUrl(path) {
            if (path.startsWith("http")) {
                return path; // Restituisce l'URL direttamente se inizia con "http"
            } else {
                return `${this.store.baseUrlNoApi}/storage/${path}`;
            }
        }
    }
 };



</script>

<template>
    <h1 class="text-secondary fw-bold text-center text-list my-5">BoolBnb</h1>
    <div class="container">
        <div class="row">
            <div class="col-4" v-for="apartment in cards">
                <div class="card mt-5 text-center">
                    <img v-if="apartment.photo" :src="getImageUrl(apartment.photo)" alt="">
                    <img v-else-if="apartment.photo" :src="apartment.photo" class="card-img-top">
                    <img v-else src="https://cdn.icon-icons.com/icons2/1462/PNG/512/120nophoto_100007.png" class="card-img-top"/>
                    <div class="card-body blogs">
                        <h5 class="card-title"><b>Name: </b>{{apartment.name}}</h5>
                        <h5 class="card-title"><b>Address:</b> {{apartment.address}}</h5>
                        <h5 class="card-title"><b>Rooms:</b> {{apartment.rooms}}</h5>
                        <h5 class="card-title"><b>Bathrooms:</b> {{apartment.bathrooms}}</h5>
                        <h5 class="card-title"><b>Beds:</b> {{apartment.beds}}</h5>
                        <h5 class="card-title"><b>Mq:</b> {{apartment.mq}}</h5>
                        <div class="mb-5 fw-bold fs-5"> Services:
                            <span v-for="service in apartment.services" class="badge rounded-pill text-bg-secondary me-2 py-2"> {{ service.name }}</span>
                        </div>
                    
                        <router-link :to="{name: 'single-apartment', params: {slug: apartment.id}}" class="btn btn-outline-secondary btn-list fw-bold">
                            Detail 
                        </router-link>
                              
                    </div>
                </div>
            </div>                   
        </div>
    </div>
</template>

<style>
 .text-list{
    font-size: 70px;
 }
</style>