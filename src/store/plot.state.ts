import { Plot } from '@/types/plot.type'
import axios from 'axios'
import { create } from 'zustand'

interface PlotState {
	plots: Plot[]
	selectedPlot: Plot | null
	loading: boolean
	getPlots: (nameSubstring?: string) => Promise<void>
	getPlotById: (id: number) => Promise<void>
	createPlot: (name: string) => Promise<void>
	editPlot: (id: number, name: string) => Promise<void>
	deletePlot: (id: number) => Promise<void>
}

const BACKEND_BASE_URL = process.env.HOST || 'http://localhost:8080'

export const usePlot = create<PlotState>(set => ({
	plots: [],
	selectedPlot: null,
	loading: false,
	getPlots: async (nameSubstring?: string) => {
		try {
			set({ loading: true })
			var response = await axios.get(BACKEND_BASE_URL + '/plot', {
				params: { nameSubstring: nameSubstring }
			})
			if (response.status === 200) set({ plots: response.data as Plot[] })
			console.log(response.data)
		} catch (err) {
			console.log(err)
			console.error('Error fetching plots:', err)
		} finally {
			set({ loading: false })
		}
	},
	getPlotById: async (id: number) => {
		try {
			set({ loading: true })
			var response = await axios.get(BACKEND_BASE_URL + '/plot' + `/${id}`)
			if (response.status === 200) set({ selectedPlot: response.data as Plot })
			console.log(response.data)
		} catch (err) {
			console.log(err)
			console.error('Error fetching plots:', err)
		} finally {
			set({ loading: false })
		}
	},
	createPlot: async (name: string) => {
		try {
			set({ loading: true })
			var response = await axios.post(BACKEND_BASE_URL + '/plot', {
				name: name
			})
			if (response.status === 200) set(state => ({ plots: [...state.plots, response.data as Plot] }))
			console.log(response.data)
		} catch (err) {
			console.log(err)
			console.error('Error fetching plots:', err)
		} finally {
			set({ loading: false })
		}
	},
	editPlot: async (id: number, name: string) => {
		try {
			set({ loading: true })
			var response = await axios.patch(BACKEND_BASE_URL + `/plot/${id}`, {
				name: name
			})
			if (response.status === 200) set(state => ({ selectedPlot: response.data as Plot, plots: state.plots.map(p => p.id === id ? response.data as Plot : p) }))
			console.log(response.data)
		} catch (err) {
			console.log(err)
			console.error('Error fetching plots:', err)
		}
	},
	deletePlot: async (id: number) => {
		try {
			set({ loading: true })
			var response = await axios.delete(BACKEND_BASE_URL + '/plot' + `/${id}`)
			if (response.status === 200) set(state => ({ plots: state.plots.filter(p => p.id !== id) }))
			console.log(response.data)
		} catch (err) {
			console.log(err)
			console.error('Error fetching plots:', err)
		} finally {
			set({ loading: false })
		}
	}
}))
