/* global Vue, Vuex, localStorage, API, axios, prompt */

const KEY = '_opencomm_user_'
const savedUser = localStorage.getItem(KEY)

export default function (router) {
  const store = new Vuex.Store({
    state: {
      user: savedUser && JSON.parse(savedUser)
    },
    mutations: {
      logout: async state => {
        await axios.post(`${API}/logout`)
        state.user = null
        localStorage.removeItem(KEY)
        router.push('/')
      },
      login: (state, profile) => {
        localStorage.setItem(KEY, JSON.stringify(profile))
        state.user = profile
      }
    },
    actions: {
      toast: function (ctx, opts) {
        Vue.$toast.open(opts)
      },
      login: async function (ctx, opts) {
        const uname = prompt('username')
        if (!uname) return
        const url = 'https://testauth22.herokuapp.com/success/'
        let res = await axios.post(url, { uname, passwd: 'passwd' }, {
          withCredentials: false
        })
        res = await axios.post(`${API}/login`, null, {
          headers: {
            Authorization: `JWT ${res.data}`
          }
        })
        this.commit('login', res.data.user)
      }
    }
  })

  axios.interceptors.response.use(
    function (response) { return response },
    function (error) {
      switch (error.response.status) {
        case 401:
          store.commit('logout')
          store.dispatch('toast', {
            message: 'Přihlášení vypršelo',
            type: 'success'
          })
          throw error
        default:
          throw error
      }
    })

  return store
}
