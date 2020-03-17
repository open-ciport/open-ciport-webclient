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
        <div class="card-body">
          <h5 class="card-title">Granty</h5>
          <p class="card-text">
            <router-link to="/granty">
              <i class="fas fa-check"></i> Více ...
            </router-link>
          </p>
        </div>
      </div>

      <div class="card">
        <img class="card-img-top" alt="ikona anketa" src="anketa.jpg">
        <div class="card-body">
          <h5 class="card-title">Informace o občanovi</h5>
          <p class="card-text">
            Tuto sekci připravujeme.
          </p>
        </div>
      </div>

    </div>
  </div>
  `
}
