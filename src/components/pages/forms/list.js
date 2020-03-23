export default {
  template: `
  <div>
    <h1>Formulare</h1>
    <ul>
      <li><router-link :to="{name: 'form', params: {form_id: 'pes'}}">
        Prihlaseni psa
      </router-link></li>
    </ul>
  </div>
  `
}
