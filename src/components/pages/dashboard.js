/* global axios, API */

export default {
  data: () => {
    return {
      info: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: async function () {
      const res = await axios.get(`${API}/info/`)
      this.$data.info = res.data
    }
  },
  template: `
  <div>

    <div class="card-group">

      <div class="card">
        <div style="font-size: 5em; align: center;">
          <i class="fas fa-file-invoice-dollar"></i>
        </div>
        <div class="card-body">
          <h5 class="card-title">Granty</h5>
          <p class="card-text">
            <router-link :to="{name: 'grants'}">
              <i class="fas fa-check"></i> Více ...
            </router-link>
          </p>
        </div>
      </div>

      <div class="card">
        <div style="font-size: 5em; align: center;">
          <i class="fas fa-archive"></i>
        </div>
        <div class="card-body">
          <h5 class="card-title">Formuláře</h5>
          <p class="card-text">
            <router-link :to="{name: 'formlist'}">
              <i class="fas fa-check"></i> Více ...
            </router-link>
          </p>
        </div>
      </div>

    </div>
  </div>
  `
}
