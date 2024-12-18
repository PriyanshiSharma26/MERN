import pool from "../db/dbConfig.js";
export default  class product{
    constructor( p_name,price,catgory_id){
    
        this.p_name=p_name;
        this.price=price;
        this.catgory_id=catgory_id
        console.log(this.id+" "+ this.p_name+" "+this.catgory_id)
    }
    insert_product() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "INSERT INTO product (name, price , category_id) VALUES (?,?,?)";
                
                    con.query(sql, [this.p_name,this.price,this.catgory_id], (err, result) => {
                        con.release();
                        if (!err)
                            resolve(result);
                        else
                        console.log("first");
                            reject(err);
                    });
                } else {
                    console.log("second");
                    reject(err);
                }
            });
        });
    }


static delete(id){
    return new Promise((resolve,reject)=>{
     pool.getConnection((err,con)=>{
         if(!err){
           let sql = "delete from product where id = ?";
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

 static getProductById(id){
     return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
             if(!err){
               let sql = "select * from product where id = ?";
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
               let sql = "update product set name=?,price=? where id = ?";
               con.query(sql,[this.p_name,this.price,this.catgory_id],(err,result)=>{
                 err ? reject(err) : resolve(result);
                 con.release();
               });
             }
             else
               reject(err);
         })
        });
 }
}