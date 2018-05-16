<template>
    <v-app>
        <v-snackbar :timeout="timeout" :top="y === 'top'" :bottom="y === 'bottom'" :right="x === 'right'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="snackbar">
            {{ text }}
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
        <MovieAdd></MovieAdd>
        <Navigation></Navigation>
        <v-content>
            <router-view></router-view>
        </v-content>
        <Footer></Footer>
    </v-app>
</template>

<script>
    import Footer from './components/Footer'
    import Navigation from './components/Navigation'
    import MovieAdd from './components/MovieAdd'
    import Vuex from 'Vuex'
    export default {
        methods : {
            ...Vuex.mapActions(['getmovies']),
        },
        data () {
            return {
                snackbar: false,
                y: 'top',
                x: null,
                mode: '',
                timeout: 6000,
                text: null
            }
        },
        components: {
            Footer,
            Navigation,
            MovieAdd
        },
        name: 'app',
        created(){
            window.Event.$on('toast', function(show,text) {
                this.text = text;
                this.snackbar = show;
            }),
            this.getmovies()
        }
    }
</script>

<style scoped>

</style>