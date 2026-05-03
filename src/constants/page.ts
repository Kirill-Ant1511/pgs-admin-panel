export class Pages {
    static DASHBOARD = '/dashboard';

    // Plots url
    static PLOTS = this.DASHBOARD + '/plots';
    static CREATE_PLOT = this.PLOTS + '/create';
    static EDIT_PLOT = (id: number) => `${this.PLOTS}/${id}/edit`;

    // Type works url
    static TYPE_WORKS = this.DASHBOARD + '/type-works';
    static CREATE_TYPE_WORK = this.TYPE_WORKS + '/create';
    static EDIT_TYPE_WORK = (id: number) => this.TYPE_WORKS + '/' + id + '/edit';

    static SUBTYPE_WORKS = this.DASHBOARD + '/subtype-works';
    static CREATE_SUBTYPE_WORK = this.SUBTYPE_WORKS + '/create';
    static EDIT_SUBTYPE_WORK = (id: number) => this.SUBTYPE_WORKS + '/' + id + '/edit';
    static PLANS = this.DASHBOARD + '/plans';
    static CREATE_PLAN = this.PLANS + '/create';
    static EDIT_PLAN = (id: number) => this.PLANS + '/' + id + '/edit';
    static REPORTS = this.DASHBOARD + '/reports';
    static CREATE_REPORT = this.REPORTS + '/create';

    static USERS = this.DASHBOARD + '/users';
    static CREATE_USER = this.USERS + '/create';
    static EDIT_USER = (id: string) => `${this.USERS}/${id}/edit`;
}
