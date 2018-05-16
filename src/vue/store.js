import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'Axios'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        movies:[]
    },
    actions: {
        getmovies (context){
            axios.get('http://localhost:8000/movies').then((response) => {
                context.commit('GETMOVIES',  response.data )
            }, (err) => {
                window.Event.$emit('toast',true,'Erreur');
            })
        },
        updatemovie (context, movie) {
            axios.post('http://localhost:8000/movie/edit', movie).then((response) => {
                if(response.data === 'success') {
                    context.commit('UPDATEMOVIE', movie)
                    window.Event.$emit('toast',true,'film mis à jour');
                }
                else {
                    window.Event.$emit('toast',true,'Erreur');
                }
            }, (err) => {
                window.Event.$emit('toast',true,'Erreur');
            })

        },
        removemovie (context, movie) {
            axios.delete('http://localhost:8000/movie/remove', movie).then((response) => {
                if(response.data === 'success'){
                    context.commit('REMOVEMOVIE', movie)
                    window.Event.$emit('toast',true,'Film supprimé');
                }
                else {
                    window.Event.$emit('toast',true,'Erreur');
                }
            }, (err) => {
                window.Event.$emit('toast',true,'Erreur');
            })

        },
        addmovie (context,movie) {
            axios.post('http://localhost:8000/movie/add', movie).then((response) => {
                if(response.data === 'success') {
                    context.commit('ADDMOVIE', movie)
                    window.Event.$emit('toast',true,'Film ajouté');
                }
                else {
                    window.Event.$emit('toast',true,'Erreur');
                }
            }, (err) => {
                window.Event.$emit('toast',true,'Erreur');
            })
        },
        addmovieapi (context,movie) {
            let movieformated = {
                id:this.state.movies.length+1,
                title: movie.Title,
                release:movie.Released,
                language : movie.Language,
                picture : movie.Poster,
                score:0,
                director : {
                    firstname : movie.Director,
                    lastname : '',
                    nationality : '',
                    birthdate : ''
                },
                genre : movie.Genre
            };
            axios.post('http://localhost:8000/movie/add', movieformated).then((response) => {
                if(response.data === 'success'){
                    context.commit('ADDMOVIE', movieformated)
                    window.Event.$emit('toast',true,'Film ajouté');
                }
                else {
                    window.Event.$emit('toast',true,'Erreur');
                }
            }, (err) => {
                window.Event.$emit('toast',true,'Erreur');
            })
        },
    },
    mutations: {
        GETMOVIES: (state,movies) => {
            state.movies = movies;
        },
        UPDATEMOVIE: (state, movie) => {
            let index = state.movies.findIndex(item => item.id === movie.id);
            state.movies[index] = movie
        },
        REMOVEMOVIE: (state, movie) => {
            let index = state.movies.findIndex(item => item.id === movie.id);
            state.movies.splice(index, 1)
        },
        ADDMOVIE : (state,movie) => {
            state.movies.push(movie)
        }
    },
    getters: {
        movies: state => {
            return state.movies
        },
        count: state => {
            return state.movies.length
        },
        movieById: (state) => (id) => {
            let movie = state.movies.find(item => item.id === id);
            return movie
        },
    },
})
export default store