<template>
    <div class="navigation">
        <v-navigation-drawer fixed v-model="drawer" app :mini-variant="mini">
            <v-list dense>
                <v-list-tile v-for="item in menu" :key="item.title" @click="clickNavigation(item)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar light fixed app>
            <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-toolbar>
    </div>
</template>
<script>
import router from '../routes'
export default {
    data: () => ({
        drawer: true,
        mini: true,
        menu: [
            { title: 'Liste des films', icon: 'movie', path:'/' },
            {title : 'Ajouter un film', icon :'add'}
        ]
    }),
    methods : {
        clickNavigation(item){
            if(item.icon === 'add'){
               window.Event.$emit('modalAdd', true);
            }
            else {
                router.push({ path: item.path })
            }
        },

    }
}
</script>
