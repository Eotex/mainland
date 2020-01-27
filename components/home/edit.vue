<template>
    <div class="edit">
        <header class="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="title">
                            <i class="fa fa-pencil"></i> <i>Edit Daily Sales Record Book</i> <router-link :to="'/view-each-record/'+ transaction_id"> (Back)</router-link>
                        </h1>
                    </div>
                </div>
            </div>
        </header>
        <section class="view-record">
            <div class="dashboard-section">
                <div class="container-fluid">
                    <div class="row" style="margin:0">
                        <div class="table-content">
                            <div id="printContent">
                                <div id="print">
                                    <h1>MAINLAND OIL GAS CO. LTD<br/> DAILY SALES RECORD BOOK</h1>
                                    <h3>Date: <input type="text" v-model="createOn" readonly></h3>
                                    <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="form-input" v-for="(dailySalesResult, index) in dailySalesResults" :key="index">
                                                <td><input type="text" v-model="dailySalesResult.pumples"></td>
                                                <td><input type="text" v-model="dailySalesResult.meterOpening"></td>
                                                <td><input type="text" v-model="dailySalesResult.meterClosing"></td>
                                                <td><input type="text" v-model="dailySalesResult.returnToTank"></td>
                                                <td><input type="text" :value ="dailySalesResult.dailySales = parseFloat(dailySalesResult.meterClosing) - parseFloat(dailySalesResult.meterOpening) - dailySalesResult.returnToTank" class="form-control" readonly></td>
                                                <td><input type="text" v-model="dailySalesResult.OpenStock"></td>
                                                <td><input type="text" v-model="dailySalesResult.qualityRecieved"></td>
                                                <td><input type="text" :value="dailySalesResult.totalAtHand = parseFloat(dailySalesResult.OpenStock) + (dailySalesResult.qualityRecieved ? parseFloat(dailySalesResult.qualityRecieved): dailySalesResult.qualityRecieved )" class="form-control" readonly></td>
                                                <td><input type="text" :value="dailySalesResult.theoretical = parseFloat(dailySalesResult.totalAtHand) - parseFloat(dailySalesResult.dailySales)" class="form-control" readonly></td>
                                                <td><input type="text" v-model="dailySalesResult.physical"></td>
                                                <td><input type="text" :value="dailySalesResult.difference = parseFloat(dailySalesResult.physical) - parseFloat(dailySalesResult.theoretical)" class="form-control" readonly></td>
                                                <td><input type="text" v-model="dailySalesResult.price"></td>
                                                <td><input type="text" :value="dailySalesResult.stockValue = dailySalesResult.dailySales * dailySalesResult.price" class="form-control" readonly></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                    <hr class="hr-group">
                                    <div class="transaction">
                                        <h4 class="title">Total Transactions</h4>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <p>Cash brought forward <input type="text" :Value="cashForward = parseFloat(sales) - (pos ? parseFloat(pos): pos) - bankDeposit - expenses" readonly class="form-control"></p>
                                            </div>
                                            <div class="col-md-2">
                                                <p>Sales <input type="text" :value="sales= totalItem"  class="form-control" readonly></p>
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
                            </div>
                            <ul class="list-inline bgAdd">
                                <li><button class="btn btn-default" @click="updateToDatabase"><i class="fa fa-pencil"></i> Update</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import db from '../firebase/firebaseInt.js'
import swal from 'sweetalert'
export default {
    name: 'edit',
    data(){
        return{
            transaction_id: null,
            dailySalesResults: [],
            createOn: null,
            cashForward: null,
            sales: null,
            expenses: null,
            pos: null,
            bankDeposit: null,
        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('transaction').where('transaction_id', '==', to.params.transaction_id).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                next(vm => {
                    vm.transaction_id = doc.data().transaction_id
                    vm.dailySalesResults = doc.data().dailySalesResults,
                    vm.cashForward = doc.data().cashForward,
                    vm.sales = doc.data().sales,
                    vm.pos = doc.data().pos,
                    vm.expenses = doc.data().expenses,
                    vm.bankDeposit = doc.data().bankDeposit,
                    vm.createOn = doc.data().createOn
                })
            })
        })
    },
    watch:{
        $route: 'fetchData'
    },
    computed: {
        totalItem(){
            let counterSum = 0, num
            this.dailySalesResults.forEach(daily => {
                counterSum += parseFloat(daily.stockValue)
                num = counterSum
            })
            return num
        }
    },

    methods:{
        updateToDatabase(){
            db.collection('transaction').where('transaction_id', '==', this.$route.params.transaction_id ).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        dailySalesResults: this.dailySalesResults,
                        cashForward: this.cashForward,
                        sales: this.sales,
                        pos: this.pos,
                        expenses: this.expenses,
                        bankDeposit: this.bankDeposit,
                        createOn: this.createOn
                    })
                    .then(() => {
                        swal('success','updated...', 'success')
                        .then((isConfirm) =>{
                            this.$router.push({path: "/view-record"})
                        })
                    })
                })
            })
        },
        fetchData(){
            db.collection('transaction').where('transaction_id', '==', this.$route.params.transaction_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    this.transaction_id = doc.data().transaction_id
                    this.dailySalesResults = doc.data().dailySalesResults,
                    this.cashForward = doc.data().cashForward,
                    this.sales = doc.data().sales,
                    this.pos = doc.data().pos,
                    this.expenses = doc.data().expenses,
                    this.bankDeposit = doc.data().bankDeposit,
                    this.createOn = doc.data().createOn
                })
            })
        },
    }
}
</script>
<style scoped>
@import '../../assets/css/mainland.css';
</style>