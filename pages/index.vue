<script setup lang="ts">
import type { IPlayer } from '~/types/player';

const playersList = ref<IPlayer[]>([]);
const nameInput = ref<string>('');
const gameStore = useGameStore();

function onKeyUpEnter(newName: string) {
    playersList.value.push({name: newName});
    nameInput.value = "";
}

async function onStartGame() {
    gameStore.savePlayerList(playersList.value);
    await navigateTo('/game');
}

onBeforeMount(() => {
    playersList.value = gameStore.getPlayersList;
})
</script>
<template>
<div class="container">
    <div class="content">
            <button @click="onStartGame">
                Start game
            </button>
        <NuxtLink to="/admin">
            <button>
                Admin
            </button>
        </NuxtLink>
    </div>

    <input v-model="nameInput" type="text" @keyup.enter="onKeyUpEnter(nameInput)">

    {{ playersList.length }} players

    <div class="list-container">
        <div v-for="(player, index) in playersList" :key="index" class="player">
            {{ player.name }}
        </div>
    </div>

</div>
</template>
<style scoped lang="scss">
.container {
    border: 1px solid blue;
    padding: 5px;
    .content {
        padding: 5px;
        border: 1px solid red;
    }
}
.list-container {
    display: flex;
    flex-direction: column-reverse;
    .player {
        border: 1px solid purple;
        margin: 2px;
        padding: 5px;
    }
}
</style>