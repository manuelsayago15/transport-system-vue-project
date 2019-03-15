<template>
    <div>
        <li>Nombre: {{ passenger.nombre }}</li>
        <li>Apellido: {{ passenger.apellido }}</li>
        <li>Ruta: {{ passenger.rut }}</li>
        <b-button variant="primary" @click="showEditPassengerForm = true" v-b-modal.editPassengerModal>Editar Pasajero</b-button>
        <b-button variant="danger">Borrrar Pasajero</b-button>
        <hr />
        <EditPassenger v-if="showEditPassengerForm" :show.sync="showEditPassengerForm" 
        :passenger.sync="passenger"></EditPassenger>
    </div>
</template>

<script>
import EditPassenger from './EditPassenger.vue';

export default {
    props: {
        passenger: Object
    },
    data: () => ({
        showEditPassengerForm: false
    }),
    mounted() {
        // Get here the content.
    },
    methods: {
        //
    },
    components: {
        EditPassenger
    }
};
</script>

<style lang="scss" scoped>
    
</style>