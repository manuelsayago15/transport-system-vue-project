<template>
    <div>
        <b-modal id="registerPassengerModal" ref="modal" centered title="Registrar Pasajero">
            <b-form>
                <b-form-group id="passengerNameInputGroup" label="Nombre del Pasajero:" label-for="passengerName"
                description="Ejemplo: Juan.">
                    <b-form-input
                    id="passengerName"
                    type="text"
                    v-model="form.nombre"
                    :state="validateField(form.nombre, /^[a-z\s]+$/gi)"
                    required
                    placeholder="Nombre del Pasajero" />
                </b-form-group>
                <b-form-group id="passengerLastnameInputGroup" label="Apellido del Pasajero:" 
                label-for="passengerLastname"
                description="Ejemplo: Sayago.">
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
                    :state="validateField(form.rut, /^[0-9]{8}[\-]{1}[0-9]{1}$/)"
                    required
                    placeholder="Ruta del Pasajero" />
                </b-form-group>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-button type="submit" variant="success" class="float-right"
                @click="onSubmit">Registrar Pasajero</b-button>
                <b-button variant="light" @click="closeModal" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        passengers: Array
    },
    data: () => ({
        form: {
            nombre: '',
            apellido: '',
            rut: ''
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
            return((!this.$data.form.nombre && 
                    !this.$data.form.apellido && 
                    !this.$data.form.rut) ? true : false);
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
            return(this.isDataValid(this.$data.form.nombre, /^[a-z\s]+$/gi) && 
                   this.isDataValid(this.$data.form.apellido, /^[a-z\s]+$/gi) && 
                   this.isDataValid(this.$data.form.rut, /^[0-9]{8}[\-]{1}[0-9]{1}$/));
        },
        onSubmit(evt) {
            evt.preventDefault();

            this.isFirstTime = false;

            if(this.validateForm()) {
                var that = this;
                var nombre = this.form.nombre;
                var apellido = this.form.apellido;
                var rut = this.form.rut;
                axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/pasajero',{
                    user: 'manuel_sayago',
                    pass: 'destacamemanuel',
                    nombre: nombre,
                    apellido: apellido,
                    rut: rut
                })
                .then(function (response) {
                    that.passengers = response.data;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

                this.$props.passengers.push({
                    nombre: this.form.nombre,
                    apellido: this.form.apellido,
                    rut: this.form.rut
                });

                this.closeModal();

                // Clear previous data.
                this.form.nombre = '';
                this.form.apellido = '';
                this.form.rut = '';
                
                this.isFirstTime = true;
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