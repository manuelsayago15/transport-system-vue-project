<template>
    <div>
        <b-modal id="editDriverModal" ref="modal" centered title="Modificar Chofer" v-on:hidden="closeModal">
            <b-form>
                <b-form-group id="driverNameInputGroup" label="Nombre Chofer:" label-for="driverName"
                description="Ejemplo: Juan.">
                    <b-form-input
                    id="driverName"
                    type="text"
                    v-model="form.nombre"
                    :state="validateField(form.nombre, /^[a-z\s]+$/gi)"
                    required
                    placeholder="Nombre del Chofer" />
                </b-form-group>
                <b-form-group id="driverLastnameInputGroup" label="Apellido Chofer:" label-for="driverLastname"
                description="Ejemplo: Pérez.">
                    <b-form-input
                    id="driverLastname"
                    type="text"
                    v-model="form.apellido"
                    :state="validateField(form.apellido, /^[a-z\s]+$/gi)"
                    required
                    placeholder="Apellido del Chofer" />
                </b-form-group>
                <b-form-group id="driverRouteInputGroup" label="Ruta:" label-for="driverRoute"
                description="Ejemplo: 17467125-3">
                    <b-form-input
                    id="driverRoute"
                    type="text"
                    v-model="form.rut"
                    :state="validateField(form.rut, /^[0-9]{8}[\-]{1}[0-9]{1}$/gi)"
                    required
                    placeholder="Ruta del Chofer" />
                </b-form-group>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-button type="submit" variant="success" class="float-right"
                @click="onSubmit">Modificar Chofer</b-button>
                <b-button variant="light" @click="$refs.modal.hide()" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        show: Boolean,
        driver: Object
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
        
        this.$data.form.nombre = this.$props.driver.nombre;
        this.$data.form.apellido = this.$props.driver.apellido;
        this.$data.form.rut = this.$props.driver.rut;
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
                this.$props.driver.nombre = this.form.nombre;
                this.$props.driver.apellido = this.form.apellido;
                this.$props.driver.rut = this.form.rut;
                this.$refs.modal.hide();
                var that =  this;
                var id = this.$data.form.id_chofer;
                 axios.put('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/chofer/'.concat(id),{
                     user: 'manuel_sayago',
                     pass: 'destacamemanuel'
                 })
                .then(function (response) {
                     that.drivers = response.data;
                  console.log(response);
                 })
                 .catch(function (error) {
                console.log(error);
                });
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