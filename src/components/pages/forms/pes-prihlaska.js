/* global Vue, _ */
const validationMixin = window.vuelidate.validationMixin
const v = window.validators
// https://www.taborcz.eu/poplatek-ze-psu/d-3469
// https://www.taborcz.eu/assets/File.ashx?id_org=16470&id_dokumenty=69284

export default Vue.extend({
  mixins: [validationMixin],
  data: () => {
    return {
      rasa: '',
      barva: '',
      narozen: '',
      cislo: '',
      jmeno: ''
    }
  },
  validations: {
    jmeno: { required: v.required, maxLength: v.maxLength(64) },
    rasa: { required: v.required, maxLength: v.maxLength(64) },
    barva: { required: v.required, maxLength: v.maxLength(64) },
    narozen: { required: v.required },
    cislo: { required: v.required }
  },
  methods: {
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      return this.$props.save(Object.assign({}, this.$data))
    }
  },
  props: ['working', 'save', 'cancel'],
  template: `
  <div>
    <h1>Poplatek ze psů</h1>
    <form>
      <div class="row">
        <div class="col">
          <b-form-group
            :state="!$v.jmeno.$error"
            label="Jméno psa"
            label-for="jmeno-input"
            invalid-feedback="Povinný atribut a smí být maximálně 64 znaků dlouhý"
          >
            <b-form-input
              id="jmeno-input"
              v-model="$v.jmeno.$model"
              :state="!$v.jmeno.$error"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :state="!$v.rasa.$error"
            label="Rasa"
            label-for="rasa-input"
            invalid-feedback="Povinný atribut a smí být maximálně 64 znaků dlouhý"
          >
            <b-form-input
              id="rasa-input"
              v-model="$v.rasa.$model"
              :state="!$v.rasa.$error"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :state="!$v.barva.$error"
            label="Barva"
            label-for="barva-input"
            invalid-feedback="Povinný atribut a smí být maximálně 64 znaků dlouhý"
          >
            <b-form-input
              id="barva-input"
              v-model="$v.barva.$model"
              :state="!$v.barva.$error"
            ></b-form-input>
          </b-form-group>

        </div>

        <div class="col">

          <b-form-group
            :state="!$v.narozen.$error"
            label="Narozen"
            label-for="narozen-input"
            invalid-feedback="Povinný atribut a smí být maximálně 64 znaků dlouhý"
          >
            <b-form-input
              id="narozen-input"
              v-model="$v.narozen.$model"
              :state="!$v.narozen.$error"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :state="!$v.cislo.$error"
            label="Registrační číslo"
            label-for="cislo-input"
            invalid-feedback="Povinný atribut a smí být maximálně 64 znaků dlouhý"
          >
            <b-form-input
              id="cislo-input"
              v-model="$v.cislo.$model"
              :state="!$v.cislo.$error"
            ></b-form-input>
          </b-form-group>

        </div>
      </div>
    </form>

    <b-button variant="primary" :disabled="$v.$anyError" @click="submit">
      <b>Uložit</b> <i class="fas fa-spinner fa-spin" v-if="working"></i>
    </b-button>
    <b-button @click="cancel">
      Storno
    </b-button>
  </div>
  `
})
