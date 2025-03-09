<script setup lang="ts">
const { data } = await useFetch('/api/test/hello')
</script>

<template>
<div>
    <NuxtLink to="/game">Start game</NuxtLink>
    <NuxtLink to="/admin">Admin</NuxtLink>

    <div>
        <pre>{{ data?.hello }} </pre>
    </div>
</div>
</template>
