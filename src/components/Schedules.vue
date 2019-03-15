<template>
    <div>
        <h4>Horarios</h4>
        <ul v-for="(schedule, id) in schedules" :key="id">
            <Schedule :schedule="schedule"></Schedule>
        </ul>
        <b-button variant="outline-primary" @click="showRegisterScheduleForm = true" v-b-modal.registerScheduleModal>
            Agregar Horario
        </b-button>
        <RegisterSchedule v-if="showRegisterScheduleForm" :schedules.sync="schedules"></RegisterSchedule>
    </div>
</template>

<script>
import Schedule from './Schedule.vue';
import RegisterSchedule from './RegisterSchedule.vue';
import axios from 'axios';
export default {
    props: {
        schedules: Array
    },
    data: () => ({
        showRegisterScheduleForm: false
    }),
    mounted() {
        // Get here the content.
        var that =  this;
        axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/horario/all',{
            user: 'manuel_sayago',
            pass: 'destacamemanuel'
        })
        .then(function (response) {
            that.$props.schedules = response.data;
         console.log(response);
        })
        .catch(function (error) {
         console.log(error);
        });
        // TEMP. Just for testing in development mode.
        this.$props.schedules = [
            {
                fecha: '',
                hora: '',
                id_trayecto: 1,
                id_bus: 2
            }
        ];
    },
    methods: {
        //
    },
    components: {
        Schedule,
        RegisterSchedule
    }
};
</script>

<style lang="scss" scoped>
    
</style>