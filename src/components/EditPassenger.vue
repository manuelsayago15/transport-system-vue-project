<template>
    <div>
        <b-modal id="editPassengerModal" ref="modal" centered title="Modificar Pasajero" v-on:hidden="closeModal">
            <b-form>
                <b-form-group id="passengerNameInputGroup" label="Número de Patente:" label-for="passengerName"
                description="Ejemplo: Juan.">
                    <b-form-input
                    id="passengerName"
                    type="text"
                    v-model="form.nombre"
                    :state="validateField(form.nombre, /^[a-z\s]+$/gi)"
                    required
                    placeholder="Nombre del Pasajero" />
                </b-form-group>
                <b-form-group id="passengerLastnameInputGroup" label="Apellido:" label-for="passengerLastname"
                description="Ejemplo: Pérez.">
                    <b-form-input
                    id="passengerLastname"
                    type="text"
                    v-model="form.apellido"
                    :state="validateField(form.apellido, /^[a-z\s]+$/gi)"
                    required
                    placeholder="Apellido del Pasajero" />
                </b-form-group>
                <b-form-group id="passengerRouteInputGroup" label="Ruta:" label-for="passengerRoute"
                description="Ejemplo: 17467125-3">
                    <b-form-input
                    id="passengerRoute"
                    type="text"
                    v-model="form.rut"
                    :state="validateField(form.rut, /^[0-9]{8}[\-]{1}[0-9]{1}$/gi)"
                    required
                    placeholder="Ruta del Pasajero" />
                </b-form-group>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-button type="submit" variant="success" class="float-right"
                @click="onSubmit">Modificar Pasajero</b-button>
                <b-button variant="light" @click="$refs.modal.hide()" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        passenger: Object
    },
    data: () => ({
        form: {
            nombre: '',
            apellido: '',
            rut: ''
        }
    }),
    mounted() {
        // Get here the content.
        
        this.$data.form.nombre = this.$props.passenger.nombre;
        this.$data.form.apellido = this.$props.passenger.apellido;
        this.$data.form.rut = this.$props.passenger.rut;
    },
    methods: {
        closeModal() {
            this.$nextTick(() => {
                // Wrapped in $nextTick to ensure DOM is rendered before closing
                this.$refs.modal.hide();
                this.$emit('update:show', false);
            });
        },
        isDataValid(data, regexp) {
            return((!data || !regexp.test(data)) ? false : true);
        },
        validateField(data, regexp) {
            return(this.isDataValid(data, regexp) ? true : false);
        },
        validateForm() {
            return(this.isDataValid(this.$data.form.nombre, /^[a-z\s]+$/gi) && 
                   this.isDataValid(this.$data.form.apellido, /^[a-z\s]+$/gi) && 
                   this.isDataValid(this.$data.form.rut, /^[0-9]{8}[\-]{1}[0-9]{1}$/gi));
        },
        onSubmit(evt) {
            evt.preventDefault();

            if(this.validateForm()) {
                this.$props.passenger.nombre = this.form.nombre;
                this.$props.passenger.apellido = this.form.apellido;
                this.$props.passenger.rut = this.form.rut;
                this.$refs.modal.hide();
            }
        }
    },
    components: {
        //
    }
};
</script>

<style lang="scss" scoped>
    
</style>