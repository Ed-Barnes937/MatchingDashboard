import Vue from 'vue'
import Router from 'vue-router'
import BetReceipts from '@/Pages/betReceipts'
import EventMatching from '@/Pages/eventMatching'
import OperatorKeys from '@/Pages/operatorKeys'

Vue.use(Router)

const router = new Router({
	mode: '',
	routes: [{
		path:'/',
		name:'Home',
		redirect:'/matching'
	}, {
		path:'/matching',
		name:'Event Matching',
		component: EventMatching,
		icon: 'fa-exchange-alt',
		label: 'Event Matching',
		render: true
	}, {
		path:'/receipts',
		name:'Bet Receipts',
		component: BetReceipts,
		icon: 'fa-receipt',
		label: 'Bet Receipt',
		render: true
	}, {
        path:'/keys',
        name:'Operator Keys',
        component: OperatorKeys,
        icon: 'fa-key',
        label: 'Operator Keys',
        render: true
    }
	]
})

export default router