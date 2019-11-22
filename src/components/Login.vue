<template>
  <div id="app">
    <form @submit.prevent="onSubmit">
      <input type="text" name="name" v-model="name" v-validate="'name|2,20'">
      <p v-if="$errors.has('name')">{{ $errors.message('name') }}</p>
      <br>
      <br>
      <input type="text" name="email" v-model="email" v-validate="'email|2,4'">
      <p v-if="$errors.has('email')">{{ $errors.message('email') }}</p>
      <br>
      <br>
      <button type="submit">Submit</button>
    </form>
    <pre>{{errorBag}}</pre>
  </div>
</template>

<script>

export default {
  data() {
    return {
      name: null,
      email: null,
    };
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll();
    },
  },
};
</script>
