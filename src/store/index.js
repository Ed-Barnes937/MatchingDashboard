import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        participants: [
            {name: "Manchester United"},
            {name: "Chelsea"},
            {name: "Southampton"},
            {name: "Liverpool"},
            {name: "Newcastle"},
            {name: "Stoke"}
        ],
        catenaList: [
            {
                catenaName: 'Manchester United vs Chelsea',
                catenaID: 0,
                matchedEvents: [{
                    id: 0,
                    confidence: 58,
                    status: false,
                    operator: "Ladbrokes"
                }],
                date: '20/10/2018',
            },{
                catenaName: 'Southampton vs Liverpool',
                catenaID: 1,
                matchedEvents: [{
                    id: 1,
                    confidence: 75,
                    status: false,
                    operator: "Ladbrokes",
                }],
                date: '20/10/2018'
            },{
                catenaName: 'Newcastle vs Stoke',
                catenaID: 2,
                matchedEvents: [{
                    id: 2,
                    confidence: 95,
                    status: false,
                    operator: "Ladbrokes"
                }],
                date: '20/10/2018'
            }
        ],
        LadbrokesList: [
            {
            operatorName: 'Man Utd vs Chelsea',
            operatorID: 0
        },{
            operatorName: 'Soton vs Liverpool',
            operatorID: 1
        }, {
            operatorName: 'N\'castle vs Stoke',
            operatorID: 2
        }],
        Bet365List: [
            {
            operatorName: 'Manchester Utd vs Chelsea',
            operatorID: 0
        },{
            operatorName: 'Soton vs Liverpool',
            operatorID: 1
        }, {
            operatorName: 'Newcastle vs Stoke',
            operatorID: 2
        }]
    },
    mutations: {
        setLadbrokesList(state, payload){
            let tempList = payload[0].subtypes.subtype.filter(obj => {
                return obj.subTypeName === 'Premier League'
            })
            tempList = tempList[0].events.event.filter(obj => {
                return obj.eventSort === 'MTCH'
            })
            console.log(tempList)
            tempList = tempList.map(obj => {
                return {
                    operatorName: obj.eventName,
                    operatorID: obj.eventKey
                }
            })
            console.log(tempList)

        },
        setCatenaList(state, payload){
            let idList = []
            payload.filter(obj => {
                return obj.sports_type === 'football'
            }).forEach(event => idList.push(event._id))
            console.log(idList)
        }
    },
    actions: {

    },
    getters: {
        teamList: (state) => () => {
            return state.participants
        },
        operatorList: (state) => (operator) => {
            return state[operator+"List"] || [{operatorName: "No Data"}]
        },
        catenaList: (state) => () => {
            return state.catenaList
        },
        operatorName: (state) => (operator, id) => {
            return state[operator+"List"].filter(obj => obj.operatorID === id)[0].operatorName
        }
    }
})

export default store