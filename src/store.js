/* global Vue, Vuex, API, axios */

export default function (router) {
  const store = new Vuex.Store({
    state: {
      user: null
    },
    mutations: {
      logout: state => {
        state.user = null
      },
      profile: (state, profile) => {
        state.user = profile
      }
    },
    actions: {
      toast: function (ctx, opts) {
        Vue.$toast.open(opts)
      },
      login: function (ctx, opts) {
        window.location.href = `${API}/login`
      },
      logout: async state => {
        window.location.href = `${API}/logout`
      },
      init: async function (ctx, opts) {
        try {
          const res = await axios.get(`${API}/profile`)
          this.commit('profile', res.data.user)
        } catch (_) {}
      }
    }
  })

  axios.interceptors.response.use(
    function (response) { return response },
    function (error) {
      switch (error.response.status) {
        case 401:
          store.dispatch('toast', {
            message: 'Přihlášení vypršelo',
            type: 'success'
          })
          store.dispatch('login')
          throw error
        default:
          throw error
      }
    })

  return store
}
