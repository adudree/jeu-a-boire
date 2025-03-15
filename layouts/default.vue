<script setup lang="ts">
const props = defineProps({
  backgroundColor : { type: String, required: true },
});

</script>
<template>
    <div class="container" :style="{background: props.backgroundColor}">
        <div class="content">
            <slot />
        </div>
    </div>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    // background: #7e3a86;
    .content {
        width: 600px;
        height: 80vh !important;
        margin: auto;
        padding: 5px;
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 20px;
    }
}
</style>