<template>
    <div>
        <li>Patente: {{ bus.patente }}</li>
        <li>Marca: {{ bus.marca }}</li>
        <li>ID Chofer: {{ bus.id_chofer }}</li>
        <b-button variant="primary" @click="showEditBusForm = true" v-b-modal.editBusModal>Editar Bus</b-button>
        <b-button variant="danger">Borrar Bus</b-button>
        <hr />
        <EditBus v-if="showEditBusForm" :show.sync="showEditBusForm" :drivers="drivers" :bus.sync="bus"></EditBus>
    </div>
</template>

<script>
import RegisterBus from './RegisterBus.vue';
import EditBus from './EditBus.vue';

export default {
    props: {
        drivers: Array,
        bus: Object
    },
    data: () => ({
        showEditBusForm: false
    }),
    mounted() {
        // Get here the content.
    },
    methods: {
        //
    },
    components: {
        RegisterBus,
        EditBus
    }
};
</script>

<style lang="scss" scoped>
    
</style>