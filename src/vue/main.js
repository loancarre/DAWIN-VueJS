import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import Vuetify from 'Vuetify'
import 'vuetify/dist/vuetify.min.css'

//component upload btn
import UploadButton from './components/UploadButton';
Vue.component("upload-button", UploadButton);
//component movie item
import MovieItem from './components/MovieItem'
Vue.component("movie-item", MovieItem);

//component star rating
import StarRating from 'vue-star-rating'
Vue.component('star-rating', StarRating);

//component progressbar
import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'
loadProgressBar()

window.Event = new Vue

Vue.use(Vuetify);
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
