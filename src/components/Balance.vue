<template>
    <h4>Your Balance</h4>
    <h1 id="balance">{{ total != 0 ? (total > 0 ? `+$${total}` : `-$${total.toString().substring(1)}`) : `$${0}`  }}</h1>
  </template>

  <script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
      total: {
        type: Number,
        required: true
      }
    })
  </script>
