import Vue from "vue";
import Vuex from "vuex";
import session from "./session";
import designs from "./designs";
import experiments from "./experiments";
import jobs from "./jobs";
import maps from "./maps";
import models from "./models";
import organisms from "./organisms";
import projects from "./projects";

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
    projects
  },
  state: {
    fetchDataError: null
  },
  mutations: {
    setFetchError(state, error) {
      state.fetchDataError = error;
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
    }
  }
});