<template>
    <div>
        <v-layout row>
            <v-flex xs4>
                <v-card class="ma-5  pa-5">
                    <h1 class="dark--text">{{movie.title}}</h1>
                </v-card>
                <v-card class="ma-5 pa-4">
                    <v-card-media :src="movie.picture"  height="500" contain></v-card-media>
                </v-card>
            </v-flex>
            <v-flex xs8>
                <v-layout row>
                    <v-flex xs6>
                        <v-card class="ma-5  pa-4">
                            <h4>Information du film : </h4>
                            <div>Sortie le : {{movie.release}}</div>
                            <div>Nationalité du film : {{movie.language}}</div>
                            <div>Genre du film : {{movie.genre}}</div>
                        </v-card>
                    </v-flex>
                    <v-flex xs6>
                        <v-card class="ma-5  pa-4">
                            <h4>Information du Réalisateur : </h4>
                            <div>nom : {{movie.director.lastname}}</div>
                            <div>prenom : {{movie.director.firstname}}</div>
                            <div>Nationalité : {{movie.director.nationality}}</div>
                            <div>Année de naissance : {{movie.director.birthdate}}</div>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs6>
                        <v-card  class="ma-5  pa-4">
                            <v-card-title>
                                Note :
                            </v-card-title>
                            <v-card-text>
                                <star-rating  v-model="movie.score"></star-rating>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-card class="ma-5  pa-4">
                    <v-card-actions >
                        <v-layout align-center justify-center>
                            <v-flex xs 4>
                                <div class="text-xs-center">
                                    <v-btn fab dark class="" large color="blue" :to="{ name: 'MoviesList'}">
                                        <v-icon dark>keyboard_return</v-icon>
                                    </v-btn>
                                </div>
                            </v-flex>
                            <v-flex xs 4>
                                <div class="text-xs-center">
                                    <v-btn fab dark class="" large color="red" @click="removeFilm">
                                        <v-icon dark>delete</v-icon>
                                    </v-btn>
                                </div>
                            </v-flex>
                            <v-flex xs4>
                                <div class="text-xs-center">
                                    <v-btn fab dark class="" large color="green" :to="{ name: 'MovieEdit', params: { id: movie.id }}">
                                        <v-icon dark>mode_edit</v-icon>
                                    </v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-flex>

        </v-layout>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import router from '../routes'
    export default {
        data() {
            return {
                id: null,
                movie: null
            }
        },
        name: "movie-detail",
        methods : {
            ...Vuex.mapActions(['removemovie']),
            removeFilm(){
                this.removemovie(this.movie);
                router.push({ path: '/' })
            }
        },
        computed : {
            ...Vuex.mapGetters(['movieById'])
        },
        created(){
            this.id = this.$route.params.id;
            this.movie = this.movieById(this.id);
        }
    }
</script>

<style scoped>

</style>