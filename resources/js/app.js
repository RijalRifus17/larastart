/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment'
import {

    Form,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess
} from 'vform'

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
import Profile from './components/Dashboard.vue'
import Dashboard from './components/Profile.vue'
import Users from './components/Users.vue'
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2'

// use vue router
Vue.use(VueRouter)

var routes = [{
        path: '/dashboard',
        component: Profile
    },
    {
        path: '/profile',
        component: Dashboard
    },
    {
        path: '/users',
        component: Users
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

Vue.filter('upText', function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
})

Vue.filter('myDate', function (created) {
    return moment(created).format('MMMM Do YYYY')
})

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

window.swal = Swal


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
})

window.toast = Toast

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
