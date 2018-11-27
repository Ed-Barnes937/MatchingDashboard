import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        loaded: false,
        catenaList: [

        ],
        BAMList: [
            // {
            //     event_id: "faaaaaaaaaaabbbbbbbbbbb4",
            //     matched_events: [{
            //         operator_event_id: 0,
            //         confidence: 58,
            //         status: false,
            //         operator_name: "ladbrokes"
            //     }],
            // },{
            //     event_id: "faaaaaaaaaaabbbbbbbbbbb3",
            //     matched_events: [{
            //         operator_event_id: 1,
            //         confidence: 75,
            //         status: false,
            //         operator_name: "ladbrokes",
            //     }],
            // },{
            //     event_id: "faaaaaaaaaaabbbbbbbbbbb1",
            //     matched_events: [{
            //         operator_event_id: 2,
            //         confidence: 95,
            //         status: false,
            //         operator_name: "ladbrokes"
            //     }],
            // }
        ],
        ladbrokesList: [
        //     {
        //     operatorName: 'Man Utd vs Chelsea',
        //     operatorID: 0,
        //     confidence: 69
        // },{
        //     operatorName: 'Soton vs Liverpool',
        //     operatorID: 1
        // }, {
        //     operatorName: 'N\'castle vs Stoke',
        //     operatorID: 2
        // }
        ],
        Bet365List: [
            {
                operatorName: 'Manchester Utd vs Chelsea',
                operatorID: 0
            },
            {
                operatorName: 'Soton vs Liverpool',
                operatorID: 1
            },
            {
                operatorName: 'Newcastle vs Stoke',
                operatorID: 2
            }
        ]
    },
    mutations: {
        setLadbrokesList(state, payload){
            state.loaded = false
            let ladList =[{
                operator_event_name: "No match",
                operator_event_id: 0,
                operator_name: 'ladbrokes'
            }]

            let tempList = payload[0].subtypes.subtype.filter(obj => {
                return obj.subTypeName === 'Premier League'
            })
            tempList = tempList[0].events.event.filter(obj => {
                return obj.eventSort === 'MTCH'
            })
            tempList = tempList.map(obj => {
                return {
                    operator_event_name: obj.eventName,
                    operator_event_id: obj.eventKey,
                    operator_name: 'ladbrokes'
                }
            })
            ladList.push(...tempList)
            state.ladbrokesList = ladList
            state.loaded = true;
        },

        setCatenaList(state, payload){
            let idList = []
            idList = payload.filter(obj => {
                return obj.sports_type === 'football'
            }).map(event => {
                return {
                    catenaName: event.name,
                    catenaID: event._id,
                    catenaDate: event.datetime
                }
            })
            state.catenaList = idList
        },

        setBamList(state, payload){
            let tempList = payload
            tempList.forEach(obj => {
                obj.matched_events.forEach(op => {
                    op.matched_confidence = op.matched_confidence || 0
                })
            })
            state.BAMList = tempList
        },

        setLoad(state, payload){
            state.loaded = payload
        }
    },
    actions: {

    },
    getters: {
        teamList: (state) => () => {
            return state.participants
        },
        operatorList: (state) => (operator) => {
            return state[operator.toLowerCase()+"List"] || [{operatorName: "No Data"}]
        },
        catenaList: (state) => () => {
            return state.catenaList
        },
        operatorName: (state) => (operator, id) => {
            return state[operator+"List"].filter(obj => obj.operatorID === id)[0].operatorName
        },
        BAMList: (state) => () => {
            return state.BAMList
        },
        loaded: (state) => () => {
            return state.loaded
        }
    }
})

export default store