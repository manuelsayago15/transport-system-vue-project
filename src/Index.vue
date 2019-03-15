<template>
    <!-- https://router.vuejs.org/guide/#html -->
    <div class="container">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">Transport System</b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
              <b-navbar-nav>
                <b-nav-item tag="b-button" to="/journeys" variant="primary">Trayectos</b-nav-item>
                <b-nav-item tag="b-button" to="/buses" variant="primary">Buses</b-nav-item>
                <b-nav-item tag="b-button" to="/drivers" variant="primary">Choferes</b-nav-item>
                <b-nav-item tag="b-button" to="/seats" variant="primary">Asientos</b-nav-item>
                <b-nav-item tag="b-button" to="/passengers" variant="primary">Pasajeros</b-nav-item>
                <b-nav-item tag="b-button" to="/schedules" variant="primary">Horarios</b-nav-item>
              </b-navbar-nav>

            </b-collapse>
          </b-navbar>
        
        <!--<router-link tag="b-button" to="/drivers" variant="primary">Drivers</router-link>
        <router-link tag="b-button" to="/passengers" variant="primary">Passengers</router-link>
        <router-link tag="b-button" to="/journeys" variant="primary">Journeys</router-link>
        <router-link tag="b-button" to="/buses" variant="primary">Buses</router-link>
        <router-link tag="b-button" to="/seats" variant="primary">Seats</router-link>
        <router-link tag="b-button" to="/schedules" variant="primary">Schedules</router-link>
        <router-link tag="b-button" to="/buses" variant="primary">Buses</router-link>
        <router-link tag="b-button" to="/register-driver" variant="primary">Register driver</router-link>
        <br />-->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data: () => ({
        //
    }),
    components: {
        
    }
};
</script>

<style lang="scss" scoped>
    
</style>
