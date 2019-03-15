<template>
    <div>
        <h4>Choferes</h4>
        <ul v-for="(driver, id) in drivers" :key="id">
            <Driver :driver="driver"></Driver>
        </ul>
        <b-button variant="outline-primary" @click="showRegisterDriverForm = true" v-b-modal.registerDriverModal>
            Agregar Chofer
        </b-button>
        <RegisterDriver v-if="showRegisterDriverForm" :drivers="drivers"></RegisterDriver>
    </div>
</template>

<script>
import Driver from './Driver.vue';
import RegisterDriver from './RegisterDriver.vue';
import axios from 'axios';
export default {
    props: {
        drivers: Array
    },
    data: () => ({
        showRegisterDriverForm: false
    }),
    mounted() {
        // Get here the content.
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
        // TEMP. Just for testing in development mode.
        this.$props.drivers = [
            {
                nombre: '',
                apellido: '',
                rut: ''
            },
        ];
    },
    methods: {
        //
    },
    components: {
        Driver,
        RegisterDriver
    }
};
</script>

<style lang="scss" scoped>
    
</style>