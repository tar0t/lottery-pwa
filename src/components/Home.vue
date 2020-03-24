<template>
  <div class="home justify-space-between">
    <v-card class="mx-auto text-center" tile max-width="400px">
      <v-card-text>
        <h4>{{ item.kana }}</h4>
        <h2>{{ item.kanji }}</h2>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn block x-large v-on:click="getRandomItem">抽選</v-btn>
      </v-card-actions>
      
      <!-- データ表示 -->
      <v-card class="mx-auto">
        <v-card-title>現在のデータ：{{ items.length }}件</v-card-title>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>No.</th>
                <th>名前</th>
                <th>フリガナ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in items" v-bind:key="i">
                <td>{{ i+1 }}</td>
                <td>{{ item[0] }}</td>
                <td>{{ item[1] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import storage from "../util/Storage"

export default {
  name: 'Home',
  data() {
    return {
      item: {
        kana: "フリガナ",
        kanji: "名前",
      },
      items: storage.currentItems,
    }
  },
  methods: {
    getRandomItem(){ /* indexedDBに登録された項目からランダムに1件表示 */
      if(storage.currentItems && storage.currentItems.length > 0){
        let i = Math.floor(Math.random() * storage.currentItems.length);
        this.item.kana = storage.currentItems[i][1]
        this.item.kanji = storage.currentItems[i][0]
      } else {
        alert("データがありません")
      }
    },
  },
}
</script>
<style scoped>
th, td {
  text-align: center;
}
</style>
