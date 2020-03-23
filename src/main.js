/* global Vue, VueRouter */
import App from './components/App.js'
import './vuecustoms.js'
import Store from './store.js'

import Dashboard from './components/pages/dashboard.js'

import Form from './components/pages/forms/apply.js'
import FormList from './components/pages/forms/list.js'

import GrantsCallList from './components/pages/grants/call_list.js'
import GrantCallProjects from './components/pages/grants/call_projects.js'
import GrantApply from './components/pages/grants/apply.js'
import GrantSubjectEdit from './components/pages/grants/subject_edit.js'

const router = new VueRouter({
  routes: [
    { path: '/granty', component: GrantsCallList, name: 'grants' },
    { path: '/granty/vyzva/:call_id', component: GrantCallProjects, name: 'grantprojects' },
    { path: '/granty/vyzva/:call_id/zadost', component: GrantApply, name: 'grantapply' },
    { path: '/granty/subjekt', component: GrantSubjectEdit, name: 'grantsubj' },

    { path: '/form', component: FormList, name: 'formlist' },
    { path: '/form/:form_id', component: Form, name: 'form' },
    { path: '', component: Dashboard }
  ]
})

const store = Store(router)

new Vue({
  router,
  store,
  template: App.template
}).$mount('#app')
