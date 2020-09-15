import './js/common'

// import styles
import './assets/css/main.css'
import './assets/scss/main.scss'

// import Vue from 'vue'
window.Vue = require('vue')
import store from './store'

Vue.component('example-component', require('./components/Example.vue').default)

const app = new Vue({
    store,
    el: '#app'
})