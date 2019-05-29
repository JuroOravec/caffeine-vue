import Vue from "vue";
import Vuex from "vuex";
import * as Sentry from "@sentry/browser";
import session from "./modules/session";
import designs from "./modules/designs";
import experiments from "./modules/experiments";
import jobs from "./modules/jobs";
import maps from "./modules/maps";
import models from "./modules/models";
import organisms from "./modules/organisms";
import projects from "./modules/projects";
import interactiveMap from "./modules/interactiveMap";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    session,
    designs,
    experiments,
    jobs,
    maps,
    models,
    organisms,
    projects,
    interactiveMap
  },
  state: {
    fetchDataError: false,
    postDataError: null,
    deleteDataError: null,
    unauthorizedError: null,
    isDialogVisible: {
      loader: false
    },
    loadingMessages: {
      default: "Loading. Please wait."
    },
    commonTooltipMessages: {
      unauthenticated: "Please log in or register to use this functionality!",
      publicData: "Public data can not be modified."
    }
  },
  mutations: {
    setFetchError(state, hasError) {
      state.fetchDataError = hasError;
    },
    setPostError(state, error) {
      state.postDataError = error;
    },
    setDeleteError(state, error) {
      state.deleteDataError = error;
    },
    setUnauthorizedError(state, error) {
      state.unauthorizedError = error;
    },
    toggleDialog(state, dialog) {
      state.isDialogVisible[dialog] = !state.isDialogVisible[dialog];
    }
  },
  actions: {
    fetchAllData({ dispatch }) {
      dispatch("designs/fetchDesigns");
      dispatch("experiments/fetchExperiments");
      dispatch("jobs/fetchJobs");
      dispatch("maps/fetchMaps");
      dispatch("models/fetchModels");
      dispatch("organisms/fetchOrganisms");
      dispatch("projects/fetchProjects");
    },
    setFetchError({ commit }, error) {
      // Dispatch this action when failing to retrieve platform data from the
      // backend. The root issue can vary (backend service down, invalid
      // request, runtime error in callbacks, etc.) so this generic action will
      // report the error to Sentry and display a generic error message to the
      // user.
      Sentry.captureException(error);
      commit("setFetchError", true);
    }
  },
  strict: process.env.NODE_ENV !== "production"
  // Depends on https://github.com/vuejs/vuex/pull/1478 being released.
  // devtools: process.env.NODE_ENV !== "production"
});
