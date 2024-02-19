<template>
  <Header/>
  <div class="container">
    <Balance :total="total"/>
    <IncomeExpenses :income="income" :expense="expense"/>
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted"/>
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted"/>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import AddTransaction from './components/AddTransaction.vue';

import { ref, computed, onMounted } from 'vue';

import { useToast } from "vue-toastification";

const toast = useToast();

// transaction list
const transactions = ref([]);

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

// calculating total
const total = computed(() => transactions.value.reduce((acc, transaction) => (acc + transaction.amount), 0).toFixed(2));

// calculating income
const income = computed(() => transactions.value.filter((transaction) => transaction.amount > 0).reduce((acc, transaction) => (acc + transaction.amount), 0).toFixed(2));

// calculating expense
const expense = computed(() => transactions.value.filter((transaction) => transaction.amount < 0).reduce((acc, transaction) => (acc + transaction.amount), 0).toFixed(2));

// add transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: Math.floor(Math.random() * 1000000),
    text: transactionData.text,
    amount: transactionData.amount 
  });
  savedTransactions();
  toast.success('Transaction added');
};

// delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
  savedTransactions();
  toast.success('Transaction deleted');
};

const savedTransactions = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
};
</script>