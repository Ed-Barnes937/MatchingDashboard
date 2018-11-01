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
                <v-data-table :headers="headers" :items="eventList" must-sort :pagination.sync="defaultSort">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{props.item.operatorName}}</td>
                        <td class="text-xs-left"><v-autocomplete :items="catenaList" label="select catena event" dense clearable></v-autocomplete></td>
                        <td class="text-xs-left" :style="confidenceStyling(props.item.confidence)"><b>{{props.item.confidence}}%</b></td>
                        <td class="text-xs-left">{{props.item.status}}</td>
                        <td class="text-xs-left"><v-btn color="info">update</v-btn></td>
                        <td class="text-xs-left">{{props.item.date}}</td>
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
                    sortable: false,
                    value: 'catenaName'
                },{
                    text: 'Confidence',
                    sortable: true,
                    value: 'confidence'
                },{
                    text: 'Manual Match',
                    sortable: true,
                    value: 'status'
                },{
                    text: 'Update',
                    sortable: false,
                    value: "Update"
                },{
                    text: 'Date',
                    sortable: true,
                    value: 'date'
                }],
                operator: "ladbrokes",
                defaultSort: {'sortBy': 'confidence', 'descending': true}
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
        methods: {
            confidenceStyling(conf) {
                let textColor = (conf >= 95 ? 'green' : (conf >= 70 ? '#d1ad10' : 'red'))
                return {color: textColor}
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