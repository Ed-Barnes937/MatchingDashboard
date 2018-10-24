<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Event Matching</h1>
            </v-flex>
            <v-flex xs12 md6 class="py-3">
                <v-btn-toggle v-model="operator">
                    <v-btn flat value="ladbrokes">
                        <v-icon>fa-futbol</v-icon>
                        ladbrokes
                    </v-btn>
                    <v-btn flat value="bet365">
                        <v-icon>fa-volleyball-ball</v-icon>
                        bet365
                    </v-btn>
                    <v-btn flat value="Coral">
                        <v-icon>fa-basketball-ball</v-icon>
                        Coral
                    </v-btn>
                </v-btn-toggle>
            </v-flex>
            <v-flex xs12>
                <v-data-table :headers="headers" :items="eventList">
                    <template slot="items" slot-scope="props">
                        <td text-xs-left>{{props.item.operatorName}}</td>
                        <td text-xs-left><v-autocomplete :items="catenaList" label="select catena event" dense clearable></v-autocomplete></td>
                        <td text-xs-left>{{props.item.status}}</td>
                        <td><v-btn color="info">update</v-btn></td>
                        <td text-xs-left>{{props.item.date}}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "eventMatching",
        data(){
            return {
                headers: [
                    {
                    text: 'Operator Event',
                    sortable: true,
                    value: 'ladbrokesName'
                },{
                    text: 'Catena Event',
                    sortable: true,
                    value: 'catenaName'
                },{
                    text: 'Status',
                    sortable: true,
                    value: 'status'
                },{
                    text: 'Update',
                    sortable: true,
                    value: "Update"
                },{
                    text: 'Date',
                    sortable: true,
                    value: 'date'
                }],
                operator: "ladbrokes"
            }
        },
        computed: {
            eventList() {
                return this.$store.getters.eventList(this.operator)
            },
            catenaList() {
                return this.$store.getters.catenaList()
            }
        },
        created() {
            axios.get("http://sports-events-ms-stg.catena.media/events")
                .then(response => console.log(response))
        }
    }
</script>

<style scoped>

</style>