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