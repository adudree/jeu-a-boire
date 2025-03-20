export async function getSomeQuestions(limit: number) {
    const { data } = await useFetch('/api/questions/randoms', {
        method: 'get',
        query: { limit }
    });
    return data.value?.questions ?? []
};
