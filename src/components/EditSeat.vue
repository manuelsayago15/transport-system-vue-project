<template>
    <div>
        <b-modal id="editSeatModal" ref="modal" centered title="Modificar Asiento" v-on:hidden="closeModal">
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
                @click="onSubmit">Modificar Asiento</b-button>
                <b-button variant="light" @click="$refs.modal.hide();" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        seat: Object
    },
    data: () => ({
        form: {
            num_asiento: -1,
            id_bus: -1,
            id_pasajero: -1
        }
    }),
    mounted() {
        // Get here the content.

        this.$data.form.num_asiento = this.$props.seat.num_asiento;
        this.$data.form.id_bus = this.$props.seat.id_bus;
        this.$data.form.id_pasajero = this.$props.seat.id_pasajero;
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
            return(((this.$data.form.num_asiento === -1) && 
                    (this.$data.form.id_bus === -1) &&
                    (this.$data.form.id_pasajero === -1)) ? true : false);
        },
        isDataValid(data, regexp) {
            return((!data || !regexp.test(data)) ? false : true);
        },
        validateField(data, regexp) {            
            return(this.isDataValid(data, regexp) ? true : false);
        },
        validateForm() {
            return(this.isDataValid(this.$data.form.num_asiento, /^[0-9]+$/) && 
                   this.isDataValid(this.$data.form.id_bus, /^[0-9]+$/) && 
                   this.isDataValid(this.$data.form.id_pasajero, /^[0-9]+$/));
        },
        onSubmit(evt) {
            evt.preventDefault();

            if(this.validateForm()) {
                this.$props.seat.num_asiento = this.form.num_asiento;
                this.$props.seat.id_bus = this.form.id_bus;
                this.$props.seat.id_pasajero = this.form.id_pasajero;
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