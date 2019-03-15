<template>
    <div>
        <h4>Buses</h4>
        <ul v-for="(bus, id) in buses" :key="id">
            <Bus :drivers="drivers" :bus="bus"></Bus>
        </ul>
        <b-button variant="outline-primary" @click="showRegisterBusForm = true" v-b-modal.registerBusModal>Agregar Bus</b-button>
        <RegisterBus v-if="showRegisterBusForm" :drivers="drivers" :buses.sync="buses"></RegisterBus>
    </div>
</template>

<script>
import Bus from './Bus.vue';
import RegisterBus from './RegisterBus.vue';

import axios from 'axios';
export default {
    props: {
        drivers: Array,
        buses: Array
    },
    data: () => ({
        showRegisterBusForm: false
    }),
    mounted() {
        // Get here the content.
        
        // TEMP. Just for testing in development mode.
        this.$props.drivers = [
            {
                nombre: '',
                apellido: '',
                rut: ''
            }
        ];

        var that =  this;
        axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/chofer/all',{
            user: 'manuel_sayago',
            pass: 'destacamemanuel'
        })
        .then(function (response) {
            that.$props.drivers = response.data;
         console.log(response);
        })
        .catch(function (error) {
         console.log(error);
        });

        this.$props.buses = [
            {
                patente: '',
                marca: '',
                id_chofer: -1
            }
        ];

        axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/bus/all',{
            user: 'manuel_sayago',
            pass: 'destacamemanuel'
        })
        .then(function (response) {
            that.$props.buses = response.data;
         console.log(response);
        })
        .catch(function (error) {
         console.log(error);
        });
    },
    methods: {
        //
    },
    components: {
        Bus,
        RegisterBus
    }
};
</script>

<style lang="scss" scoped>
    
</style>