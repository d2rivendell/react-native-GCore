/**
 * Created by Leon.Hwa on 17/5/4.
 */
import  SQLite from  'react-native-sqlite-storage'
let instance = null;

var name = '';

export default class DataManager {

    constructor() {
        if(!instance){
            instance = this;
            this.db = SQLite.openDatabase("test.db", "1.0", "Test Database", 500000, this.openCB, this.errorCB);
            this.createTable()
        }
        return instance;
    }

    errorCB(err) {
        console.log("SQL Error: " + err);
    }

    successCB() {
        console.log("SQL executed fine");
    }

    openCB() {
        console.log("Database OPENED");
    }
    createTable(){
        this.db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS TimeLine( '
                 + 'id INTEGER PRIMARY KEY NOT NULL,'
                 + 'timeLine BLOB,'
                  +'pageInfo BLOB);',
                [], (tx,res) => {
              console.log(res)
              });
        });
    }
    saveAudioInfo(timeLine,pageInfo){

        this.db.transaction((tx)=>{
            let sql = 'INSERT INTO TimeLine(timeLine,pageInfo) VALUES (?,?)'
            tx.executeSql(sql)
        },[timeLine,pageInfo],(error)=>{
            console.log(error)
        })
    }

    dropTable(tableName){
        this.db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS '+tableName +';')
        },[],(tx,res)=>{
            console.log(res)
        })
    }
    getAudioInfo(){
        this.db.transaction((tx)=>{
            let sql = 'SELECT *FROM TimeLine;'
            tx.executeSql(sql)
        },[],(tx,results)=>{
            console.log(results)
        })
    }
}
