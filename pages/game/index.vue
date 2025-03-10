<script setup lang="ts">
import type { IPlayer } from '~/types/player';

const gameStore = useGameStore();
const playersList = ref<IPlayer[]>(gameStore.getPlayersList);

</script>
<template>
    <div>
        <NuxtLink to="/">
            <button>Back to home</button>            
        </NuxtLink>
        <h2>Welcome to the game</h2>
        <div>Players list : <span v-for="player in playersList" class="playerTag"> {{ player.name }} </span></div>
    </div>
</template>
<style scoped lang="scss">
.playerTag {
    padding: 5px;
    margin: 5px;
    background: #e1e1e1;
}
</style>