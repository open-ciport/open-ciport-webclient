/* global axios, API, _, moment */

export default {
  data: () => {
    return {
      loading: true,
      calls: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async function () {
      this.$data.loading = true
      const res = await axios.get(`${API}/call/`)
      this.$data.calls = res.data
      this.$data.loading = false
    }
  },
  computed: {
  },
  template: `
  <div v-if="!loading">

    <router-link :to="{ name: 'grantsubj' }">
      Informace o subjektu
    </router-link>

    <div class="row">
      <div class="col-sm-12">
        <h1>Výzvy</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div v-for="call in calls">
          <router-link :to="{name: 'grantprojects', params: {call_id: call.id}}">
            <h2>{{call.name}}</h2>
          </router-link>

          Začátek podávání žádostí: {{call.submission_start | formatDate}}<br />
          Konec podávání žádostí: {{call.submission_end | formatDate}}<br />
          Alokace: {{call.allocation}}
        </div>
      </div>
    </div>

  </div>
  `
}
