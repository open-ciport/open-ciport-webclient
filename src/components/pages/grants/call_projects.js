/* global axios, API, _, moment */
import ProjectStatus from './parts/projectstatus.js'
import VoteButton from './parts/votebutton.js'

export default {
  data: () => {
    return {
      loading: true,
      call: null,
      projects: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async function () {
      const callId = this.$router.currentRoute.params.call_id
      const promises = [
        axios.get(`${API}/project/?call_id=${callId}`),
        axios.get(`${API}/call/?id=${callId}`)
      ]
      const res = await Promise.all(promises)
      this.$data.projects = res[0].data
      this.$data.call = res[1].data[0]
      this.$data.loading = false
    }
  },
  computed: {
    canChangeProject: function () {
      const now = moment()
      return this.$store.state.user &&
        now >= moment(this.$data.call.submission_start) &&
        now <= moment(this.$data.call.thinking_start)
    },
    canVote: function () {
      return this.$store.state.user && this.$data.call.status === 'voting'
    }
  },
  template: `
  <div v-if="!loading">

    <div class="row">
      <div class="col-sm-12 col-md-6">
        <h1>{{call.name}}</h1>
      </div>
      <div class="col-sm-12 col-md-6">
          <router-link v-if="canChangeProject"
            :to="{name: 'grantapply', params: {call_id: call.id}}">
            <button class="btn btn-primary">
              <i class="fas fa-edit"></i> Vytvořit / upravit žádost
            </button>
          </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 col-md-6">
        <div>
          Začátek podávání návrhů: {{call.submission_start | formatDate}}<br />
          Začátek ověřování proveditelnosti: {{call.submission_end | formatDate}}<br />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <h2>Žádosti</h2>
      </div>
    </div>

    <div class="card-columns">
      <div v-if="projects.length === 0">Zatím žádné</div>
      <div v-for="p in projects" class="card proj">
        <img v-if="p.photo" :src="p.photo" class="card-img-top projimg" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{p.name}}</h5>
          <projstatus v-bind:project="p"></projstatus>
          <p class="card-text">{{p.desc}}</p>
          <p class="card-text">Rozpočet: {{p.total}}</p>
          <router-link :to="{name: 'parodetail', params: {id: p.id}}">
            <button class="btn btn-primary">Detail ...</button>
          </router-link>
          <votebutton v-if="canVote" :call="call" :project="p" :votes="myvotes">
          </votebutton>
        </div>
      </div>
    </div>
  </div>
  `
}
