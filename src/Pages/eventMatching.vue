<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Event Matching</h1>
            </v-flex>
            <v-flex xs12 md6 class="py-3">
                <v-btn-toggle v-model="operator" mandatory>
                    <v-btn flat value="Ladbrokes">
                        <v-icon>fa-futbol</v-icon>
                        ladbrokes
                    </v-btn>
                    <v-btn flat value="Bet365">
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
                <v-data-table :headers="headers" :items="matchedList" must-sort :pagination.sync="defaultSort">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{props.item.catenaName}}</td>
                        <td class="text-xs-left">
                            <v-autocomplete :items="operatorList"
                                            item-text="operatorName"
                                            item-value="operatorID"
                                            label="select catena event"
                                            v-model="props.item.operator"
                                            dense clearable return-object/>
                        </td>
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
                    value: 'operatorName'
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
                operator: "Ladbrokes",
                defaultSort: {'sortBy': 'confidence', 'descending': true}
            }
        },
        computed: {
            operatorList() {
                return this.$store.getters.operatorList(this.operator)
            },
            catenaList() {
                return this.$store.getters.catenaList()
            },
            matchedList() {
                let list = this.catenaList.map(event => (
                    {
                        catenaName: event.catenaName,
                        catenaID: event.catenaID,
                        operator: {
                            operatorName: this.$store.getters.operatorName(this.operator, this.matchedEvent(event).id),
                            operatorID: this.matchedEvent(event).id
                        },
                        confidence: this.matchedEvent(event).confidence,
                        status: this.matchedEvent(event).status,
                        date: event.date,
                    }
                ))
                return list
            }
        },
        methods: {
            confidenceStyling(conf) {
                let textColor = (conf >= 95 ? 'green' : (conf >= 70 ? '#d1ad10' : 'red'))
                return {color: textColor}
            },
            matchedEvent(catenaEvent) {
                return catenaEvent.matchedEvents.filter(obj => obj.operator === this.operator)[0]
            },
            matchedOpEvent(event) {
                let id = event.filter(obj => obj.operator === this.operator).id
                return this.operatorList.map(obj => obj.id === id).operatorName
            },
            test() {
                console.log("test")
                return "test"
            }


        },
        created() {
            let home = false;
            if (!home) {
                axios.get("http://sports-events-ms-stg.catena.media/events")
                    .then(response => console.log(response))
            }
        }
    }
</script>

<style scoped>

</style>