import Dexie from "./dexie.min.js"
const database = new Dexie("AppDatabase0001")
database.version(1).stores({
    dataset: "++id, kana, kanji, lastdate"
})

export default {
    debug: true,
    db: database,
    currentItems: [], /* indexedDBに登録されているデータ */
    newItems: [], /* CSVから読み込んだデータ */
    async setCurrentItems(){ /* CurrentItemsをDBから読込 */
        const result = await this.db.dataset.toArray()
        this.currentItems.splice(0,this.currentItems.length,...result)
    },
    updateCurrentItems(){ /* newItemsからcurrentItemsとDBへ登録 */
        this.currentItems.splice(0,this.currentItems.length,...(this.newItems || []))
        this.db.dataset.clear();
        this.db.dataset.bulkAdd(this.currentItems);
    },
    setNewItems(newItems){ /* newItemsを設定(ペアの配列[[x,y], ... ]) */
        this.newItems.splice(0,this.newItems.length,...(newItems || []))
    },
    clearNewItems(){
        this.newItems.splice(0)
    }
}
