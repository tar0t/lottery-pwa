<template>
  <v-app>
    <v-tabs :centered="true">
      <v-tab href="#tab-home">ホーム</v-tab>
      <v-tab href="#tab-regist">データ登録</v-tab>
      
      <v-tab-item value="tab-home"><Home /></v-tab-item>
      <v-tab-item value="tab-regist"><Regist /></v-tab-item>
    </v-tabs>

    <v-btn color="pink" dark small fixed bottom right fab
      @click="$vuetify.goTo(0)">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <!-- フッター -->

  </v-app>
</template>

<script>
import storage from "./util/Storage"
import Home from "./components/Home.vue"
import Regist from "./components/Regist.vue"
storage.setCurrentItems()

export default {
  name: 'App',
  components: {
    Home,
    Regist
  },
  data(){
    return {}
  }
};
</script>
