<template>
  <div>
    <v-dialog v-model="isVisible" width="650">
      <v-card class="pa-2">
        <v-container grid-list-lg text-md-left>
          <v-layout fill-height column wrap>
            <v-flex md6>
              <h3>Add a new project</h3>
            </v-flex>
            <v-flex>
              <v-form
                ref="form"
                v-model="isValid"
                @keyup.native.enter="onEnter"
              >
                <v-text-field
                  required
                  v-model="projectName"
                  :rules="[rules.required]"
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="e.g. My Cool Project"
                ></v-text-field>
              </v-form>
            </v-flex>
          </v-layout>
        </v-container>

        <v-divider class="my-2"></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"
            flat
            @click="isVisible = false"
            :disabled="$store.state.isDialogVisible.loader"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="createProject"
            :disabled="$store.state.isDialogVisible.loader || !isValid"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      color="success"
      v-model="isProjectCreationSuccess"
      :timeout="3000"
    >
      {{ projectName }} successfully created.
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { AxiosResponse } from "axios";
import * as settings from "@/utils/settings";

export default Vue.extend({
  name: "NewProject",
  props: ["value"],
  data: () => ({
    isValid: true,
    isProjectCreationSuccess: false,
    projectName: null,
    test: null,
    rules: {
      required: value => !!value || "Required."
    }
  }),
  computed: {
    isVisible: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$refs.form!.reset();
        this.$emit("input", value);
      }
    }
  },
  watch: {},
  methods: {
    onEnter() {
      if (this.$refs.form.validate()) {
        this.createProject();
      }
    },
    createProject() {
      this.$store.commit("toggleDialog", "loader");
      const payload = { name: this.projectName };
      axios
        .post(`${settings.apis.iam}/projects`, payload)
        .then((response: AxiosResponse) => {
          const commitPayload = Object.assign(payload, response.data);
          this.$store.commit("projects/addProject", commitPayload);
          this.$emit("return-object", commitPayload);
          this.$store.dispatch("session/refreshToken");
          this.$store.state.session.refreshRequest.then(() => {
            this.isVisible = false;
            this.isProjectCreationSuccess = true;
          });
        })
        .catch(error => {
          this.$store.commit("setPostError", error);
        })
        .then(() => {
          this.$store.commit("toggleDialog", "loader");
        });
    }
  }
});
</script>
