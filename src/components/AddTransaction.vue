<template>
    <h3>Add new transaction</h3>
      <form @submit.prevent="onSubmit()" id="form">
        <div class="form-control">
          <label for="text">Text</label>
          <input type="text" id="text" v-model="text" placeholder="Enter text..." />
        </div>
        <div class="form-control">
          <label for="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" id="amount" v-model="amount" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
      </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const text = ref('');
const amount = ref('');

const emit = defineEmits(['transactionSubmitted']);

const onSubmit = () => {

  if(text.value === '' || amount.value === '') {
    toast.error('Please enter text and amount');
    return;
  }

  emit('transactionSubmitted', {
    text: text.value,
    amount: +amount.value
  });

  text.value = '';
  amount.value = '';
}
</script>