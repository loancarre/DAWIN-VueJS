<template>
    <div>
        <v-layout row>
            <v-flex xs6 >
                <v-card class="ma-5 pa-3">
                    <v-card-title>
                        Informations du film
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="Titre" v-model="movie.title" :rules="titleRulesedit" required></v-text-field>
                        <v-text-field label="Genre" v-model="movie.genre" :rules="genreRulesedit" required></v-text-field>
                        <v-text-field label="Langue" v-model="movie.language" :rules="languageRulesedit" required></v-text-field>
                        <v-menu ref="inputreleaseedit" lazy :close-on-content-click="false" v-model="inputreleaseedit" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" :return-value.sync="movie.release">
                            <v-text-field slot="activator" label="Date de sortie" v-model="movie.release" prepend-icon="event" readonly :rules="releaseRulesedit" required ></v-text-field>
                            <v-date-picker v-model="movie.release"  :max="new Date().toISOString().substr(0, 10)"  no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="inputreleaseedit = false">Annuler</v-btn>
                                <v-btn flat color="primary" @click="$refs.inputreleaseedit.save(movie.release)">Valider</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs 6>
                <v-card class="ma-5 pa-3">
                    <v-card-title>
                        Informations sur le réalisateur
                    </v-card-title>
                    <v-card-text>
                        <v-text-field label="Prenom du réalisateur" v-model="movie.director.firstname" :rules="firstnameRulesedit" required></v-text-field>
                        <v-text-field label="Nom du réalisateur" v-model="movie.director.lastname" :rules="lastnameRulesedit" required></v-text-field>
                        <v-text-field label="Nationalité du réalisateur" v-model="movie.director.nationality" :rules="nationalityRulesedit" required></v-text-field>
                        <v-menu ref="inputbirthdateedit" lazy :close-on-content-click="false" v-model="inputbirthdateedit" transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px" :return-value.sync="movie.director.birthdate">
                            <v-text-field slot="activator" label="Date de naissance du réalisateur" v-model="movie.director.birthdate" prepend-icon="event" readonly :rules="birthdateRulesedit" required ></v-text-field>
                            <v-date-picker v-model="movie.director.birthdate"  :max="new Date().toISOString().substr(0, 10)"  no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn block flat color="primary" @click="inputbirthdateedit = false">Annuler</v-btn>
                                <v-btn block flat color="primary" @click="$refs.inputbirthdateedit.save(movie.director.birthdate)">Valider</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6>
                <v-card class="ml-5 mr-5 mb-5 pa-3">
                    <v-card-title>
                        Note :
                    </v-card-title>
                    <v-card-text>
                        <star-rating  v-model="movie.score"></star-rating>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card class="ml-5 mr-5 mb-5 pa-3">
                    <v-card-title>
                      Changer la photo :
                    </v-card-title>
                    <v-card-text>
                        <upload-button title="Ajouter un fichier" :selectedCallback="upload" ></upload-button>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs6>
                <div class="text-xs-center">
                    <v-btn fab dark class="" large color="blue" :to="{ name: 'MoviesList'}">
                        <v-icon dark>keyboard_return</v-icon>
                    </v-btn>
                </div>
                <!--<v-btn block flat color="orange"  >Retour</v-btn>-->
            </v-flex>
            <v-flex xs6>
                <div class="text-xs-center">
                    <v-btn fab dark class="" large color="green" @click="sauvegarderFilm">
                        <v-icon dark>done</v-icon>
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import Vuex from 'vuex'
    import axios from 'axios'
    export default {
        data() {
            return {
                showrating: false,
                inputreleaseedit : false,
                inputbirthdateedit : false,
                id: null,
                movie: null,
                titleRulesedit: [
                    v => !!v || 'Le titre est requis',
                ],
                languageRulesedit: [
                    v => !!v || 'La nationalité du film est requis',
                ],
                genreRulesedit: [
                    v => !!v || 'Le genre du film est requise',
                ],
                firstnameRulesedit:[
                    v => !!v || 'Le nom du réalisateur du film est requis',
                ],
                lastnameRulesedit: [
                    v => !!v || 'Le prénom du réalisateur du film est requis'
                ],
                nationalityRulesedit: [
                    v => !!v || 'La nationalité du réalisateur du film est requise'
                ],
                releaseRulesedit:[
                    v=> !!v || "L'année de sortie est requise"
                ],
                birthdateRulesedit:[
                    v=> !!v || "L'année de naissance du réalisateur est requise"
                ]
            }
        },
        name: "movie-edit",
        created(){
            this.id = this.$route.params.id;
            this.movie = this.movieById(this.id);
        },
        computed : {
            ...Vuex.mapGetters(['movieById'])
        },
        methods : {
            sauvegarderFilm(){
                this.updatemovie(this.movie);
            },
            ...Vuex.mapActions(['updatemovie']),
            upload(file){
                const formData = new FormData();
                formData.append("file", file);
                axios.post('http://localhost:8000/movie/upload', formData).then((response) => {
                    if(response.data.message === 'success') {
                        this.movie.picture = response.data.path.replace(/\\/g,"/");

                        this.updatemovie(this.movie);
                    }
                    else {
                        console.log(response)
                    }
                }, (err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>