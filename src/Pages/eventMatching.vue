<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Event Matching</h1>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="eventList">
                    <template slot="items" slot-scope="props">
                        <td text-xs-left>{{props.item.operatorName}}</td>
                        <td text-xs-left>{{props.item.catenaName}}</td>
                        <td text-xs-left>{{props.item.status}}</td>
                        <td><v-btn color="info">update</v-btn></td>
                        <tdtext-xs-left>{{props.item.date}}</tdtext-xs-left>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "eventMatching",
        data(){
            return {
                headers: [{
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
                },{
                    text: 'Date',
                    sortable: true,
                    value: 'date'
                }],
            }
        },
        computed: {
            eventList() {
                return this.$store.getters.eventList("ladbrokes")
            }
        }
    }
</script>

<style scoped>

</style>