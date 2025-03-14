<script setup lang="ts">
import type { IPlayer } from '~/types/player';

const gameStore = useGameStore();
const playersList = ref<IPlayer[]>(gameStore.getPlayersList);

const currentRound = ref<number>(0);
const questionsList = reactive<string[]>([
    'Qui vit dans un ananas sous la mer ?',
    'Qui compte bien y faire carrière ?',
    'Si vous avez un souhait, qui faut-il appeler ?',
    'Qui n\'a pas peur des gros méchant poissons ?'
]);
const currentQuestion = computed(() => questionsList[currentRound.value]);

function nextQuestion() {
    if (currentRound.value < questionsList.length - 1) {
        currentRound.value++;
    } else {
        endGame();
    }
}
async function endGame() {
    await navigateTo('/');
}

onMounted(() => {
    document.addEventListener('click', nextQuestion);
})
onUnmounted(() => {
    document.removeEventListener('click', nextQuestion);
})
</script>
<template>
    <div>
        <NuxtLink to="/">
            <button>Back to home</button>            
        </NuxtLink>
        <h2>Welcome to the game</h2>
        <div>Round {{ currentRound + 1 }} / {{ questionsList.length }}</div>
        <div>Players list : <span v-for="(player, index) in playersList" :key="index" class="playerTag"> {{ player.name }} </span></div>
        <div>{{ currentQuestion }}</div>
    </div>
</template>
<style scoped lang="scss">
.playerTag {
    padding: 5px;
    margin: 5px;
    background: #e1e1e1;
}
</style>