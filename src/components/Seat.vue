<template>
    <div>
        <li>Número de Asiento: {{ seat.num_asiento }}</li>
        <li>ID Bus: {{ seat.id_bus }}</li>
        <li>ID Pasajero: {{ seat.id_pasajero }}</li>
        <b-button variant="primary" @click="showEditSeatForm = true" v-b-modal.editSeatModal>Editar Asiento</b-button>
        <b-button variant="danger">Borrar Asiento</b-button>
        <hr />
        <EditSeat v-if="showEditSeatForm" :show.sync="showEditSeatForm" :seat.sync="seat"></EditSeat>
    </div>
</template>

<script>
import EditSeat from './EditSeat.vue';

export default {
    props: {
        seat: Object
    },
    data: () => ({
        showEditSeatForm: false
    }),
    mounted() {
        // Get here the content.
    },
    methods: {
        //
    },
    components: {
        EditSeat
    }
};
</script>

<style lang="scss" scoped>
    
</style>