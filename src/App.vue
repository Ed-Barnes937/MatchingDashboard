<template>
    <v-app>
        <Dashboard></Dashboard>
    </v-app>
</template>

<script>
	import Dashboard from '@/Pages/dashboard'

	export default {
		name: 'App',
		components: {
			Dashboard : Dashboard
		}
	}
</script>