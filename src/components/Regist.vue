<template>
  <div class="regist justify-space-between">
    <v-snackbar v-model="snackbar" :timeout="3000" top>
      {{ msgText }}
      <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>データを上書きしますか？</v-card-title>
        <v-spacer></v-spacer>
        <v-card-actions class="justify-center">
          <v-btn primary @click="saveData()">OK</v-btn><v-btn primary @click="dialog = false">NO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="mx-auto text-center" tile max-width="400px">
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col>
              <!--<v-file-input  accept=".csv,text/csv" v-model="csvInput"
                label="Read CSV FIle" @change="handleUpload" :clearable="false"
              />-->
              <label for="inputCsv">Read CSV File
                <input type="file" accept=".csv,text/csv" style="display:none" v-bind:value="csvInput"
                  id="inputCsv" v-on:change="OnFileChange" />
              </label>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select v-model="selectedEncoding" return-object style="padding-left:30%; padding-right:30%"
                :items="Encodings" item-text="text" item-value="value" />
            </v-col>
          </v-row>
          <v-row v-show="newItems.length > 0">
            <v-col>
              <v-btn v-on:click="dialog = true">データ上書き</v-btn>
            </v-col>
            <v-col>
              <v-btn v-on:click="clearInput()">キャンセル</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
      
      <!-- データ表示 -->
      <v-card class="mx-auto">
        <v-card-title>新しいデータ: {{ newItems.length }}件</v-card-title>
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
              <tr v-for="(item, i) in newItems" v-bind:key="i">
                <td>{{ i+1 }}</td>
                <td>{{ item.kana }}</td>
                <td>{{ item.kanji }}</td>
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
import Papa from "../util/papaparse.min.js"

export default {
  name: 'Regist',
  data(){
    return {
      newItems: storage.newItems || [],
      csvInput: null, /* fileinputクリアのため */
      selectedEncoding: { value: "sjis", item:"SJIS" },
      Encodings: [{ value:"sjis", text:"SJIS"}, { value:"utf8", text:"UTF8"} ],
      dialog: false,
      snackbar: false,
      msgText: ""
    }
  },
  methods: {
    showMessage(msg){
      this.msgText = msg
      this.snackbar = true
    },
    saveData(){ /* 読み込んだデータをDBに上書き */
      storage.updateCurrentItems()
      
      this.dialog = false
      this.showMessage("" + storage.currentItems.length + "件登録しました")
      this.clearInput()
    },
    OnFileChange(e){
      let files = e.target.files || e.dataTransfer.files;
      this.handleUpload(files[0])
    },
    handleUpload(file){ /* CSVからデータを読込 */
        /* データ：2列, 空行はスキップ */
        if(file){
            const reader = new FileReader()
            reader.onload = function(ev){
                const csv = ev.target.result
                const config = {
                  skipEmptyLines: true
                }
                let collection = Papa.parse(csv, config)
                const data = collection.data.filter((v) => (v.length >= 2))
                  .map((v) => ({kana: v[0], kanji: v[1], lastdate: null}))
//                console.log(data)
                storage.setNewItems(data)
            }
            reader.readAsText(file, this.selectedEncoding.value)
        }
    },
    clearInput(){ /* 読み込んだデータをクリア */
      storage.clearNewItems()
      this.csvInput = null; /* fileinputをクリア */
    }
  }
}
</script>
<style scoped>
label > input {
  display:none;
}
label {
  color: #000; /* ラベルテキストの色を指定する */
  background-color: #FFF;/* ラベルの背景色を指定する */
  padding: 10px; /* ラベルとテキスト間の余白を指定する */
  border: double 4px #000;/* ラベルのボーダーを指定する */
  line-height: 100%;
}
th, td {
  text-align: center;
}
</style>
