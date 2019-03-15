<template>
    <div>
        <h4>Pasajeros</h4>
        <ul v-for="(passenger, id) in passengers" :key="id">
            <Passenger :passenger="passenger"></Passenger>
        </ul>
        <b-button variant="outline-primary" @click="showRegisterPassengerForm = true" v-b-modal.registerPassengerModal>
            Agregar Pasajero
        </b-button>
        <RegisterPassenger v-if="showRegisterPassengerForm" :drivers="drivers" :passengers.sync="passengers"></RegisterPassenger>
    </div>
</template>

<script>
import Passenger from './Passenger.vue';
import RegisterPassenger from './RegisterPassenger.vue';
import axios from 'axios';
export default {
    props: {
        passengers: Array
    },
    data: () => ({
        showRegisterPassengerForm: false
    }),
    mounted() {
        // Get here the content.
        var that =  this;
        axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/pasajero/all',{
            user: 'manuel_sayago',
            pass: 'destacamemanuel'
        })
        .then(function (response) {
            that.$props.passengers = response.data;
         console.log(response);
        })
        .catch(function (error) {
         console.log(error);
        });
        // TEMP. Just for testing in development mode.
        this.$props.passengers = [
            {
                nombre: '',
                apellido: '',
                rut: ''
            }
        ];
    },
    methods: {
        //
    },
    components: {
        Passenger,
        RegisterPassenger
    }
};
</script>

<style lang="scss" scoped>
    
</style>