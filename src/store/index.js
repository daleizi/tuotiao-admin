import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contents: ""
  },
  mutations: {
    setEditor(state, data) {
      this.contents = data;
    }
  },
  actions: {},
  modules: {}
});
