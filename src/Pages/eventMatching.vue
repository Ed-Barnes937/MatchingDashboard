<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <h1>Event Matching</h1>
            </v-flex>
            <v-flex xs12 md6 class="py-3" v-if=canDraw>
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
            <v-flex xs12 v-if=canDraw>
                <v-data-table :headers="headers" :items="matchList" must-sort :pagination.sync="defaultSort">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{props.item.name}}</td>
                        <td class="text-xs-left">
                            <v-autocomplete :items="operatorList"
                                            item-text="operator_event_name"
                                            item-value="operator_event_id"
                                            label="select operator event"
                                            v-model="props.item.operator"
                                            dense clearable return-object/>
                        </td>
                        <td class="text-xs-left" :style="confidenceStyling(props.item.confidence*100)"><b>{{props.item.confidence*100 || 0}}%</b></td>
                        <td class="text-xs-left"><v-icon>{{props.item.confidence == 1 ? 'fa-check' : 'fa-times'}}</v-icon></td>
                        <td class="text-xs-left"><v-btn color="info" @click="match(props.item.id)">Confirm</v-btn></td>
                        <td class="text-xs-left">{{props.item.date}}</td>
                    </template>
                </v-data-table>
            </v-flex>
            <v-flex xs12 v-else class="py-5" text-xs-center>
                <v-progress-circular
                    :size="200"
                    :width="10"
                    color="red"
                    indeterminate
                />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'
    // import loadingComponent from '../Components/loadingComponent'
    // import errorComponent from '../Components/errorComponent'
    // const matchingTable = import('../Components/matchingTable')

    export default {
        name: "eventMatching",
        // components: {
        //     matchingTable: () => ({
        //         component: matchingTable,
        //         loading: loadingComponent,
        //         error: errorComponent,
        //         timeout: 3000
        //     })
        // },
        data(){
            return {
                headers: [
                    {
                    text: 'Catena Event',
                    sortable: true,
                    value: 'catenaName'
                },{
                    text: 'Operator Event',
                    sortable: false,
                    value: 'operatorName'
                },{
                    text: 'Confidence',
                    sortable: true,
                    value: 'confidence'
                },{
                    text: 'Manual Match',
                    sortable: true,
                    value: 'status'
                },{
                    text: '',
                    sortable: false,
                    value: "Confirm"
                },{
                    text: 'Date',
                    sortable: true,
                    value: 'date'
                }],
                operator: "Ladbrokes",
                defaultSort: {'sortBy': 'confidence', 'descending': true},
                matchList: [],
                canDraw :false
            }
        },
        computed: {
            operatorList() {
                return this.$store.getters.operatorList(this.operator)
            },
            BAMList() {
                return this.$store.getters.BAMList()
            },
            catenaList(){
                return this.$store.getters.catenaList()
            },
            loaded(){
                return this.$store.getters.loaded()
            }

        },
        watch: {
            loaded(val) {
                if (val) {
                    let list = this.BAMList.map(BEvent => {
                        return {
                            name: this.matchedCatEvent(BEvent.event_id).catenaName,
                            id: BEvent.event_id,
                            operator: {
                                operator_event_id: parseInt(this.BamMatchedEvents(BEvent).operator_event_id),
                                operator_event_name: this.matchedLadbrokesEvent(this.BamMatchedEvents(BEvent).operator_event_id),
                                operator_name: this.operator
                            },
                            confidence: BEvent.matched_events.filter(obj => obj.operator_name.toLowerCase() === this.operator.toLowerCase())[0].confidence || 0,
                            date: this.matchedCatEvent(BEvent.event_id).catenaDate.substring(0, 10)
                        }
                    })
                    this.matchList = list
                }
                this.canDraw = true;
            }
        },
        methods: {
            confidenceStyling(conf) {
                let textColor = (conf >= 95 ? 'green' : (conf >= 70 ? '#d1ad10' : 'red'))
                return {color: textColor}
            },
            matchedCatEvent(id) {
                if (this.catenaList) {
                    return this.catenaList.filter(obj => {
                        return obj.catenaID === id
                    })[0]
                }
            },
            matchedLadbrokesEvent(id){
                if (id) {
                    let returnVarr = this.operatorList.filter(obj => obj.operator_event_id.toString() === id.toString())[0]
                    return Object.is(returnVarr, undefined) ? "" : returnVarr.operator_event_name
                }
            },
            BamMatchedEvents(eventList){
                return eventList.matched_events.filter(obj => obj.operator_name.toLowerCase() === this.operator.toLowerCase())[0]
            },
            updateConfidence(id){
                let tempEvent = this.matchList.filter(obj => { return obj.id === id})[0]
                tempEvent.operator.confidence = 1
                this.$forceUpdate();
            },
            match(id){
                this.updateConfidence(id)
            }
        },
        created() {
            let me = this
            let home = false;

            let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qY3hPRE5CUVVFMU56RkJNakl3TWtOQk16WTJSRFV4UVVSRU5qTkJRalkyUVVRNU9ESTRSQSJ9.eyJodHRwczovL3N0Zy5jYXRlbmEubWVkaWEiOnsiYXV0aG9yaXphdGlvbiI6eyJwZXJtaXNzaW9ucyI6WyJyZWFkOmxhbmd1YWdlcyIsInJlYWQ6Y2F0ZWdvcmllcyIsInJlYWQ6Y2F0ZWdvcnlfdHlwZXMiLCJyZWFkOmNvdW50cmllcyIsInJlYWQ6Y3VycmVuY2llcyIsInJlYWQ6cGF5bWVudF9tZXRob2RzIiwiKjoqIl19LCJ1c2VyIjp7Im5hbWUiOiJFZHdhcmQgQmFybmVzIiwiZW1haWwiOiJlZHdhcmQuYmFybmVzQGNhdGVuYW1lZGlhLmNvbSIsInVzZXJfaWQiOiJnb29nbGUtb2F1dGgyfDEwNDA3ODQ3NjkzODQ0NTExNTg5NCJ9fSwiaXNzIjoiaHR0cHM6Ly9jYXRlbmFtZWRpYS1zdGFnaW5nLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNDA3ODQ3NjkzODQ0NTExNTg5NCIsImF1ZCI6WyJodHRwczovL2NhdGVuYW1lZGlhLXN0YWdpbmcuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2NhdGVuYW1lZGlhLXN0YWdpbmcuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU0MjM3Mjg0NCwiZXhwIjoxNTQyMzgwMDQ0LCJhenAiOiJRVDVoODdQMjdZSXJkTVdjU0t3MEdyYzhQOUZnaEwwVCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIifQ.vhHe6l3MR37qr3FABoBToRbDDBxH9HhDZpmE9MLiMTHMwgvwHW1Ij3I3smawt0Au7Emy_uMC58QKZT08YQIKKsZoZzjxcLubqI4YLty1jqlvpE-x6XRygxZBreg4d2ZjXrFs3uQU1cIT3CtHYGRz3uk_mjmhSwiU2Sgnn3GfcyL8sZcJH41_o3kxAoR29hT5iXrIW1WD84WUuo1ONZfY32d-JzmwIiZDuUHKZvCbaEwLrss8n9J0a62DD76Yg66LTaKI_4KZBk4uKpmeoXfXUUTrUw9FbrS0CcU2RvXG2uEJLpI0Q3zXo7j62jlslJCFesqHhMecZmpKOR64BRbfRw"
            const instance = axios.create({
                baseURL: "http://dev.catena.media:63480/",
                headers: {'authorization': 'Bearer '+token}
            })
            if (!home) {
                instance.get("/sports-events/events")
                    .then(response => {return response.data.data.items})
                    .then(data => me.$store.commit('setCatenaList',data))
                instance.get("/ladbrokes/events?sport=football")
                    .then(response => {return response.data.data.items})
                    .then(data => me.$store.commit('setLadbrokesList', (data[0].classes.class.types.type.filter(obj => {
                        return obj.typeName === 'English'
                    }))))
                instance.get("/betslip/events")
                    .then(response => {return response.data.data.items})
                    .then(data => {
                        me.$store.commit('setBamList', data)
                    })
            }
        }
    }
</script>

<style scoped>

</style>