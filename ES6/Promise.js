/**
 * 手写Promise，还没有手写过Promise你就out了
 */

Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((r) => {
    console.log('🐻', r)
}).then((r) => {
    console.log(7)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
