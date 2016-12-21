class AppCtrl {

    public title;

    public lineChart: any;

    // previous value used for watching
    private previousCycle: any = {};


    constructor() {
        this.title = 'analytics-ui-components (ng1-ts)';
    }

    $onInit() {
        this.lineChart = {
            array1: [{x: 0, y: 2}, {x: 1, y: 4}, {x: 2, y: 1}, {x: 3, y: 8}]
        }
    }

    $doCheck() {
        if (this.previousCycle.array1 !== this.lineChart.array1) {

            let random = [];
            for (let i = 0; i < 15; i++) {
                random.push({
                    x: i + 4,
                    y: Math.random() * 10
                });
            }
            this.lineChart.array2 = this.lineChart.array1.concat(random);

            this.previousCycle.array1 = this.lineChart.array1;
        }
    }

}


export default AppCtrl;