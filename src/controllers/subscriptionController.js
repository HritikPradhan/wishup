const subscriptionModel = require('../models/subscriptionModel')
const userModel = require('../models/userModel')
const List = require('../plans/plan')

const BuySubscription = async function (req, res) {
    try {
        let data = req.body
        let { UserName, Plan, StartDate } = data
        let userexist = await userModel.findOne({ UserName: UserName })
        if (!userexist) {
            return res.status(404).send({ status: "Failure", message: "UserName is Invalid" })
        }
        if (!(/^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))/.test(StartDate))) {
            return res.status(400).send({ status: "Failure", message: "Date Should be In YYYY-MM-DD Format" })
        }
        if (!(Plan == "FREE" || Plan == "TRIAL" || Plan == "LITE_1M" || Plan == "PRO_1M" || Plan == "LITE_6M" || Plan == "PRO_6M")) {
            return res.status(400).send({ status: false, message: "Currently We Dont Have That Plan" })
        }
        let store;
        for (let i = 0; i < List.plans.length; i++) {
            if (List.plans[i].PlanID == Plan) {
                store = List.plans[i]
                break;
            }
        }
        if (userexist.Balance < store.Cost) {
            return res.status(400).send({ status: "Failure", message: "OOPS ! Insufficient Balance" })
        }
        let remainingbalance = userexist.Balance - store.Cost
        let validity = store.Validity
        let date = new Date(`${StartDate}`)
        let today = new Date()
        if(date<today){
            return res.status(400).send({status:"Failure",message:"Please Provide A Valid Date"})
        }
        let keep = date.setDate(date.getDate() + validity)
        data['ValidTill'] = keep
        let purchase = await subscriptionModel.create(data)
        await userModel.findOneAndUpdate({ UserName: UserName }, { Balance: remainingbalance })

        return res.status(201).send({ status: "Success", message: `Your Account Has been debited by ${store.Cost} $`, Data: purchase })

    } catch (error) {
        return res.status(500).send({ status: "Failure", message: error.message });
    }
}

const getSubscriptionDetail = async function (req, res) {
    try {
        let body = req.params.userName
        let date = req.query.Date
        let userexist = await userModel.findOne({ UserName: body })
        if (!userexist) {
            return res.status(404).send({ status: "Failure", message: "User Doesn't Exist" })
        }
        //If Any Body Wants To Find By Date
        if (date) {
            let searchbydate = await subscriptionModel.find({ UserName: body ,StartDate:date}).lean()
            if(searchbydate.length>0){
                let today = new Date()
                let todaydate = today.getDate()
                for(let i=0;i<searchbydate.length;i++){
                    searchbydate[i]["Day'sLeft"]= Math.floor((searchbydate[i].ValidTill-today)/(24 * 60 * 60 * 1000))
                    
                }
                return res.status(200).send({status:"Success",Data:searchbydate})
            }else{
                return res.status(404).send({status:"Failure",message:"No Subscription Found On the Date"})
            }
            
        }

        let subscripts = await subscriptionModel.find({ UserName: body }).select({ _id: 0, __v: 0, UserName: 0 })
        if (subscripts.length == 0) {
            return res.status(404).send({ status: "Failure", message: `Currently user-${body} doesn't Have Any Active Plan` })
        }
        return res.status(200).send({ status: "Success", Subscription: subscripts })


    } catch (error) {
        return res.status(500).send({ status: "Failure", message: error.message });
    }
}


module.exports = { BuySubscription, getSubscriptionDetail }