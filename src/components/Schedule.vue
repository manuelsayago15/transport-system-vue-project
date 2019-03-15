<template>
    <div>
        <li>Fecha: {{ schedule.fecha }}</li>
        <li>Hora: {{ schedule.hora }}</li>
        <li>ID Trayecto: {{ schedule.id_trayecto }}</li>
        <li>ID Bus: {{ schedule.id_bus }}</li>
        <b-button variant="primary" @click="showEditScheduleForm = true" v-b-modal.editScheduleModal>
            Editar Horario
        </b-button>
        <b-button variant="danger">Borrar Horario</b-button>
        <hr />
        <EditSchedule v-if="showEditScheduleForm" :show.sync="showEditScheduleForm" :schedule.sync="schedule"></EditSchedule>
    </div>
</template>

<script>
import EditSchedule from './EditSchedule.vue';

export default {
    props: {
        schedule: Object
    },
    data: () => ({
        showEditScheduleForm: false
    }),
    mounted() {
        // Get here the content.
    },
    methods: {
        //
    },
    components: {
        EditSchedule
    }
};
</script>

<style lang="scss" scoped>
    
</style>