<template>
    <div>
        <h4>Asientos</h4>
        <ul v-for="(seat, id) in seats" :key="id">
            <Seat :seat="seat"></Seat>
        </ul>
        <b-button variant="outline-primary" @click="showRegisterSeatForm = true" v-b-modal.registerSeatModal>
            Asignar Asiento
        </b-button>
        <RegisterSeat v-if="showRegisterSeatForm" :seats.sync="seats"></RegisterSeat>
    </div>
</template>

<script>
import Seat from './Seat.vue';
import RegisterSeat from './RegisterSeat.vue';
import axios from 'axios';
export default {
    props: {
        seats: Array
    },
    data: () => ({
        showRegisterSeatForm: false
    }),
    mounted() {
        // Get here the content.
        var that =  this;
        axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/asiento/all',{
            user: 'manuel_sayago',
            pass: 'destacamemanuel'
        })
        .then(function (response) {
            that.$props.seats = response.data;
         console.log(response);
        })
        .catch(function (error) {
         console.log(error);
        });
        // TEMP. Just for testing in development mode.
        this.$props.seats = [
            {
                num_asiento: 1,
                id_bus: 2,
                id_pasajero: 3
            }
        ];
    },
    methods: {
        //
    },
    components: {
        Seat,
        RegisterSeat
    }
};
</script>

<style lang="scss" scoped>
    
</style>