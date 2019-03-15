import Vue from 'vue';
import Index from './Index.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';

// Components.
import ViewNotFound from './components/ViewNotFound.vue';
import Drivers from './components/Drivers.vue';
import Passengers from './components/Passengers.vue';
import Seats from './components/Seats.vue';
import Journey from './components/Journey.vue';
import Schedules from './components/Schedules.vue';
import Buses from './components/Buses.vue';
import RegisterDriver from './components/RegisterDriver.vue';
import RegisterJourney from './components/RegisterJourney.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue);

// Bootstrap Styles.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Icons for DateTimePicker (Font Awesome Icons).
import '@fortawesome/fontawesome-free/css/all.css';
jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
    icons: {
        time: 'far fa-clock',
        date: 'far fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'fas fa-calendar-check',
        clear: 'far fa-trash-alt',
        close: 'far fa-times-circle'
    }
});

// Vuex Store.
const store = new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    mutations: {
        changeIsLoggedInState(state) {
            state.isLoggedIn = !state.isLoggedIn;
        }
    }
});

// Vue Router routes.
const routes = [
    { path: '*', component: ViewNotFound },
    { path: '/drivers', component: Drivers },
    { path: '/passengers', component: Passengers },
    { path: '/seats', component: Seats },
    { path: '/schedules', component: Schedules },
    { path: '/buses', component: Buses },
    { path: '/journeys', component: Journey },
    { path: '/register-driver', component: RegisterDriver },
    { path: '/register-journey', component: RegisterJourney }
];

// 3. Create the router instance and pass the `routes` option.
// Create Vue Router instance and pass the routes.
const router = new VueRouter({
    mode: 'history',
    routes
});

// Create the Vue instance.
new Vue({
    el: '#app',
    store,
    render: h => h(Index),
    router
});