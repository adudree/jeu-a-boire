<script setup lang="ts">
import type { IPlayer } from '~/types/player';

const gameStore = useGameStore();
const playersList = ref<IPlayer[]>(gameStore.getPlayersList);
const backgroundColor = ref<string>('');

const currentRound = ref<number>(0);
const questionsList = reactive<string[]>([
    'Qui vit dans un ananas sous la mer ? {name} {name} {name} {name}',
    'Qui compte bien y faire carrière ? {name} {name} {name} {name}',
    'Si vous avez un souhait, qui faut-il appeler ? {name} {name} {name} {name}',
    'Qui n\'a pas peur des gros méchant poissons ? {name} {name} {name} {name}'
]);
const currentQuestion = computed(() => questionsList[currentRound.value]);
const target = ref<string>('');

onMounted(() => {
    setTarget();
})

function nextQuestion() {
    if (currentRound.value < questionsList.length - 1) {
        setTarget();
        backgroundColor.value = generateLightColor();
        currentRound.value++;
    } else {
        endGame();
    }
}

const parsedQuestion = computed(() => {
    const availableNames = [...playersList.value.map(p => p.name)];
    return currentQuestion.value.replace(/{name}/g, () => {
        if (availableNames.length === 0) return "???";
        return availableNames.splice(Math.floor(Math.random() * availableNames.length), 1)[0];
    });
});
function setTarget() {
    target.value = getRandomPlayer();
}
function getRandomPlayer() {
    return playersList.value[Math.floor(Math.random() * playersList.value.length)].name;
}
async function endGame() {
    await navigateTo('/');
}

onMounted(() => {
    document.addEventListener('click', nextQuestion);
    backgroundColor.value = generateLightColor();
});
onUnmounted(() => {
    document.removeEventListener('click', nextQuestion);
});

function generateLightColor(): string {
    let r, g, b;
    
    do {
        r = Math.floor(Math.random() * 128 + 128); // 128 à 255
        g = Math.floor(Math.random() * 128 + 128);
        b = Math.floor(Math.random() * 128 + 128);
    } while (Math.abs(r - g) < 30 && Math.abs(r - b) < 30 && Math.abs(g - b) < 30); // Évite les gris

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

</script>
<template>
    <NuxtLayout :background-color="backgroundColor">
        <NuxtLink to="/">
            <button>Back to home</button>            
        </NuxtLink>
        <h2>Welcome to the game</h2>
        <div>Round {{ currentRound + 1 }} / {{ questionsList.length }}</div>
        <div>Players list : <span v-for="(player, index) in playersList" :key="index" class="playerTag"> {{ player.name }} </span></div>
        <div>{{ target }}</div>
        <div>{{ parsedQuestion }}</div>
    </NuxtLayout>
</template>
<style scoped lang="scss">
.playerTag {
    padding: 5px;
    margin: 5px;
    background: #e1e1e1;
}
</style>