<template>
    <div>
        <b-modal id="registerBusModal" ref="modal" centered title="Registrar Bus">
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
                @click="onSubmit">Registrar Bus</b-button>
                <b-button variant="light" @click="closeModal" class="float-right">Cancelar</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        drivers: Array,
        buses: Array
    },
    data: () => ({
        driversData: [
            { text: 'Selecciona un Chofer.', value: -1 }
        ],
        form: {
            patente: '',
            marca: '',
            id_chofer: -1
        },
        isFirstTime: true,
        isPatentValid: null,
        isBrandValid: null,
        isDriverIDValid: null
    }),
    mounted() {
        // Get here the content and push it to drivers (because already contains default text).
        
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
            });
        },
        isFormEmpty() {
            return((!this.$data.form.patente && 
                    !this.$data.form.marca && 
                    this.$data.form.id_chofer === -1) ? true : false);
        },
        isDataValid(data, regexp) {
            return((!data || !regexp.test(data)) ? false : true);
        },
        isSelectValid(index) {
            if(this.isFormEmpty() && this.isFirstTime) {
                return null;
            }

            return((index !== -1) ? true : false);
        },
        validateField(data, regexp) {
            if(this.isFormEmpty() && this.isFirstTime) {
                return null;
            }
            
            return(this.isDataValid(data, regexp) ? true : false);
        },
        validateForm() {
            return(this.isDataValid(this.$data.form.patente, /^[a-z0-9\s]+$/gi) && 
                   this.isDataValid(this.$data.form.marca, /^[a-z0-9\s]+$/gi) && 
                   this.isSelectValid(this.$data.form.id_chofer));
        },
        onSubmit(evt) {
            evt.preventDefault();

            this.isFirstTime = false;

            if(this.validateForm()) {
                var that = this;
                var patente = this.form.patente;
                var marca = this.form.marca;
                var id_chofer = this.form.id_chofer;
                axios.post('http://ec2-18-231-131-247.sa-east-1.compute.amazonaws.com/bus',{
                    user: 'manuel_sayago',
                    pass: 'destacamemanuel',
                    patente: patente,
                    marca: marca,
                    id_chofer: 1
                })
                .then(function (response) {
                    that.buses = response.data;
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

                this.$props.buses.push({
                    patente: this.form.patente,
                    marca: this.form.marca,
                    id_chofer: this.form.id_chofer
                });

                this.closeModal();

                // Clear previous data.
                this.form.patente = '';
                this.form.marca = '';
                this.form.id_chofer = -1;
                
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