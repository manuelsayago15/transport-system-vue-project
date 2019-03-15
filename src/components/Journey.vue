<template>
    <div>
        <h4>Trayectos</h4>
        <ul v-for="journey in journeys" :key="journey.id">
            <li>Ida: {{ journey.ida }}</li>
            <li>Vuelta: {{ journey.vuelta }}</li>
            <li>Terminal: {{ journey.terminal }}</li>
            <hr />
        </ul>
        <b-button variant="outline-primary" href="/register-journey">Agregar trayecto</b-button>
    </div>
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
        var that =  this;
        axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/trayecto/all',{
            user: 'manuel_sayago',
            pass: 'destacamemanuel'
        })
        .then(function (response) {
            that.journeys = response.data;
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
        //
    }
};
</script>

<style lang="scss" scoped>
    
</style>