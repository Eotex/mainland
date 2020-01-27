<template>
    <div class="view-record">
        <header class="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="title">
                            <i class="fa fa-eye"></i> View Daily Sales Record Book &nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-default" style="background:rgba(29, 173, 0, 0.75)" @click="addSales"><i class="fa fa-plus"></i> Add</button>
                        </h1>
                    </div>
                </div>
            </div>
        </header>
        <section class="view-record">
            <div class="dashboard-section">
                <div class="container-fluid">
                    <div class="row" style="margin:0">
                        <div class="table-content" v-for="transaction in transactions" :key="transaction.id">
                            <div id="printContent">
                                <div>
                                    <h1>MAINLAND OIL GAS CO. LTD<br/> DAILY SALES RECORD BOOK</h1>
                                    <h3>Date: <span>{{transaction.createOn}}</span></h3>
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
                                            <tr class="form-input" v-for="(dailySalesResult, index) in transaction.dailySalesResults" :key="index">
                                                <td>{{dailySalesResult.pumples}}</td>
                                                <td>{{dailySalesResult.meterOpening}}</td>
                                                <td>{{dailySalesResult.meterClosing}}</td>
                                                <td>{{dailySalesResult.returnToTank}}</td>
                                                <td>{{dailySalesResult.dailySales}}</td>
                                                <td>{{dailySalesResult.OpenStock}}</td>
                                                <td>{{dailySalesResult.qualityRecieved}}</td>
                                                <td>{{dailySalesResult.totalAtHand}}</td>
                                                <td>{{dailySalesResult.theoretical}}</td>
                                                <td>{{dailySalesResult.physical}}</td>
                                                <td>{{dailySalesResult.difference}}</td>
                                                <td>{{dailySalesResult.price}}</td>
                                                <td>{{dailySalesResult.stockValue}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                    <hr class="hr-group">
                                    <div class="transaction">
                                        <h4 class="title">Total Transactions</h4>
                                        <div class="table-responsive">
                                        <table class="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th>Cash brought forward</th>
                                                <th>Sales</th>
                                                <th>Pos</th>
                                                <th>Bank Deposit</th>
                                                <th>Expenses</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{{transaction.cashForward}}</td>
                                                <td>{{transaction.sales}}</td>
                                                <td>{{transaction.pos}}</td>
                                                <td>{{transaction.bankDeposit}}</td>
                                                <td>{{transaction.expenses}}</td>
                                            </tr>
                                        </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul class="list-inline bgAdd">
                                <li><router-link :to="'/view-each-record/'+ transaction.transaction_id"><button class="btn btn-default"><i class="fa fa-eye"></i> view</button></router-link></li>
                            </ul>
                            <hr>
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
    name: 'view-record',
    data(){
        return{
            transactions: [],
        }
    },
    mounted(){
        db.collection('transaction').orderBy('createOn', 'desc').get().then(
            querySnapshot => {
                let transactionArray = []
                querySnapshot.forEach(doc => {
                    const data = {
                        id: doc.id,
                        transaction_id: doc.data().transaction_id,
                        dailySalesResults: doc.data().dailySalesResults,
                        cashForward: doc.data().cashForward,
                        bankDeposit: doc.data().bankDeposit,
                        sales: doc.data().sales,
                        pos: doc.data().pos,
                        expenses: doc.data().expenses,
                        createOn: doc.data().createOn
                    }
                    transactionArray.push(data)
                })
                this.transactions = transactionArray
            }
        ) 
    },

    methods:{
        addSales(){
            this.$router.push({path: "/dashboard"})
        }
    }
}
</script>
<style scoped>
@import '../../assets/css/mainland.css';
.table-content{
    margin-bottom:20px
}
</style>