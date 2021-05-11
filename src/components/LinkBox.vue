<template>
  <div id="box" elevation="16" v-bind:style="{ 'background-color' : linkBack() }">
    <v-container>
      <v-layout align-center justify-space-around fill-height>
        <v-btn
          dark
          class="accent--text"
          v-for="(item) in $store.state.linkStuff"
          :key="item"
          :href="item[1]"
        >{{item[0]}}</v-btn>
      </v-layout>
    </v-container>

    <v-layout align-end justify-end>
      <v-icon color="info" @click="coinOpen" v-ripple>mdi-currency-btc</v-icon>
      <v-icon color="info" @click="linkDialog=true" v-ripple>mdi-link-variant</v-icon>
    </v-layout>

    <v-dialog v-model="linkDialog" persistent max-width="600">
      <v-form ref="form" @submit.prevent>
        <v-card dark>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Label"
                    color="#EDC3C5"
                    v-model="labelMessage"
                    @click="resetValidation"
                    v-on:keyup.enter="pusher"
                    v-on:keyup.esc="closeClear"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="URL"
                    color="#EDC3C5"
                    v-model="linkMessage"
                    :rules="inputRules()"
                    @click="resetValidation"
                    v-on:keyup.enter="pusher"
                    v-on:keyup.esc="closeClear"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>Enter a Label and URL</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="#EDC3C5"
              flat
              @click="pusher"
              :disabled="!domainExtension"
              required
            >Add Link</v-btn>
            <v-btn color="#EDC3C5" flat @click="listDialogFlip">List Links</v-btn>
            <v-btn color="#EDC3C5" flat @click="linkDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="listDialog" persistent max-width="600px">
      <v-card dark>
        <v-container>
          <v-list>
            <template v-for="(item) in this.$store.state.linkStuff">
              <v-list-tile :key="item" ripple @click="poppy(item)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ `${item[0]} | ${item[1]}` }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-container>
        <v-container grid-list-md>
          <v-card-actions>
            <small>Click to Delete</small>
            <v-spacer></v-spacer>
            <v-btn color="#EDC3C5" flat @click="addFlip">Add Link</v-btn>
            <v-btn color="#EDC3C5" flat @click="listDialog = false">Close</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { imSoSorry } from './domainList';
export default Vue.extend({
  data: () => ({
    linkDialog: false,
    listDialog: false,

    domainExtension: false,

    linkMessage: '',
    labelMessage: '',
  }),

  methods: {
    linkBack() {
      return this.$store.state.linkBack.split(':')[1];
    },

    resetValidation() {
      (this.$refs.form as any).resetValidation();
    },

    closeClear() {
      this.clearMessage();
      this.linkDialog = false;
      this.listDialog = false;
    },

    clearMessage() {
      this.labelMessage = '';
      this.linkMessage = '';
      this.resetValidation();
    },

    listDialogFlip() {
      this.linkDialog = false;
      this.listDialog = true;
      this.clearMessage();
      this.resetValidation();
    },

    addFlip() {
      this.linkDialog = true;
      this.listDialog = false;
      this.clearMessage();
      this.resetValidation();
    },

    validation(str: string): boolean {
      const newMsg = str.split('.');
      const extension = '.' + newMsg[newMsg.length - 1];

      if (imSoSorry.some((x: string) => x === extension)) {
        this.domainExtension = true;
        return true;
      } else {
        this.domainExtension = false;
        return false;
      }
    },

    pusher() {
      const start = 'https://';
      let holder = '';
      if (this.linkMessage.slice(0, 3) !== 'http') {
        holder = start + this.linkMessage;
        if (this.validation(this.linkMessage)) {
          this.$store.commit('pushLink', [this.labelMessage, holder]);
          this.clearMessage();
          holder = '';
          this.resetValidation();
        }
      } else {
        if (this.validation(this.linkMessage)) {
          this.$store.commit('pushLink', [this.labelMessage, this.linkMessage]);
          this.clearMessage();
          holder = '';
          this.resetValidation();
        }
      }
      this.resetValidation();
    },

    inputRules(): any {
      return [
        (v: any) =>
          this.validation(v) === true || 'Valid Domain Extension Required',
      ];
    },

    poppy(item: any) {
      this.$store.commit('popLink', item);
    },

    coinOpen() {
      this.resetValidation();
      this.$store.state.coinMenu = true;
    },
  },
});
</script>

<style scoped>
#box {
  background-color: lightgrey;
  box-shadow: 0px 13px 30px 0px rgba(0, 0, 0, 0.75);
  width: 60%;
  height: 125px;
  padding: 5px;
}
</style>
