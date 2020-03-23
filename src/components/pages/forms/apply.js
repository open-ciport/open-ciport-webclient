/* global axios, API */
import PesPrihlaska from './pes-prihlaska.js'

export default {
  data: () => {
    return {
      working: false
    }
  },
  methods: {
    save: async function (data) {
      const formId = this.$router.currentRoute.params.form_id
      try {
        this.$data.working = true
        await axios.post(`${API}/paro_proj/${formId}`, data)
        this.$store.dispatch('toast', { message: 'Uloženo', type: 'success' })
        // this.$router.push(`/paro/${callId}`)
      } catch (e) {
        this.$store.dispatch('toast', { message: e, type: 'error' })
        console.log(e)
      } finally {
        this.$data.working = false
      }
    },
    cancel: function () {
      this.$router.push('/form')
    }
  },
  components: {
    pesprihlaska: PesPrihlaska
  },
  template: `
  <div>
    <pesprihlaska v-bind:save="save" v-bind:cancel="cancel" @working="working">
    </pesprihlaska>
  </div>
  `
}
