/* global Vue, VueToast */

Vue.use(VueToast, {
  // One of options
  position: 'top-right'
})

export default {
  template: `
<div>
  <b-navbar toggleable="lg" variant="dark" type="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link class="nav-link" to="/"><i class="fas fa-home"></i> Domů</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link" to="/granty">Granty</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link class="nav-link" to="/form">Formulare</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <button v-if="$store.state.user !== null" class="btn btn-warning"
          v-on:click="$store.commit('logout')">
          <i class="fas fa-sign-out-alt"></i> Odhlásit
        </button>
        <b-button v-else @click="$store.dispatch('login')">
          Přihlásit
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="container-fluid mx-auto p-4">
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</div>
  `
}
