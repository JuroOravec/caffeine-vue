<template>
  <div>
    <v-container fluid>
      <DeletionDialog
        v-model="isDeletionDialogVisible"
        :items="[experimentToDelete]"
        itemsType="experiments"
        @toggleLoader="toggleLoader()"
      />
      <NewExperiment
        v-model="isNewExperimentDialogVisible"
        :experiment-to-edit="experimentToEdit"
        @new-experiment-success="onNewExperimentSuccess"
      />
      <v-layout justify-center>
        <v-flex md9>
          <h1 class="mb-2">Experiments</h1>
          <v-data-table
            :headers="headers"
            :items="availableExperiments"
            class="elevation-8"
            :loading="isLoading || isDeleting"
            :pagination.sync="pagination"
          >
            <template v-slot:items="{ item: experiment }">
              <td>{{ experiment.name }}</td>
              <td>{{ experiment.description }}</td>
              <td>{{ experiment.created | moment("D MMM YYYY, HH:mm") }}</td>
              <td>
                <v-tooltip
                  bottom
                  :disabled="isAuthenticated && experiment.project_id !== null"
                >
                  <div v-if="!isAuthenticated">
                    <span>
                      {{ $store.state.commonTooltipMessages.unauthenticated }}
                    </span>
                  </div>
                  <div v-else-if="experiment.project_id === null">
                    <span>
                      {{ $store.state.commonTooltipMessages.publicData }}
                    </span>
                  </div>
                  <v-icon
                    slot="activator"
                    @click="editItem(experiment)"
                    :disabled="
                      !isAuthenticated || experiment.project_id === null
                    "
                    :class="{
                      pointerDisabled:
                        !isAuthenticated || experiment.project_id === null
                    }"
                  >
                    edit
                  </v-icon>
                </v-tooltip>
                <v-tooltip
                  bottom
                  :disabled="isAuthenticated && experiment.project_id !== null"
                >
                  <div v-if="!isAuthenticated">
                    <span>
                      {{ $store.state.commonTooltipMessages.unauthenticated }}
                    </span>
                  </div>
                  <div v-else-if="experiment.project_id === null">
                    <span>
                      {{ $store.state.commonTooltipMessages.publicData }}
                    </span>
                  </div>
                  <v-icon
                    slot="activator"
                    @click="deleteItem(experiment)"
                    :disabled="
                      !isAuthenticated || experiment.project_id === null
                    "
                  >
                    delete
                  </v-icon>
                </v-tooltip>
              </td>
            </template>
          </v-data-table>
          <v-tooltip bottom :disabled="isAuthenticated">
            <span>
              {{ $store.state.commonTooltipMessages.unauthenticated }}
            </span>
            <v-btn
              slot="activator"
              fixed
              fab
              bottom
              right
              :disabled="!isAuthenticated"
              @click.stop="createExperiment"
              color="primary"
              v-bind:style="styleObject"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      color="success"
      v-model="isNewExperimentSuccess"
      :timeout="5000"
    >
      {{ newExperimentName }} successfully created.
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewExperiment from "@/components/NewExperiment.vue";

export default Vue.extend({
  name: "Experiments",
  components: {
    NewExperiment
  },
  data: () => ({
    isLoading: true,
    isNewExperimentSuccess: false,
    newExperimentName: null,
    headers: [
      { text: "Name", value: "name", width: "20%" },
      { text: "Description", value: "description", width: "50%" },
      { text: "Created", value: "created", width: "20%" },
      { text: "Actions", sortable: false, width: "10%" }
    ],
    experimentToEdit: null,
    experimentToDelete: { name: null },
    isDeleting: false,
    isDeletionDialogVisible: false,
    isNewExperimentDialogVisible: false,
    pagination: {
      rowsPerPage: 10,
      sortBy: "created",
      descending: true
    },
    styleObject: {
      "pointer-events": "auto"
    }
  }),
  computed: {
    isAuthenticated() {
      return this.$store.state.session.isAuthenticated;
    },
    availableExperiments() {
      return this.$store.state.experiments.experiments;
    }
  },
  created() {
    this.$store.state.experiments.experimentsPromise.then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    createExperiment() {
      this.experimentToEdit = null;
      this.isNewExperimentDialogVisible = true;
    },
    editItem(item) {
      this.experimentToEdit = item;
      this.isNewExperimentDialogVisible = true;
    },
    deleteItem(item) {
      this.experimentToDelete = item;
      this.isDeletionDialogVisible = true;
    },
    toggleLoader() {
      this.isDeleting = !this.isDeleting;
    },
    onNewExperimentSuccess(experimentName) {
      this.newExperimentName = experimentName;
      this.isNewExperimentSuccess = true;
    }
  }
});
</script>
