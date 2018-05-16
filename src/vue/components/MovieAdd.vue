<template>
    <v-dialog v-model="showModal" max-width="900px">
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step step="1" editable :complete="e1 > 1">Choisir la méthode d'ajout</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="e1 > 2">Rentrer à la main</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Choisir le film</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-layout row>
                        <v-flex xs6>
                            <v-btn @click="e1 = 2" large block flat>Ajouter par formulaire</v-btn>
                        </v-flex>
                        <v-flex xs6>
                            <v-btn @click="e1 = 3" large block flat>Ajouter depuis une base de donnée</v-btn>
                        </v-flex>
                    </v-layout>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <h4 class="text-xs-center">Ajouter un film</h4>
                    <v-form v-model="valid">
                        <v-text-field label="Titre" v-model="title" :rules="titleRules" required></v-text-field>
                        <v-text-field label="Nationalité" v-model="language" :rules="languageRules"
                                      required></v-text-field>
                        <v-text-field label="Genre" v-model="genre" :rules="genreRules" required></v-text-field>
                        <v-menu ref="inputrelease" lazy :close-on-content-click="false" v-model="inputrelease"
                                transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px"
                                :return-value.sync="release">
                            <v-text-field slot="activator" label="Date de sortie" v-model="release" prepend-icon="event"
                                          readonly :rules="releaseRules" required></v-text-field>
                            <v-date-picker v-model="release" :max="new Date().toISOString().substr(0, 10)" no-title
                                           scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="inputrelease = false">Annuler</v-btn>
                                <v-btn flat color="primary" @click="$refs.inputrelease.save(release)">Valider</v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-text-field label="Prenom du réalisateur" v-model="firstname" :rules="firstnameRules"
                                      required></v-text-field>
                        <v-text-field label="Nom du réalisateur" v-model="lastname" :rules="lastnameRules"
                                      required></v-text-field>
                        <v-text-field label="Nationalité du réalisateur" v-model="nationality" :rules="nationalityRules"
                                      required></v-text-field>
                        <v-menu ref="inputbirthdate" lazy :close-on-content-click="false" v-model="inputbirthdate"
                                transition="scale-transition" offset-y full-width :nudge-right="40" max-width="290px"
                                :return-value.sync="birthdate">
                            <v-text-field slot="activator" label="Date de naissance du réalisateur" v-model="birthdate"
                                          prepend-icon="event" readonly :rules="birthdateRules" required></v-text-field>
                            <v-date-picker v-model="birthdate" :max="new Date().toISOString().substr(0, 10)" no-title
                                           scrollable>
                                <v-spacer></v-spacer>
                                <v-btn block flat color="primary" @click="inputbirthdate = false">Annuler</v-btn>
                                <v-btn block flat color="primary" @click="$refs.inputbirthdate.save(birthdate)">
                                    Valider
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-form>
                    <upload-button title="Ajouter un fichier" :selectedCallback="upload" ></upload-button>
                    <v-btn color="primary" class="right" flat @click="savemovie">Valider</v-btn>
                    <v-btn color="primary" flat @click.stop="hideModal">Annuler</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-text-field name="film" @change="searchApi" v-model="api"
                                  label="Rechercher un film par nom"></v-text-field>
                    <v-btn block color="primary">Rechercher</v-btn>
                    <v-layout row wrap>
                        <v-flex xs6 v-for="(movie,index) in moviesapi" :key="index">
                            <v-card class="ma-4">
                                <v-layout row>
                                    <v-card-media :src="movie.Poster" contain></v-card-media>
                                    <v-card-title primary-title>
                                        <div class="justify-center align-center">
                                            <div class="headline">{{movie.Title}}</div>
                                            <v-layout row>
                                                <v-flex xs12>
                                                    <span class="grey--text">Date de sortie : {{movie.Year}} </span>
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                    </v-card-title>
                                </v-layout>
                                <v-layout row>
                                    <v-card-actions>
                                        <v-btn block @click="ChooseFilm(movie)" flat color="red">Ajouter</v-btn>
                                    </v-card-actions>
                                </v-layout>
                            </v-card>
                        </v-flex>
                    </v-layout>

                    {{message}}
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-dialog>
</template>

<script>
    import Vuex from 'vuex'
    import axios from 'axios'

    export default {
        data: () => ({
            api: null,
            e1: null,
            message: null,
            valid: false,
            showModal: false,
            inputrelease: false,
            inputbirthdate: false,
            moviesapi: null,
            title: "",
            titleRules: [
                v => !!v || 'Le titre est requis',
            ],
            language: null,
            languageRules: [
                v => !!v || 'La nationalité du film est requis',
            ],
            genre: null,
            genreRules: [
                v => !!v || 'Le genre du film est requise',
            ],
            firstname: null,
            firstnameRules: [
                v => !!v || 'Le nom du réalisateur du film est requis',
            ],
            lastname: null,
            lastnameRules: [
                v => !!v || 'Le prénom du réalisateur du film est requis'
            ],
            nationality: null,
            nationalityRules: [
                v => !!v || 'La nationalité du réalisateur du film est requise'
            ],
            release: null,
            releaseRules: [
                v => !!v || "L'année de sortie est requise"
            ],
            birthdate: null,
            birthdateRules: [
                v => !!v || "L'année de naissance du réalisateur est requise"
            ],
            picture : null

        }),
        name: "movie-add",
        computed: {
            ...Vuex.mapGetters(['count']),
        },
        methods: {
            ...Vuex.mapActions(['addmovie', 'addmovieapi']),
            savemovie() {
                let movie = {
                    id: this.count + 1,
                    title: this.title,
                    language: this.language,
                    release: this.release,
                    director: {
                        firstname: this.firstname,
                        lastname: this.lastname,
                        nationality: this.nationality
                        , birthdate: this.birthdate
                    },
                    genre: this.genre,
                    picture: this.picture

                };
                this.addmovie(movie);
                this.resetchamp();
                this.hideModal();
                this.e1 = 1;
            },
            hideModal() {
                this.showModal = false;
            },
            resetchamp() {
                this.title = null;
                this.language = null;
                this.release = null;
                this.firstname = null;
                this.lastname = null;
                this.nationality = null;
                this.birthdate = null;
                this.picture = null;
            },
            searchApi() {
                let argument = this.api;
                axios.get('http://www.omdbapi.com/?s=' + argument + '&apikey=1d14daf7&type=movie&r=json')
                    .then(response => {
                        if (response.data.Search.length === 0) {
                            this.message = 'Pas de résultat';
                        }
                        else {
                            this.moviesapi = response.data.Search;
                        }

                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            ChooseFilm(movie) {
                axios.get('http://www.omdbapi.com/?i=' + movie.imdbID + '&apikey=1d14daf7&')
                    .then(response => {
                        this.addmovieapi(response.data);
                        this.showModal = false;
                        this.e1 = 1;
                        this.moviesapi = [];
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            upload(file){
                const formData = new FormData();
                formData.append("file", file);
                axios.post('http://localhost:8000/movie/upload', formData).then((response) => {
                    if(response.data.message === 'success') {
                        this.picture = response.data.path.replace(/\\/g,"/");
                    }
                    else {
                        console.log(response)
                    }
                }, (err) => {
                    console.log(err)
                })
            }
        },
        created() {
            window.Event.$on('modalAdd', show => {
                this.showModal = show
            })
        }
    }
</script>

<style scoped>

</style>