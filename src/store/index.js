import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginStatus: false
    },
    mutations: {
        login(state) {
            state.loginStatus = true
        }
    },
    actions: {},
    modules: {}
})