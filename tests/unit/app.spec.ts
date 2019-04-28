import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  state: {
    fetchDataError: null,
    postDataError: null,
    isDialogVisible: {
      loader: false
    },
    loadingMessages: {
      default: "Loading. Please wait."
    },
    session: {
      isAuthenticated: false
    }
  },
  actions: {
    "session/interceptRequests": function() {},
    "session/refreshTokenLoop": function() {},
    fetchAllData: function() {}
  }
});

describe("App.vue", () => {
  it("mounts successfully", () => {
    const wrapper = shallowMount(App, { store, localVue });
    expect(wrapper.text()).to.include("Caffeine");
  });
});
