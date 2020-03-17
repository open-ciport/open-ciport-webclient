/* global axios, API, Vue, _ */
const validationMixin = window.vuelidate.validationMixin
const validators = window.validators

export default Vue.extend({
  mixins: [validationMixin],
  data: () => {
    return {
      working: false,
      account: '',
      ico: ''
    }
  },
  validations: {
    ico: {
      required: validators.required,
      maxLength: validators.maxLength(9)
    },
    account: {
      required: validators.required,
      maxLength: validators.maxLength(12)
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async function () {
      this.$data.working = true
      try {
        const url = `${API}/subjinfo/`
        const res = await axios.get(url)
        if (res.data.length > 0) Object.assign(this.$data, res.data[0])
      } catch (err) {
        console.error(err)
      } finally {
        this.$data.working = false
      }
    },
    submit: function () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      return this.save()
    },
    save: async function () {
      const model = _.omit(this.$data, 'working')
      try {
        this.$data.working = true
        if (model.id) {
          await axios.put(`${API}/subjinfo/${model.id}`, model)
        } else {
          const res = await axios.post(`${API}/subjinfo/`, model)
          model.id = res.data[0]
        }
        this.$store.dispatch('toast', {
          message: 'Uloženo',
          type: 'success'
        })
        this.$router.push('/granty/')
      } catch (e) {
        this.$store.dispatch('toast', { message: e, type: 'error' })
        console.log(e)
      } finally {
        this.$data.working = false
      }
    }
  },
  template: `
  <div>
    <form>
      <div class="row">
        <div class="col">
          <b-form-group
            :state="!$v.ico.$error"
            label="IČO"
            label-for="ico-input"
            invalid-feedback="Toto pole je povinné"
          >
            <b-form-input
              id="ico-input"
              v-model="$v.ico.$model"
              :state="!$v.ico.$error"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :state="!$v.account.$error"
            label="Číslo účtu"
            label-for="account-input"
            invalid-feedback="Toto pole je povinné"
          >
            <b-form-input
              id="account-input"
              v-model="$v.account.$model"
              :state="!$v.account.$error"
            ></b-form-input>
          </b-form-group>

        </div>
      </div>
    </form>

    <b-button class="mt-3 btn btn-primary" :disabled="$v.$anyError" @click="submit">
      <b>Uložit</b> <i class="fas fa-spinner fa-spin" v-if="working"></i>
    </b-button>
    <router-link :to="{ name: 'grants' }">
      <b-button class="mt-3 btn btn-secondary">
        Storno
      </b-button>
    </router-link>
  </div>
  `
})
