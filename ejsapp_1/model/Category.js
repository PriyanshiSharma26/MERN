import pool from "../db/dbConfig.js";

export default class category{
    constructor(id,category_name)
    {
        this.id=id
        this.category_name=category_name
        
    }
      



    insert_category() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "INSERT INTO categories (name) VALUES (?)";
                
                    con.query(sql, [this.category_name], (err, result) => {
                        con.release();
                        if (!err){
                            console.log("insertion done .......")
                            resolve(result);
                        }
                        else
                        console.log("some error....in insertion");
                            reject(err);
                    });
                } else {
                    console.log("second");
                    reject(err);
                }
            });
        });
    }


//   static category_view()
//   {
//     return new Promise((resolve,reject)=>{
//         pool.getConnection((err,con)=>{
//             if(!err){
//                let sql = "select * from categories";
//                con.query(sql,[this.name],(err,result)=>{
//                 con.release();
//                 if(!err)
//                    resolve(result);
//                 else
//                  reject(err);
//                });
//             }
//             else
//               reject(err);
//         })
//     });
// }


static getCategoryById(id){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
              let sql = "select * from categories where id = ?";
              con.query(sql,[id],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              });
            }
            else
              reject(err);
        })
       });
    }


    update(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql = "update categories set name=? where id = ?";
                  con.query(sql,[this.category_name,this.id],(err,result)=>{
                    err ? reject(err) : resolve(result);
                    con.release();
                  });
                }
                else
                  reject(err);
            })
           });
    }
   



    static delete(id) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (err) {
                    console.log("Database connection error:", err);  // Log connection issues
                    reject(err);
                    return;
                }
    
                let sql = "DELETE FROM categories WHERE id = ?";
                console.log("SQL Query:", sql, [id]);  // Log the query being executed
                con.query(sql, [id], (err, result) => {
                    if (err) {
                        console.log("Error executing delete query:", err);  // Log any query errors
                        reject(err);
                    } else {
                        console.log("Deletion successful. Result:", result);  // Log query success
                        resolve(result);
                    }
                    con.release();
                });
            });
        });
    }
    





}