<template>
   <div class="manage_detail">
         <header class="header">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="title">
                            <i class="fa fa-eye"></i> Manage dailySales Record Book <button class="btn btn-default pull-right" @click="back">view</button>
                        </h1>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div class="manage-section">
                <div class="container-fluid">
                    <div class="row" style="margin:0">
                        <div class="table-content">
                                <div id="printTerms">
                                    <h1>MAINLAND OIL GAS CO. LTD<br/> DAILY SALES RECORD BOOK</h1>
                                    <h3>Date: <span>{{createOn}}</span></h3>
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
                                                <td>{{cashForward}}</td>
                                                   <td>{{sales}}</td>
                                                   <td>{{pos}}</td>
                                                   <td>{{bankDeposit}}</td>
                                                   <td>{{expenses}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            <ul class="list-inline bgAdd">
                                <li><router-link :to="'/edit/'+ transaction_id"><button class="btn btn-default"><i class="fa fa-pencil"></i> Edit</button></router-link></li>
                                <li><button class="btn btn-default" @click="deleteSales" style="background: rgba(133, 2, 2, 0.8);"><i class="fa fa-trash"></i> Delete</button></li>
                                <li><button class="btn btn-default" @click="Print_record"><i class="fa fa-print"></i> Print</button></li>
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
    export default {
        name: 'manage_detail',
        data(){
            return{
                dailySalesResults: [],
                createOn: null,
                cashForward: null,
                sales: null,
                expenses: null,
                pos: null,
                bankDeposit: null,
                transaction_id: null,
            }
        },

        beforeRouteEnter(to, from, next){
            db.collection('transaction').where('transaction_id', '==', to.params.transactionId).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm =>{
                        vm.transaction_id = doc.data().transaction_id,
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

        methods:{
            fetchData(){
                db.collection('transaction').where('transaction_id', '==', this.$route.params.transactionId).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.transaction_id = doc.data().transaction_id,
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

            Print_record(){
                var section = document.getElementById("printTerms").outerHTML
                let stylesHtml = '';
                for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
                }
                var title = document.title
                var printWindow = window.open('','PrintWindow', 'left=0,top=0,width=1000,height=900,toolbar=0,scrollbars=0,status=0')
                printWindow.document.open()
                printWindow.document.writeln(`<!DOCTYPE html>
                <html><head><title>`+ title +`</title>
                ${stylesHtml}
                </head><body>${section}</body></html>`)
                printWindow.onload = function(){
                    printWindow.focus()
                    printWindow.print()
                    printWindow.close()
                }
                printWindow.document.close()
            },

            deleteSales(){
                swal({ 
                title: "Are you sure?", 
                text: "Your will not be able to recover this!", 
                icon: "warning", 
                buttons: true,
                dangerMode: true,  
                buttons: ["Cancel", "Yes, delete it!"], 
                closeModal:false,
                })
                .then((isConfirm) => {
                    if(isConfirm){
                        db.collection('transaction').where('transaction_id', '==', this.$route.params.transactionId).get().then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                doc.ref.delete()
                                swal("Deleted.", {
                                    icon: "success",
                                    timer: 3000,
                                    buttons: false
                                })
                                .then((isConfirm) => {
                                    this.$router.push({path: "/view-record"})
                                })
                            })
                        })
                    }
                })
            },

            back(){
                this.$router.push({path: "/view-record"})
            }

        },
    }
</script>
<style scoped>
    @import '../../assets/css/mainland.css';
</style>