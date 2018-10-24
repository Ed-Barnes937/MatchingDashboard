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
        eventList: [
            {
                operatorName: 'Man Utd vs Chelsea',
                catenaName: '',
                status: false,
                date: '20/10/2018',
                operator: "ladbrokes"
            },{
                operatorName: 'Southampton vs Liverpool',
                catenaName: '',
                status: false,
                date: '20/10/2018',
                operator: "ladbrokes"
            },{
                operatorName: 'Man United vs Chelsea',
                catenaName: '',
                status: false,
                date: '20/10/2018',
                operator: "bet365"
            },{
                operatorName: 'Newcastle vs Stoke',
                catenaName: '',
                status: false,
                date: '20/10/2018',
                operator: "ladbrokes"
            },{
                operatorName: 'Liverpool vs Southampton',
                catenaName: '',
                status: false,
                date: '20/10/2018',
                operator: "bet365"
            }
        ],
        catenaList: [
                'Manchester United vs Chelsea',
                'Southampton vs Liverpool',
                'Newcastle vs Stoke'
            ]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        teamList: (state) => () => {
            return state.participants
        },
        eventList: (state) => (operator) => {
            if (operator) return state.eventList.filter(event => event.operator === operator)
            else return state.eventList
        },
        catenaList: (state) => () => {
            return state.catenaList
        }
    }
})

export default store