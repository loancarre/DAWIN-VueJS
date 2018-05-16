<template>
    <v-flex lg4 md6 xs12 >
        <v-card class="mt-3">
            <v-layout row>
                <v-flex xs12>
                    <v-card-media :src="movie.picture"   height="470px" contain>
                    </v-card-media>
                    <v-card-title primary-title>
                        <div class="justify-center align-center">
                            <div class="headline truncate">{{movie.title}}</div>
                            <v-layout row>
                                <v-flex xs12>
                                    <span class="grey--text">Date de sortie : {{movie.release}} </span>
                                </v-flex>
                            </v-layout>
                        </div>
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-card-actions >
                    <v-layout align-center justify-center>
                        <v-flex lg 4 xs 12>
                            <v-btn :to="{ name: 'MovieEdit', params: { id: movie.id }}" flat color="green">Edit</v-btn>
                        </v-flex>
                        <v-flex lg 4 xs 12>
                            <v-btn @click="removemovie" flat color="red">Remove</v-btn>
                        </v-flex>
                        <v-flex lg 4 xs 12>
                            <v-btn :to="{ name: 'MovieDetail', params: { id: movie.id }}" flat color="orange">Detail</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-layout>
        </v-card>
    </v-flex>
</template>
<script>
    import Vuex from 'vuex'
    export default {
        props: [ "movie" ],
        name: 'movie-item',
        methods: {
            ...Vuex.mapActions(['removemovie'])
        },
    }
</script>

<style scoped>
    .truncate {
        width: 18vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>