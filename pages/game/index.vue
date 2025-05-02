<script setup lang="ts">

const gameStore = useGameStore();
const playersList = computed(() => gameStore.getPlayersList);
const backgroundColor = ref<string>(generateLightColor());

const currentRound = computed(() => gameStore.getCurrentRound);
const questionsList = await getSomeQuestions(gameStore.getTotalRoundsNumber);

const currentQuestion = computed(() => questionsList[currentRound.value]);
const target = ref<string>('');

const isLastRound = computed(() => currentRound.value === questionsList.length - 1);
const buttonText = computed(() => isLastRound.value ? 'Finir le jeu' : 'Suivant');
const questionType = computed(() => currentQuestion.value.questionType);

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
     let parsedString = replaceNames(currentQuestion.value.question);
     parsedString = replaceGiveOrTake(currentQuestion.value.question);
     return parsedString;
}); 


function replaceNames(currentQuestion: string) {
    const availableNames = [...playersList.value.map(p => p.name)];
    return currentQuestion.replace(/{name}/g, () => {
        if (availableNames.length === 0) return "??";
        return availableNames.splice(Math.floor(Math.random() * availableNames.length), 1)[0];
    });
}

function replaceGiveOrTake(currentQuestion: string) {
    let returnedString = currentQuestion;

    const number = Math.floor(Math.random() * 10);
    const isEven = number% 2 === 0;

    const giveTakeArray: Record<string, string> = {
        '{give}' : 'donne',
        '{take}' : 'prend',
        '{give_or_take}': isEven ? 'donne' : 'prend',
        '{x}': getRandomInt(2, 6).toString()
    }

    Object.keys(giveTakeArray).forEach((key: string) => {
        returnedString = returnedString.replace(key, giveTakeArray[key])
    })
    return returnedString;
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

const title = computed(() => {
    switch(questionType.value.target) {
        case 'one':
            return getRandomPlayer();
        case 'two':
            return getRandomPlayer() + " & " + getRandomPlayer();
        case 'all':
        default:
            return questionType.value.uid;
    }
});

onMounted(async () => {
    await setTarget();
    backgroundColor.value = generateLightColor();
});

</script>
<template>
    <NuxtLayout :background-color="backgroundColor">
        <div>Round {{ currentRound + 1 }} / {{ questionsList.length }}</div>
        <h1>{{ title }}</h1>
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