export default {
  data: () => {
    return {
      items: [
        { text: 'Domů', to: { name: 'home' } },
        { text: 'Formuláře', active: true }
      ]
    }
  },
  template: `
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <ul>
      <li><router-link :to="{name: 'form', params: {form_id: 'pes'}}">
        Prihlaseni psa
      </router-link></li>
    </ul>
  </div>
  `
}
