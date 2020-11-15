export class Bill {
    constructor(...bills) {
        this.bills =  bills;
    }

    getTipsAndTotals() {
        let tipsAndTotals = this.bills.map(bill =>
            bill < 50 ? [bill * .2, bill * .2 + bill]
            : bill < 200 ? [bill * .15, bill * .15 + bill]
            : [bill * .1, bill * .1 + bill]);
        return tipsAndTotals;
    }

    getTips() {
        let tips = this.bills.map(bill =>
            bill < 50 ? bill * .2
            : bill < 200 ? bill * .15
            : bill * .1);
        return tips;
    }

    getTotals() {
        let tips = this.getTips();
        let totals = [];
        for (let i = 0; i < this.bills.length; i++){
            totals[i] = tips[i] + this.bills[i];
        }
        return totals;
    }
}
