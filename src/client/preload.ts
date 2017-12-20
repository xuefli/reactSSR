declare global {
    interface Window { myData: any; }
}
const preloadedState = window.myData;
// delete window.__PRELOADED_STATE__;
console.log(`preloadedState: ${JSON.stringify(preloadedState)}`)

export default preloadedState;
