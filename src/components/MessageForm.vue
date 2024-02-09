<script>
import { store } from '../store.js';
import axios from 'axios';
import { DateTime } from 'luxon';

export default {
    name: 'MessageForm',
    props: ['apartment'],
    data() {
        return {
            store,
            name: '',
            lastname: '',
            email: '',
            text: '',
            currentDate: DateTime.now(),
            success: false,
            sending: false,
            errors: {
            }

        };
    },
    methods: {
        sendForm() {
            this.success = false;
            this.sending = true;
            this.errors = {};

            const payload = {
                name: this.name,
                lastname: this.lastname,
                email: this.email,
                text: this.text,
                created_at: this.currentDate.toFormat('dd/MM/yyyy'),
                apartment_id: this.apartment.id,
            };

            axios
                .post(`${this.store.baseUrl}/messages`, payload)
                .then(response => {
                    console.log(payload);
                    if (response.data.success) {
                        // Reset the form
                        this.name = '';
                        this.lastname = '';
                        this.email = '';
                        this.text = '';
                        this.showAlert();
                    } else {
                        this.errors = response.data.errors;
                        console.log(this.errors);
                    }

                    this.sending = false;
                })
                .catch(error => {
                    this.sending = false;
                    console.error('Error sending message:', error);
                });
        },
           showAlert() {
            this.success = true;

            // Nascondo il messaggio dopo 7 secondi
            setTimeout(() => {
                this.success = false;
            }, 7000);
        },
    }
}

</script>


<template>
    <h3 class="mt-5 mb-5 text-center text-secondary fw-bold">Contact me</h3>
    <div v-if="success" class="alert alert-success" id="successMessage" role="alert">
        Thank you for contacting me, I will reply within 48 working hours!
    </div>

    <form @submit.prevent="sendForm()">

        <div class="mb-3">
            <label for="email" class="form-label text-secondary fw-bold">Email:*</label>
            <input type="email" class="form-control " :class="{ 'is-invalid': errors.email }" id="email" v-model="email">
            <div class="invalid-feedback" v-for="  error   in   errors.email  ">
                {{ error }}
            </div>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label text-secondary fw-bold">Name</label>
            <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" id="name" v-model="name">
            <div class="invalid-feedback" v-for="  error   in   errors.name  ">
                {{ error }}
            </div>
        </div>
        <div class="mb-3">
            <label for="lastname" class="form-label text-secondary fw-bold">Surname</label>
            <input type="text" class="form-control" :class="{ 'is-invalid': errors.lastname }" id="lastname"
                v-model="lastname">
            <div class="invalid-feedback" v-for="  error   in   errors.lastname  ">
                {{ error }}
            </div>
        </div>
        <div class="mb-3">
            <label for="text" class="text-secondary fw-bold">Your Message *</label>
            <textarea class="form-control" :class="{ 'is-invalid': errors.text }" id="text"
                v-model="text"></textarea>
            <div class="invalid-feedback" v-for="  error   in   errors.text  ">
                {{ error }}
            </div>
        </div>
        <button type="submit" class="btn btn-secondary fw-bold" :disabled="email && text ? false : true">
            {{ sending ? 'Sending...' : 'Message sent' }}
        </button>
    </form>
    <p class="mt-2">* required fields</p>

    
</template>