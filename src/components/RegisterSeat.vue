<template>
    <div>
        <b-modal id="registerSeatModal" ref="modal" centered title="Registrar Asiento">
            <b-form>
                <b-form-group id="seatNumberInputGroup" label="Número de Asiento:" label-for="seatNumber"
                description="Ejemplo: 15.">
                    <b-form-input
                    id="seatNumber"
                    type="number"
                    v-model="form.num_asiento"
                    :state="validateField(form.num_asiento, /^[0-9]+$/)"
                    required
                    placeholder="Número de Asiento" />
                </b-form-group>
                <b-form-group id="busIDInputGroup" label="ID Bus:" label-for="seatBusID" description="Ejemplo: 3.">
                    <b-form-input
                    id="seatBusID"
                    type="number"
                    v-model="form.id_bus"
                    :state="validateField(form.id_bus, /^[0-9]+$/)"
                    required
                    placeholder="ID Bus" />
                </b-form-group>
                <b-form-group id="passengerIDInputGroup" label="ID Pasajero:" label-for="passengerID"
                description="Ejemplo: 17">
                    <b-form-input
                    id="passengerID"
                    type="number"
                    v-model="form.id_pasajero"
                    :state="validateField(form.id_pasajero, /^[0-9]+$/)"
                    required
                    placeholder="ID Pasajero" />
                </b-form-group>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-button type="submit" variant="success" class="float-right"
                @click="onSubmit">Registrar Asiento</b-button>
                <b-button variant="light" @click="$refs.modal.hide()" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        seats: Array
    },
    data: () => ({
        form: {
            num_asiento: '',
            id_bus: '',
            id_pasajero: ''
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
            return(((this.$data.form.num_asiento === -1) && 
                    (this.$data.form.id_bus === -1) &&
                    (this.$data.form.id_pasajero === -1)) ? true : false);
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
            return(this.isDataValid(this.$data.form.num_asiento, /^[0-9]+$/) && 
                   this.isDataValid(this.$data.form.id_bus, /^[0-9]+$/) && 
                   this.isDataValid(this.$data.form.id_pasajero, /^[0-9]+$/));
        },
        onSubmit(evt) {
            evt.preventDefault();

            this.isFirstTime = false;

            if(this.validateForm()) {
                var that = this;
                var num_asiento = this.form.num_asiento;
                var id_bus = this.form.id_bus;
                var id_pasajero = this.form.id_pasajero;
                axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/asiento',{
                    user: 'manuel_sayago',
                    pass: 'destacamemanuel',
                    num_asiento: 1,
                    id_bus: 2,
                    id_pasajero: 1
                })
                .then(function (response) {
                    that.$props.seats = response.data;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

                this.$props.seats.push({
                    num_asiento: this.form.num_asiento,
                    id_bus: this.form.id_bus,
                    id_pasajero: this.form.id_pasajero
                });

                this.closeModal();

                // Clear previous data.
                this.form.num_asiento = -1;
                this.form.id_bus = -1;
                this.form.id_pasajero = -1;
                
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