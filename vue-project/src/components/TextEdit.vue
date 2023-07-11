<template>
  <div class="overlay">
    <button @click="$emit('changeText', inputValue)">關弊案我</button>
    <p>{{ inputValue }}</p>
    <input type="text"  v-model="inputValue" @keyup.enter="$emit('changeText', inputValue)">
  </div>
</template>

<script setup>
  import { ref , defineProps } from 'vue';

  const inputValue = ref('');
  const props = defineProps({
      textName: {
        type: String
      }
  });
  inputValue.value = props.textName;
  console.log(inputValue.value );
</script>


<style lang="scss" scoped>
  .overlay{
    width: 500px;
    height: 200px;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    background-color: rgb(145, 144, 144);
    button{
      margin: 0 0 40px 0;
    }
  }
</style>