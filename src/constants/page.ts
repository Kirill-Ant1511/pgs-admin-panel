export class Pages {
	static DASHBOARD = '/dashboard'

	// Plots url
	static PLOTS = this.DASHBOARD + '/plots'
	static CREATE_PLOT = this.PLOTS + '/create'
	static EDIT_PLOT = (id: number) => this.PLOTS + '/' + id + '/edit'

	// Type works url
	static TYPE_WORKS = this.DASHBOARD + '/type-works'
	static CREATE_TYPE_WORK = this.TYPE_WORKS + '/create'
	static EDIT_TYPE_WORK = (id: number) => this.TYPE_WORKS + '/' + id + '/edit'

	static SUBTYPE_WORKS = this.DASHBOARD + '/subtype-works'
	static PLANS = this.DASHBOARD + '/plans'
	static CREATE_PLAN = this.PLANS + '/create'
	static REPORTS = this.DASHBOARD + '/reports'
}
