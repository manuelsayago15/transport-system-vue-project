<template>
    <div>
        <b-modal id="registerScheduleModal" ref="modal" centered title="Registrar Horario">
            <b-form>
                <b-form-group id="dateInputGroup" label="Fecha:" label-for="date" 
                :class="validateField(form.fecha, /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/) ? 'was-validated' : ''">
                    <date-picker id="date" v-model="form.fecha" :config="dateOptions"></date-picker>
                    <b-form-invalid-feedback 
                    :state="validateField(form.fecha, /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/)">
                        Por favor, revisa la fecha.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback 
                    :state="validateField(form.fecha, /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/)">
                        ¡Excelente!
                    </b-form-valid-feedback>
                </b-form-group>
                <b-form-group id="hourInputGroup" label="Hora:" label-for="hour"
                :class="validateField(form.hora, /^[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$/) ? 'was-validated' : ''">
                    <date-picker id="hour" v-model="form.hora" :config="hourOptions"></date-picker>
                    <b-form-invalid-feedback 
                    :state="validateField(form.hora, /^[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$/)">
                        Por favor, revisa la hora.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback 
                    :state="validateField(form.hora, /^[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$/)">
                        ¡Excelente!
                    </b-form-valid-feedback>
                </b-form-group>
                <b-form-group id="journeyIDInputGroup" label="ID Trayecto:" label-for="journeyID"
                description="Ejemplo: 5.">
                    <b-form-input
                    id="journeyID"
                    type="number"
                    v-model="form.id_trayecto"
                    :state="validateField(form.id_trayecto, /^[0-9]+$/)"
                    required
                    placeholder="ID Trayecto" />
                    <b-form-invalid-feedback 
                    :state="validateField(form.id_trayecto, /^[0-9]+$/)">
                        Por favor, revisa el ID del Trayecto.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback 
                    :state="validateField(form.id_trayecto, /^[0-9]+$/)">
                        ¡Excelente!
                    </b-form-valid-feedback>
                </b-form-group>
                <b-form-group id="busIDInputGroup" label="ID Bus:" label-for="journeyBusID" 
                description="Ejemplo: 3.">
                    <b-form-input
                    id="journeyBusID"
                    type="number"
                    v-model="form.id_bus"
                    :state="validateField(form.id_bus, /^[0-9]+$/)"
                    required
                    placeholder="ID Bus" />
                    <b-form-invalid-feedback 
                    :state="validateField(form.id_bus, /^[0-9]+$/)">
                        Por favor, revisa el ID del Bus.
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback 
                    :state="validateField(form.id_bus, /^[0-9]+$/)">
                        ¡Excelente!
                    </b-form-valid-feedback>
                </b-form-group>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-button type="submit" variant="success" class="float-right"
                @click="onSubmit">Registrar Horario</b-button>
                <b-button variant="light" @click="$refs.modal.hide()" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import axios from 'axios';
export default {
    props: {
        schedules: Array
    },
    data: () => ({
        dateOptions: {
            format: 'MM/DD/YYYY',
            useCurrent: true,
            showClear: true,
            showClose: true,
            showTodayButton: true,
            minDate: Date.now()
        },
        hourOptions: {
            format: 'HH:mm:ss',
            useCurrent: true,
            showClear: true,
            showClose: true
        },
        form: {
            fecha: '',
            hora: '',
            id_trayecto: -1,
            id_bus: -1
        },
        isFirstTime: true
    }),
    mounted() {
        // Get here the content.
    },
    methods: {
        closeModal() {
            this.$nextTick(() => {
                // Wrapped in $nextTick to ensure DOM is rendered before closing
                this.$refs.modal.hide();
            });
        },
        isFormEmpty() {
            return((!this.$data.form.fecha && 
                    !this.$data.form.hora &&
                    (this.$data.form.id_trayecto === -1) &&
                    (this.$data.form.id_bus === -1)) ? true : false);
        },
        isDataValid(data, regexp) {
            return((!data || !regexp.test(data)) ? false : true);
        },
        validateField(data, regexp) {
            if(this.isFormEmpty() && this.isFirstTime) {
                return null;
            }
            
            return(this.isDataValid(data, regexp) ? true : false);
        },
        validateForm() {
            return(this.isDataValid(this.$data.form.fecha, /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/) && 
                   this.isDataValid(this.$data.form.hora, /^[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$/) && 
                   this.isDataValid(this.$data.form.id_trayecto, /^[0-9]+$/) && 
                   this.isDataValid(this.$data.form.id_bus, /^[0-9]+$/));
        },
        onSubmit(evt) {
            evt.preventDefault();

            this.isFirstTime = false;

            if(this.validateForm()) {
                var that = this;
                var fecha = this.form.fecha;
                var hora = this.form.hora;
                var id_trayecto = this.form.id_trayecto;
                var id_bus = this.form.id_bus;
                axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/horario',{
                    user: 'manuel_sayago',
                    pass: 'destacamemanuel',
                    fecha: fecha,
                    hora: hora,
                    id_trayecto: 1,
                    id_bus: 2
                })
                .then(function (response) {
                    that.$props.schedules = response.data;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

                this.$props.schedules.push({
                    fecha: this.form.fecha,
                    hora: this.form.hora,
                    id_trayecto: this.form.id_trayecto,
                    id_bus: this.form.id_bus
                });

                this.closeModal();

                // Clear previous data.
                this.form.fecha = '';
                this.form.hora = '';
                this.form.id_trayecto = -1;
                this.form.id_bus = -1;
                
                this.isFirstTime = true;
            }
        }
    },
    components: {
        datePicker
    }
};
</script>

<style lang="scss" scoped>
    
</style>