import Vue from 'vue'
import Router from 'vue-router'
import MoviesList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'
import MovieEdit from './pages/MovieEdit'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'MoviesList',
            component: MoviesList
        },
        {
            path: '/movie/:id',
            name: 'MovieDetail',
            component: MovieDetail
        },
        {
            path: '/movie/:id/edit',
            name: 'MovieEdit',
            component: MovieEdit
        }
    ]
})