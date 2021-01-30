<template>
  <el-button size="mini" :type="isActive ? 'primary' : ''" @click="onClick"
    >素材库</el-button
  >
</template>

<script>
export default {
  name: "BoldMenuButton",

  props: ["isActive"],

  methods: {
    onClick(e) {
      this.$emit("click");
    }
  }
};
</script>
