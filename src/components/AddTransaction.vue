<style>
input[type="checkbox"] {
  position: relative;
  width: 40px;
  height: 20px;
  -webkit-appearance: none;
  appearance: none;
  background: #00ed64;
  outline: none;
  border-radius: 2rem;
  cursor: pointer;
  box-shadow: inset 0 0 5px rgb(0 0 0 / 50%);
}

input[type="checkbox"]::before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s;
}

input[type="checkbox"]:checked::before {
  transform: translateX(100%);
  background: #fff;
}

input[type="checkbox"]:checked {
  background: red;
}

</style>
<template>
    <h3>Add new transaction</h3>
      <form @submit.prevent="onSubmit()" id="form">
        <div class="form-control">
          <label for="text">Text</label>
          <input type="text" id="text" v-model="text" placeholder="Enter text..." />
        </div>
        <div class="form-control">
          <label for="incomeExpenseSwitch">Income - Green, Expense - Red</label>
          <br>
          <input type="checkbox"  id="incomeExpenseSwitch" v-model="incomeExpenseSwitch">
        </div>
        <div class="form-control">
          <label for="amount"
            >Amount </label>
          <input type="number" id="amount" v-model="amount" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
      </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useToast } from "vue-toastification";

const toast = useToast();

const text = ref('');
const incomeExpenseSwitch = ref('');
const amount = ref('');

const emit = defineEmits(['transactionSubmitted']);

const onSubmit = () => {
  if(text.value === '' || amount.value === '') {
    toast.error('Please enter text and amount');
    return;
  }

  emit('transactionSubmitted', {
    text: text.value,
    amount: +(!incomeExpenseSwitch.value ? `+${amount.value}` : `-${amount.value}`)
  });

  text.value = '';
  amount.value = '';
}
</script>