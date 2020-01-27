<template>
    <div class="dashboard">
        <header class="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="title">
                            <i><marquee direction="right">Welcome to dashboard, feel free to perform the company daily sales transaction.</marquee></i>
                        </h1>
                    </div>
                </div>
            </div>
        </header>
        <section class="dashboard">
            <div class="dashboard-section">
                <div class="container-fluid">
                    <div class="row" style="margin:0">
                        <div class="col-md-12">
                            <div class="content">
                                <ul class="list-inline">
                                     <li><button class="btn btn-default" @click="viewRecord"><i class="fa fa-eye"></i></button></li>
                                     <li><button class="btn btn-default" @click="addRows"><i class="fa fa-plus"></i></button></li>
                                </ul>
                            </div>
                            <hr class="hr-group">
                        </div>
                        <div class="table-content" id="printContent">
                                <h1>MAINLAND OIL GAS CO LTD <br>DAILY SALES RECORD BOOK</h1>
                                <h3>Date: <input type="text" v-model="createOn" readonly></h3>
                                <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>Pumples</th>
                                            <th>Opening(meter)</th>
                                            <th>Closing(meter)</th>
                                            <th>Return to tank</th>
                                            <th>Daily Sales</th>
                                            <th>Open Stock</th>
                                            <th>Quality Recieved</th>
                                            <th>Total at hand</th>
                                            <th>Theoretical</th>
                                            <th>Physical</th>
                                            <th>Difference</th>
                                            <th>Price</th>
                                            <th>Ph. Stk. Value</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(dailySalesResult, index) in dailySalesResults" :key="index" class="form-input">
                                            <td>{{ index + 1}}</td>
                                            <td><input type="text" v-model="dailySalesResult.pumples"></td>
                                            <td><input type="text" v-model="dailySalesResult.meterOpening" @keyup="meterOpening"></td>
                                            <td><input type="text" v-model="dailySalesResult.meterClosing" @keyup="meterClosing"></td>
                                            <td><input type="text" v-model="dailySalesResult.returnToTank"></td>
                                            <td><input type="text" :value ="dailySalesResult.dailySales = parseFloat(dailySalesResult.meterClosing) - parseFloat(dailySalesResult.meterOpening) - dailySalesResult.returnToTank" readonly></td>
                                            <td><input type="text" v-model="dailySalesResult.OpenStock"></td>
                                            <td><input type="text" v-model="dailySalesResult.qualityRecieved"></td>
                                            <td><input type="text" :value="dailySalesResult.totalAtHand = parseFloat(dailySalesResult.OpenStock) + (dailySalesResult.qualityRecieved ? parseFloat(dailySalesResult.qualityRecieved):dailySalesResult.qualityRecieved)" readonly></td>
                                            <td><input type="text" :value="dailySalesResult.theoretical = parseFloat(dailySalesResult.totalAtHand) - parseFloat(dailySalesResult.dailySales)" readonly></td>
                                            <td><input type="text" v-model="dailySalesResult.physical"></td>
                                            <td><input type="text" :value="dailySalesResult.difference = parseFloat(dailySalesResult.physical) - parseFloat(dailySalesResult.theoretical)" readonly></td>
                                            <td><input type="text" v-model="dailySalesResult.price"></td>
                                            <td><input type="text" :value="dailySalesResult.stockValue = dailySalesResult.dailySales * dailySalesResult.price" readonly></td>
                                            <td>
                                                <ul class="list-inline bg-button">
                                                    <li><button class="btn btn-default" @click="removeRow(index)"><i class="fa fa-trash"></i></button></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                                <hr class="hr-group">
                                <div class="transaction">
                                    <h4 class="title">Total Transactions</h4>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <p>Cash brought forward <input type="text" :value="cashForward = parseFloat(sales) - (pos ? parseFloat(pos): pos) - bankDeposit - expenses" readonly class="form-control"></p>
                                        </div>
                                        <div class="col-md-2">
                                            <p>Sales <input type="text" :value="sales = totalItem" class="form-control" readonly></p>
                                        </div>
                                        <div class="col-md-2">
                                            <p>POS <input type="text" v-model="pos" class="form-control"></p>
                                        </div>
                                        <div class="col-md-3">
                                            <p>Bank Deposit <input type="text" v-model="bankDeposit" class="form-control"></p>
                                        </div>
                                        <div class="col-md-2">
                                            <p>Expenses <input type="text" v-model="expenses" class="form-control"></p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <ul class="list-inline bgAdd">
                            <li><button class="btn btn-default" @click="addToDatabase"><i class="fa fa-plus"></i> Add</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import db from '../firebase/firebaseInt.js'
export default {
    name: 'dashboard',
    data(){
        return{
            dailySalesResults: [
                {   
                    pumples: "",
                    meterOpening: "",
                    meterClosing: "",
                    returnToTank: 0,
                    dailySales: 0,
                    OpenStock: "",
                    qualityRecieved: 0,
                    totalAtHand: "",
                    theoretical: "",
                    physical: "",
                    difference: "",
                    price: "",
                    stockValue: "",
                   
                }
            ],
            cashForward: 0,
            sales: "",
            pos: 0,
            expenses: 0,
            bankDeposit: 0,
            createOn: new Date().toLocaleDateString(),
        }
    },
   
    computed:{
        totalItem(){
            let counterSum = 0, num
            this.dailySalesResults.forEach(daily => {
                counterSum += parseFloat(daily.stockValue)
                num = counterSum
            })
            return num
        },
        reference() {
            let text = ""
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            for( let i = 0; i < 4; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length))
            return text
        },
    },
    methods:{
        addRows(){
            this.dailySalesResults.push({
                pumples: "",
                meterOpening: "",
                meterClosing: "",
                returnToTank: 0,
                dailySales: "",
                OpenStock: "",
                qualityRecieved: 0,
                totalAtHand: "",
                theoretical: "",
                physical: "",
                difference: "",
                price: "",
                stockValue:""
            })
               
        },
        removeRow(row){
            var index = this.dailySalesResults.indexOf(row)
            this.dailySalesResults.splice(index, 1)
        },
        addToDatabase(){
            db.collection('transaction').add({
                transaction_id: this.reference,
                dailySalesResults: this.dailySalesResults,
                cashForward: this.cashForward,
                sales: this.sales,
                pos: this.pos,
                expenses: this.expenses,
                bankDeposit: this.bankDeposit,
                createOn: this.createOn
            })
            .then(docRef => {
                this.reference = ""
                alert('Added...')
                this.$router.push({path: "/view-record"})
            })
            .catch(error => {
                console.error('error')
            })
        },
        meterClosing(e){ 
            var closeMeter = e.target.value
        },
        meterOpening(e){
            var openMeter = e.target.value
            this.dailySalesResults.meterOpening = openMeter
        },
        viewRecord(){
            this.$router.push({name: "view-record"})
        }
    },
}
</script>
<style scoped>
@import '../../assets/css/mainland.css';
</style>