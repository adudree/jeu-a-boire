<script setup lang="ts">

const gameStore = useGameStore();
const playersList = computed(() => gameStore.getPlayersList)
const backgroundColor = ref<string>(generateLightColor());

const currentRound = computed(() => gameStore.getCurrentRound);
const questionsList = await getSomeQuestions(gameStore.getTotalRoundsNumber);

const currentQuestion = computed(() => questionsList[currentRound.value]);
const target = ref<string>('');

const isLastRound = computed(() => currentRound.value === questionsList.length - 1);
const buttonText = computed(() => isLastRound.value ? 'Finir le jeu' : 'Suivant');

async function nextQuestion() {
    if (!isLastRound.value) {
        await setTarget();
        backgroundColor.value = generateLightColor();
        gameStore.nextRound();
    } else {
        await endGame();
    }
}

const parsedQuestion = computed(() => {
    const availableNames = [...playersList.value.map(p => p.name)];
    return currentQuestion.value.question.replace(/{name}/g, () => {
        if (availableNames.length === 0) return "???";
        return availableNames.splice(Math.floor(Math.random() * availableNames.length), 1)[0];
    });
});
async function setTarget() {
    target.value = getRandomPlayer();
    if (!target.value) {
        await endGame();
    }
}
function getRandomPlayer() {
    return playersList.value[Math.floor(Math.random() * playersList.value.length)]?.name;
}
async function endGame() {
    gameStore.resetGame();
    await navigateTo('/');
}

onMounted(async () => {
    await setTarget();
    backgroundColor.value = generateLightColor();
});



</script>
<template>
    <NuxtLayout :background-color="backgroundColor">
        <div>Round {{ currentRound + 1 }} / {{ questionsList.length }}</div>
        <h1>{{ target }}</h1>
        <div>{{ parsedQuestion }}</div>
        <button @click="nextQuestion">{{ buttonText }}</button>
    </NuxtLayout>
</template>
<style scoped lang="scss">
.playerTag {
    padding: 5px;
    margin: 5px;
    background: #e1e1e1;
}
</style>