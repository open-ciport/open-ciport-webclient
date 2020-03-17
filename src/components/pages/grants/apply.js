/* global axios, API, Vue */
import BudgetEditor from './parts/budgeteditor.js'
import { countTotal } from './parts/budgeteditor.js'

const validationMixin = window.vuelidate.validationMixin
const validators = window.validators

export default Vue.extend({
  mixins: [validationMixin],
  data: () => {
    return {
      working: false,
      name: '',
      mistorealizace: '',
      podp_oblasti: 'todo',
      zahajeni: '1.2.2020',
      ukonceni: '1.2.2020',
      desc: '',
      content: '',
      budget: '',
      total: ''
    }
  },
  validations: {
    name: {
      required: validators.required,
      maxLength: validators.maxLength(64)
    },
    mistorealizace: {
      required: validators.required,
      maxLength: validators.maxLength(64)
    },
    desc: {
      required: validators.required,
      maxLength: validators.maxLength(512)
    },
    budget: {
      itemsrequired: function (value) {
        try {
          const items = JSON.parse(value)
          return items.length > 0
        } catch (_) {
          return false
        }
      }
    },
    content: {
      required: validators.required
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async function () {
      this.$data.working = true
      try {
        const callId = this.$router.currentRoute.params.call_id
        const author = this.$store.state.user.id
        const url = `${API}/paro_proj/?call_id=${callId}&author=${author}`
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
      const model = this.$data
      model.total = countTotal(model.budget)
      try {
        this.$data.working = true
        const callId = this.$router.currentRoute.params.call_id
        if (model.id) {
          await axios.put(`${API}/project/${model.id}`, model)
        } else {
          const res = await axios.post(`${API}/project/${callId}`, model)
          model.id = res.data[0]
        }
        this.$store.dispatch('toast', {
          message: 'Uloženo',
          type: 'success'
        })
        this.$router.push(`/granty/${callId}`)
      } catch (e) {
        this.$store.dispatch('toast', { message: e, type: 'error' })
        console.log(e)
      } finally {
        this.$data.working = false
      }
    }
  },
  components: {
    budgeteditor: BudgetEditor
  },
  template: `
  <div>
    <form>
      <div class="row">
        <div class="col">
          <b-form-group
            :state="!$v.name.$error"
            label="Název projektu"
            label-for="name-input"
            invalid-feedback="Název je povinný a musí být maximálně 64 znaků dlouhý"
          >
            <b-form-input
              id="name-input"
              v-model="$v.name.$model"
              :state="!$v.name.$error"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :state="!$v.mistorealizace.$error"
            label="Místo realizace"
            label-for="mrealizace-input"
            invalid-feedback="Toto pole je povinné"
          >
            <b-form-input
              id="mrealizace-input"
              v-model="$v.mistorealizace.$model"
              :state="!$v.mistorealizace.$error"
            ></b-form-input>
          </b-form-group>

        </div>
        <div class="col">

          <b-form-group
            :state="!$v.desc.$error"
            label="Stručný popis projektu"
            label-for="desc-input"
            invalid-feedback="Popis je povinný a musí být maximálně 512 znaků dlouhý"
          >
            <b-form-textarea
              id="desc-input"
              placeholder="stručný popis projektu"
              v-model="$v.desc.$model"
              :state="!$v.desc.$error"
              rows="6"
            ></b-form-textarea>
          </b-form-group>

        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">

          <b-form-group
            :state="!$v.content.$error"
            label="Souhrnné informace o projektu (odůvodnění žádosti): jeho cíl, způsob využití příspěvku, způsob realizace akce, programová náplň, časový harmonogram, hlavní výstup projektu, cílová skupina a předpokládaný počet zúčastněných osob, vztah k městu apod."
            label-for="content-input"
            invalid-feedback="Úplný popis je povinný"
          >
            <b-form-textarea
              id="content-input"
              v-model="$v.content.$model"
              :state="!$v.content.$error"
              rows="8"
            ></b-form-textarea>
            <template slot="description">
              Můžete používat <a href="http://www.edgering.org/markdown/" target="_blank">markdown</a>
            </template>
          </b-form-group>

          <b-form-group
            :state="!$v.budget.$error"
            label="Rozpočet projektu, opřený o nějakou referenci (eshop, konzultace se řemeslníkem)"
            label-for="budget-input"
            invalid-feedback="Rozpočet projektu je povinný a musí být maximílně 128 znaků dlouhý"
          >
            <budgeteditor v-model="$v.budget.$model"></budgeteditor>
            <template slot="invalid-feedback">
              Musíte zmínit jaké dílčí položky projekt vyžaduje.
            </template>
          </b-form-group>

        </div>
      </div>
    </form>

    <b-button class="mt-3 btn btn-primary" :disabled="$v.$anyError" @click="submit">
      <b>Uložit</b> <i class="fas fa-spinner fa-spin" v-if="working"></i>
    </b-button>
    <router-link :to="{name: 'grantprojects', params: {call_id: $router.currentRoute.params.call_id}}">
      <b-button class="mt-3 btn btn-secondary">
        Storno
      </b-button>
    </router-link>
  </div>
  `
})
