let plans = [
    {
        PlanID: "FREE",
        Validity: Infinity,
        Cost: 0
    }, {
        PlanID: "TRIAL",
        Validity: 7,
        Cost: 0
    }, {
        PlanID: "LITE_1M",
        Validity: 30,
        Cost: 100
    }, {
        PlanID: "PRO_1M",
        Validity: 30,
        Cost: 200
    }, {
        PlanID: "LITE_6M",
        Validity: 180,
        Cost: 500
    }, {
        PlanID: "PRO_6M",
        Validity: 180,
        Cost: 900
    }
]

module.exports = { plans }