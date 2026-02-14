export class Pages {
	static DASHBOARD = '/dashboard'

	// Plots url
	static PLOTS = this.DASHBOARD + '/plots'
	static CREATE_PLOT = this.PLOTS + '/create'
	static EDIT_PLOT = (id: number) => this.PLOTS + '/' + id + '/edit'

	static TYPE_WORKS = this.DASHBOARD + '/type-works'
	static SUBTYPE_WORKS = this.DASHBOARD + '/subtype-works'
	static PLANS = this.DASHBOARD + '/plans'
	static REPORTS = this.DASHBOARD + '/reports'
}
