<template>
    <div>
        <li>Nombre: {{ driver.nombre }}</li>
        <li>Apellido: {{ driver.apellido }}</li>
        <li>Rut: {{ driver.rut }}</li>
        <b-button variant="primary" @click="showEditDriverForm = true" v-b-modal.editDriverModal>
            Editar Chofer
        </b-button>
        <b-button variant="danger">Borrar Chofer</b-button>
        <hr />
        <EditDriver v-if="showEditDriverForm" :show.sync="showEditDriverForm" :driver.sync="driver"></EditDriver>
    </div>

</template>

<script>
// import axios from 'axios';
import EditDriver from './EditDriver.vue';
import axios from 'axios';
export default {
    props: {
        driver: Object
    },
    data: () => ({
        showEditDriverForm: false
    }),
    beforeMount() {
        // Get here the content.
    },
    methods: {
        //
    },
    components: {
        EditDriver
    }
};
</script>

<style lang="scss" scoped>
    
</style>