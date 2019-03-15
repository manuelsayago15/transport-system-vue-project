<template>
    <div>
        <b-modal id="registerDriverModal" ref="modal" centered title="Registrar Chofer">
            <b-form>
                <b-form-group id="driverNameInputGroup" label="Nombre del Chofer:" label-for="driverName"
                description="Ejemplo: Juan.">
                    <b-form-input
                    id="driverName"
                    type="text"
                    v-model="form.nombre"
                    :state="validateField(form.nombre, /^[a-z\s]+$/gi)"
                    required
                    placeholder="Nombre del Chofer" />
                </b-form-group>
                <b-form-group id="driverLastnameInputGroup" label="Apellido del Chofer:" 
                label-for="driverLastname"
                description="Ejemplo: Sayago.">
                    <b-form-input
                    id="driverLastname"
                    type="text"
                    v-model="form.apellido"
                    :state="validateField(form.apellido, /^[a-z\s]+$/gi)"
                    required
                    placeholder="Apellido del Chofer" />
                </b-form-group>
                <b-form-group id="driverRouteInputGroup" label="Rut:" label-for="driverRoute"
                description="Ejemplo: 17467125-3">
                    <b-form-input
                    id="driverRoute"
                    type="text"
                    v-model="form.rut"
                    :state="validateField(form.rut, /^[0-9]{8}[\-]{1}[0-9]{1}$/)"
                    required
                    placeholder="Rut del Chofer" />
                </b-form-group>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-button type="submit" variant="success" class="float-right"
                @click="onSubmit" >Registrar Chofer</b-button>
                <b-button variant="light" @click="closeModal" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        drivers: Array
    },
    data: () => ({
        form: {
            nombre: '',
            apellido: '',
            rut: ''
        },
        isFirstTime: true,
        showDismissibleAlert: false
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
                axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/chofer',{
                    user: 'manuel_sayago',
                    pass: 'destacamemanuel',
                    nombre: nombre,
                    apellido: apellido,
                    rut: rut
                })
                .then(function (response) {
                    that.drivers = response.data;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.$props.drivers.push({
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