<template>
     <h3>History</h3>
      <ul id="list" class="list">
        <li v-for="transaction in transactions" 
          :key="transaction.id" 
          :class="transaction.amount > 0 ? 'plus' : 'minus'"
        >
          {{ transaction.text }} <span>{{ transaction.amount > 0 ? '+' : '' }} {{ transaction.amount }}</span>
          <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
        </li>
      </ul>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  },
})

const emit = defineEmits(['transactionDeleted']);

const deleteTransaction = (id) => {
  
  emit('transactionDeleted', id);
}
</script>