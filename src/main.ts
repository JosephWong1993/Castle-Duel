import "./css/style.css"
import "./css/transitions.css"

import Vue from "vue"
import utils from "./Utils"
import State from "./State";

State.worldRatio = utils.getWorldRatio();
//  窗口大小变化的处理
window.addEventListener('resize', () => {
    State.worldRatio = utils.getWorldRatio();
});

// 4. 创建和挂载根实例。
import App from "./App.vue";
new Vue({
    //  默认Vue不导入编译器,*.vue文件内部的模板会在构建时预编译成 JavaScript。
    //  因为运行时版本相比完整版体积要小大约 30%，所以应该尽可能使用这个版本。
    //  当使用 vue-loader 或 vueify 的时候，*.vue 文件内部的模板会在构建时预编译成 JavaScript。
    //  在最终打好的包里实际上是不需要编译器的，所以只用运行时版本即可。
    // https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6
    // template: '<App/>',
    render: function (h, hack) {
        return h(App);
    },
}).$mount("#app");

// TWeen.js
requestAnimationFrame(animate);

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}