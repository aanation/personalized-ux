<template>
  <div id="app">
    <Post />
  </div>
</template>

<script>
import Post from './components/Post.vue';

export default {
  name: 'App',
  components: {
    Post,
  },
  mounted() {
    const { observe } = window.UIPersonalizer({
      firstGroup: {
        triggerSelector: '.targer_group_1',
        theme: {
          background: '#34495e',
          'text-color': '#fff',
          'base-font-size': '16px',
        },
      },
      secondGroup: {
        triggerSelector: '.targer_group_2',
        theme: {
          background: '#fff',
          'text-color': '#000',
          'base-font-size': '14px',
        },
      },
    });
    observe();
  },
};
</script>

<style lang="scss">
  // default styles
  :root {
    --background: #34495e;
    --text-color: #fff;
    --base-font-size: 16px;
  }
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: var(--background);
  }
</style>
