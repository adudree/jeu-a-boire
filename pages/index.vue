<script setup lang="ts">
import type { IPlayer } from '~/types/player';

const playersList = ref<IPlayer[]>([]);
const nameInput = ref<string>('');
const gameStore = useGameStore();

function onKeyUpEnter(newName: string) {
    playersList.value.unshift({name: newName});
    nameInput.value = "";
}

async function onStartGame() {
    gameStore.savePlayerList(playersList.value);
    await navigateTo('/game');
}
function deletePlayer(name: string) {
    playersList.value = playersList.value.filter(p => p.name !== name);
}
onBeforeMount(() => {
    playersList.value = gameStore.getPlayersList;
})
</script>
<template>
<div class="container">
    <div class="content">
        <div class="player-input-container">
            <input v-model="nameInput" type="text" placeholder="Nouveau joueur..." @keyup.enter="onKeyUpEnter(nameInput)">
            <div class="players-count">{{ playersList.length }}  {{ playersList.length !== 1 ? 'joueurs' : 'joueur' }}</div>
        </div>

        <div class="list-container">
            <div v-for="(player, index) in playersList" :key="index" class="player">
                <div>
                    {{ player.name }}
                </div>
                <div>
                    <button value="Delete" @click="deletePlayer(player.name)">Supprimer</button>
                </div>
            </div>
        </div>

        <div class="start-game-container">
            <button @click="onStartGame">C'est parti !</button>
        </div>
    </div>



</div>
</template>
<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #7e3a86;
    .content {
        width: 600px;
        height: 80vh !important;
        margin: auto;
        padding: 5px;
        // background: #c09ac4;
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 20px;
    }
}
.player-input-container {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    gap: 10px;
    input {
        flex: 1;
        height: 100%;
        border: none;
        padding: 0 10px;
    }
    .players-count {
        width: 100px;
        text-align: start;
        scrollbar-gutter: stable !important;
    }
    color: #c09ac4;
}
.list-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    overflow-y: auto;
    scrollbar-gutter: stable;

    .player {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #c09ac4;
        margin: 2px;
        padding: 5px;
        min-height: 40px;
        font-size: 1rem;
    }
}
.start-game-container {
    button {
        background: #522357;
        &:hover {
            background: #331236;
        }
    }
}
</style>