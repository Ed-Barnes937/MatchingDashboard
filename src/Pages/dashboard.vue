<template>
    <div>
        <v-navigation-drawer
                persistent
                :mini-variant="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                enable-resize-watcher
                fixed
                app>
            <v-list>
                <v-list-tile
                        value="true"
                        v-for="(item, i) in sidebar"
                        :key="i"
                        :to="item.path"
                        router
                        ripple>
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.label"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                :class="['catena']"
                :clipped-left="clipped"
                dark
                app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
        </v-toolbar>
        <v-content>
            <v-container>
                <router-view/>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    export default {
        name: "dashboard",
        data () {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                miniVariant: true,
                right: true,
                rightDrawer: false,
                title: 'Catena Dashboard'
            }
        },
        computed: {
            sidebar () {
                return this.$router.options.routes.filter(route => route.render)
            }
        }
    }
</script>

<style scoped>

</style>