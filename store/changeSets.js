import { changeSetsService } from '@/assets/lib/ChangeSetsService';
import { userService } from '@/assets/lib/UserService';

import { Message } from 'element-ui';

export const state = {
  changes: [],
  changeSets: [],
  changeSet: {},
  change: {},
  status: {}
};

export const actions = {
  async setAllChangeSets({ commit }) {
    commit('LOADING_REQUEST');
    try {
      const changeSets = await changeSetsService.getAllChangeSets();
      commit('GET_CHANGE_SETS_SUCCESS', changeSets);
    } catch (error) {
      commit('GET_CHANGE_SETS_FAILURE');
    }
  },
  async setChangeSetById({ commit }, changeSetId) {
    commit('LOADING_REQUEST');
    try {
      const changeSet = await changeSetsService.getChangeSetById(changeSetId);
      commit('GET_CHANGE_SET_SUCCESS', changeSet);
    } catch (error) {
      commit('GET_CHANGE_SETS_FAILURE');
    }
  },
  async setChangeById({ commit }, changeId) {
    commit('LOADING_REQUEST');
    try {
      const change = await changeSetsService.getChangeById(changeId);
      console.log('change', change);
      commit('GET_CHANGE_SUCCESS', change);
    } catch (error) {
      commit('GET_CHANGE_FAILURE');
    }
  }
};

export const mutations = {
  LOADING_REQUEST(state) {
    state.status.loading = true;
  },
  GET_CHANGE_SETS_SUCCESS(state, changeSets) {
    state.status.loading = false;
    state.changeSets = changeSets;
  },
  GET_CHANGE_SETS_FAILURE(state) {
    state.status.loading = false;
    state.changeSets = [];
  },
  GET_CHANGE_SET_SUCCESS(state, changeSet) {
    state.status.loading = false;
    state.changeSet = changeSet;
  },
  GET_CHANGE_SET_FAILURE(state) {
    state.status.loading = false;
    state.changeSet = {};
  },
  GET_CHANGE_SUCCESS(state, change) {
    state.status.loading = false;
    state.change = change;
  },
  GET_CHANGE_FAILURE(state) {
    state.status.loading = false;
    state.change = {};
  }
};

export const getters = {
  changeSets(state) {
    return state.changeSets;
  },
  changeSet(state) {
    return state.changeSet;
  },
  change(state) {
    return state.change;
  }
};
