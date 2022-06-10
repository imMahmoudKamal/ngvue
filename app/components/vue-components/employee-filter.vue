<template>
  <div class="c-search">
    <input class="c-search__input" type="search" v-model="search" placeholder="Search...">
    <button class="c-button" @click="clear()">Clear</button>
  </div>
</template>

<script>
export default {
  props: ['initialValue'],
  
  data() {
    return {
      search: ''
    }
  },

  mounted: function() {
    this.search = this.$props.initialValue;
  },

  watch: {
    search() {
      this.$emit('search', this.search)
    }
  },

  methods: {
    clear() {
      this.search = '';
    }
  }
};
</script>
