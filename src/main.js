// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/store'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from "./assets/js/axios.js";
import tool from './assets/js/tool.js';
import '@/assets/css/reset.css';
import { VTree, VSelectTree } from 'vue-tree-halower'
import echarts from 'echarts'
//中国省市区组件
import 'vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage'
import './assets/js/dataFormat.js'
import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'fb29bd8683908d3e4d3576f4504bc7c2',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   v: '1.4.4'
// });
Vue.use(VueAreaLinkage)
Vue.use(Vuex)
Vue.use(VTree)
Vue.use (VSelectTree)
Vue.use(iView)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI);
Vue.use(VueQuillEditor);

Vue.prototype.$axios = axios;
Vue.prototype.$tool = tool;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
/* eslint-disable no-new */
window.newVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
