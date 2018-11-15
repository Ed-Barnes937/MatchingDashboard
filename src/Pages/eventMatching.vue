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
                <v-data-table :headers="headers" :items="matchList" must-sort :pagination.sync="defaultSort">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left">{{props.item.catenaName}}</td>
                        <td class="text-xs-left">
                            <v-autocomplete :items="operatorList"
                                            item-text="operatorName"
                                            item-value="operatorID"
                                            label="select operator event"
                                            v-model="props.item.operator"
                                            dense clearable return-object/>
                        </td>
                        <td class="text-xs-left" :style="confidenceStyling(props.item.confidence)"><b>{{props.item.confidence}}%</b></td>
                        <td class="text-xs-left"><v-icon>{{props.item.status ? 'fa-check' : 'fa-times'}}</v-icon></td>
                        <td class="text-xs-left"><v-btn color="info" @click="match(props.item.catenaID)">Confirm</v-btn></td>
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
                tempData: []
            }
        },
        computed: {
            operatorList() {
                return this.$store.getters.operatorList(this.operator)
            },
            catenaList() {
                return this.$store.getters.catenaList()
            },
        },
        mounted() {
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
                this.matchList = list
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
            updateConfidence(id){
                let catenaEvent = this.matchList.filter(obj => obj.catenaID === id)[0]
                catenaEvent.confidence = 100
                catenaEvent.status = true

            },
            match(id){
                this.updateConfidence(id)
            }
        },
        created() {
            let me = this
            let home = false;

            let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qY3hPRE5CUVVFMU56RkJNakl3TWtOQk16WTJSRFV4UVVSRU5qTkJRalkyUVVRNU9ESTRSQSJ9.eyJodHRwczovL3N0Zy5jYXRlbmEubWVkaWEiOnsiYXV0aG9yaXphdGlvbiI6eyJwZXJtaXNzaW9ucyI6WyJyZWFkOmxhbmd1YWdlcyIsInJlYWQ6Y2F0ZWdvcmllcyIsInJlYWQ6Y2F0ZWdvcnlfdHlwZXMiLCJyZWFkOmNvdW50cmllcyIsInJlYWQ6Y3VycmVuY2llcyIsInJlYWQ6cGF5bWVudF9tZXRob2RzIiwiKjoqIl19LCJ1c2VyIjp7Im5hbWUiOiJFZHdhcmQgQmFybmVzIiwiZW1haWwiOiJlZHdhcmQuYmFybmVzQGNhdGVuYW1lZGlhLmNvbSIsInVzZXJfaWQiOiJnb29nbGUtb2F1dGgyfDEwNDA3ODQ3NjkzODQ0NTExNTg5NCJ9fSwiaXNzIjoiaHR0cHM6Ly9jYXRlbmFtZWRpYS1zdGFnaW5nLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNDA3ODQ3NjkzODQ0NTExNTg5NCIsImF1ZCI6WyJodHRwczovL2NhdGVuYW1lZGlhLXN0YWdpbmcuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2NhdGVuYW1lZGlhLXN0YWdpbmcuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU0MjI3NjY2NSwiZXhwIjoxNTQyMjgzODY1LCJhenAiOiJRVDVoODdQMjdZSXJkTVdjU0t3MEdyYzhQOUZnaEwwVCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIifQ.w62OlZQw1WHPae2CwweLs6TfowcXiZ0ZLRWL13PXF5yFZlRN7KC3wwC0ppwcNwKjeYSGsASViRdIN0aTs5FHI5LBAdk64fgYejWe09suElg1pTvDz8tP6ln9XJGqf45NqM5jkIi1oudvD8af-8pUq8jL6YolJHC6S3IV7r33wR11NaxbVmp_EnJfKnYp9pEvSEWVbARVCpP44MdC8KmOY2lrAo7l-R3YH-XxN-aM_O-1yOuIPO9HsNowWKqCW0uQ7BIbHBjkLPSWGfI9eVTEVCbUJnkeEYMSDQ-sX_ZASAZqE38X5aduSSv9ovsqLdePOtoF5hu_089g5Ed6skxDBg"
            const instance = axios.create({
                headers: {'Authorization': 'Bearer '+token}
            })
            if (!home) {
                instance.get("https://ms-proxy.catena.media/stg/sports-events/events")
                    .then(response => {return response.data.data.items})
                    .then(data => me.$store.commit('setCatenaList',data))
                instance.get("https://ms-proxy.catena.media/stg/ladbrokes/events?sport=football")
                    .then(response => {return response.data.data.items})
                    .then(data => me.$store.commit('setLadbrokesList', (data[0].classes.class.types.type.filter(obj => {
                        return obj.typeName === 'English'
                    }))))
            }
        }
    }
</script>

<style scoped>

</style>