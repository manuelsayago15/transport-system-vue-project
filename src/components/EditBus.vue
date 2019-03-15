<template>
    <div>
        <b-modal id="editBusModal" ref="modal" centered title="Modificar Bus" v-on:hidden="closeModal">
            <b-form>
                <b-form-group id="patentInputGroup" label="Número de Patente:" label-for="patentNumber"
                description="Ejemplo: XXXXXX.">
                    <b-form-input
                    id="patentNumber"
                    type="text"
                    v-model="form.patente"
                    :state="validateField(form.patente, /^[a-z0-9\s]+$/gi)"
                    required
                    placeholder="Número de Patente" />
                </b-form-group>
                <b-form-group id="brandInputGroup" label="Marca:" label-for="brand"
                description="Ejemplo: Yutong.">
                    <b-form-input
                    id="brand"
                    type="text"
                    v-model="form.marca"
                    :state="validateField(form.marca, /^[a-z0-9\s]+$/gi)"
                    required
                    placeholder="Marca" />
                </b-form-group>
                <b-form-group id="driverIDInputGroup" label="Driver:" label-for="driverID">
                    <b-form-select id="driverID" v-model="form.id_chofer" :options="driversData" 
                    :state="isSelectValid(form.id_chofer)" required />
                </b-form-group>
            </b-form>
            <div slot="modal-footer" class="w-100">
                <b-button type="submit" variant="success" class="float-right"
                @click="onSubmit" :disabled="!validateForm()">Modificar Bus</b-button>
                <b-button variant="light" @click="$refs.modal.hide()" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        drivers: Array,
        bus: Object
    },
    data: () => ({
        driversData: [
            { text: 'Selecciona un Chofer.', value: -1 }
        ],
        form: {
            patente: '',
            marca: '',
            id_chofer: -1
        }
    }),
    mounted() {
        // Get here the content and push it to drivers (because already contains default text).

        this.$data.form.patente = this.$props.bus.patente;
        this.$data.form.marca = this.$props.bus.marca;
        this.$data.form.id_chofer = this.$props.bus.id_chofer;

        // Transform the data to be used in Bootstrap Select.
        var that = this;
        this.$props.drivers.forEach(function(currentValue, index) {
            that.$data.driversData.push({
                text: currentValue['nombre'].concat(' ').concat(currentValue['apellido']),
                value: index
            });
        });
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
        isSelectValid(index) {
            return((index !== -1) ? true : false);
        },
        validateField(data, regexp) {
            return(this.isDataValid(data, regexp) ? true : false);
        },
        validateForm() {
            return(this.isDataValid(this.$data.form.patente, /^[a-z0-9\s]+$/gi) && 
                   this.isDataValid(this.$data.form.marca, /^[a-z0-9\s]+$/gi) && 
                   this.isSelectValid(this.$data.form.id_chofer));
        },
        onSubmit(evt) {
            evt.preventDefault();

            if(this.validateForm()) {
                this.$props.bus.patente = this.form.patente;
                this.$props.bus.marca = this.form.marca;
                this.$props.bus.id_chofer = this.form.id_chofer;
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