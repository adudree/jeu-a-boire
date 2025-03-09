export default defineEventHandler((event) => {
    const testString = getRouterParam(event, 'test');
    return {
        hello: 'test ' + testString
    }
});  