<template>
    <div>
        <v-layout row>
            <v-flex xs10  offset-xs1>
                <v-card class="pa-4 mt-4 mb-4 mx-3">
                    <v-text-field v-model="search" name="input-1" label="Rechercher un film par nom, date de sortie, genre, langue, prenom du réalisateur, nom du réalisat" id="search"></v-text-field>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row >
            <v-flex xs10 offset-xs1>
               <v-container fluid style="min-height: 0;" grid-list-lg>
                <v-layout row wrap>
                    <movie-item v-for="(movie,index) in movies_search" v-bind:key="movie.id" v-bind:movie="movie"></movie-item>
                </v-layout>
            </v-container>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    export default {
        data() {
            return {
                search: ""
            }
        },
        name: "movie-list",
        computed: {
            ...Vuex.mapGetters(['movies']),
            movies_search: function() {
                //filtre sur le titre, l'année , la langue, le genre, le nom du rea , le prenom du rea, le nom du rea
                return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!==-1 || m.release.toLowerCase().indexOf(this.search.toLowerCase())!==-1 || m.language.toLowerCase().indexOf(this.search.toLowerCase())!==-1 ||  m.genre.toLowerCase().indexOf(this.search.toLowerCase())!==-1 || m.director.firstname.toLowerCase().indexOf(this.search.toLowerCase())!==-1 || m.director.lastname.toLowerCase().indexOf(this.search.toLowerCase())!==-1)
            }
        }
    }
</script>

<style scoped>

</style>