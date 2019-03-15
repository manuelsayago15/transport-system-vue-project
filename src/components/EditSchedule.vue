<template>
    <div>
        <b-modal id="editScheduleModal" ref="modal" centered title="Modificar Horario" v-on:hidden="closeModal">
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
                @click="onSubmit">Modificar Horario</b-button>
                <b-button variant="light" @click="$refs.modal.hide();" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

var moment = require('moment');

export default {
    props: {
        show: Boolean,
        schedule: Object
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
        }
    }),
    mounted() {
        // Get here the content.

        // this.$data.form.fecha = this.$props.schedule.fecha;
        this.$data.form.hora = this.$props.schedule.hora;
        this.$data.form.id_trayecto = this.$props.schedule.id_trayecto;
        this.$data.form.id_bus = this.$props.schedule.id_bus;
    },
    methods: {
        closeModal() {
            this.$nextTick(() => {
                // Wrapped in $nextTick to ensure DOM is rendered before closing
                this.$refs.modal.hide();
                this.$emit('update:show', false);
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

            if(this.validateForm()) {
                this.$props.schedule.fecha = this.form.fecha;
                this.$props.schedule.hora = this.form.hora;
                this.$props.schedule.id_trayecto = this.form.id_trayecto;
                this.$props.schedule.id_bus = this.form.id_bus;
                this.$refs.modal.hide();
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