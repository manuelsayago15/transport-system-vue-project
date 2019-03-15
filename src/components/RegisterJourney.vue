<template>
    <form @submit.prevent="addJourney">
        <h4>Registrar Trayectos</h4>
        <b-form-group id="" label="Ida:" label-for="name">
            <b-form-input id="nombre" type="text" v-model="ida" required placeholder="Origen..." />
        </b-form-group>

        <b-form-group id="" label="Vuelta:" label-for="lastname">
            <b-form-input id="apellido" type="text" v-model="vuelta" required placeholder="Regreso..." />
        </b-form-group>

        <b-form-group id="" label="Terminal:" label-for="terminal">
            <b-form-input id="rut" type="text" v-model="terminal" required placeholder="Terminal" />
        </b-form-group>
    
        <b-button type="submit" variant="success" href="/journeys">Registrar trayecto</b-button>
    </form>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        journeys: [
            {
                ida: '',
                vuelta: '',
                terminal: ''
            }
        ]
    }),
    beforeMount() {
        // Get here the content.
    },
    methods: {
        //
        addJourney: function() {
            var that = this;
            var ida = this.ida;
            var vuelta = this.vuelta;
            var terminal = this.terminal;
            axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/trayecto',{
                user: 'manuel_sayago',
                pass: 'destacamemanuel',
                ida: ida,
                vuelta: vuelta,
                terminal: terminal
            })
            .then(function (response) {
                that.journeys = response.data;
             console.log(response);
            })
            .catch(function (error) {
             console.log(error);
            });
        }
    },
    components: {
        //
    }
};
</script>

<style lang="scss" scoped>
    
</style>