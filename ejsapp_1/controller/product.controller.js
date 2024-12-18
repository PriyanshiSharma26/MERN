import pool from "../db/dbConfig.js"
import product from "../model/Product.js";


export const addProductPage = (request,response,next)=>{
    response.render("add-product.ejs");
}

export const addProductAction = (request,response,next)=>{
        // console.log(request.body);
        // response.end("ok")

        let { title,price,category_id } = request.body;
        let pro = new product(title,price,category_id);
    
        
        pro.insert_product()
            .then(result => {
                if (result.affectedRows > 0) { 
                    response.redirect("/admin/dashboard"); 
                } else {
                    response.redirect("/admin/sign-in");  
                }
            })
            .catch(err => {
                console.log(err);
                response.status(500).end("An error occurred during product insertion");
            });     
        }



        export const viewProductAction = (request, response, next) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = `SELECT 
                         product.id, 
                         product.name AS product_name, 
                         product.price, 
                         categories.name AS category_name
                          FROM product
                      INNER JOIN categories ON product.category_id = categories.id;`            
          
                    con.query(sql, (err, result) => {
                        con.release();
                        if (!err) {
                          console.log(result);
                          response.render("Product-view.ejs", { product: result || [] });
                          // return  response.render("view_product.ejs", { products: result });
                        } else {
                            console.log("Error while fetching data:", err);
                            response.send("Error while fetching data.");
                        }
                    });
                } else {
                    console.log("Connection error:", err);
                    response.send("Database connection failed.");
                }
            });
          };


          export const editProductAction = (request,response,next)=>{
            let {id,name,price} = request.body;
            console.log(request.body);
            let p = new product(name,price,id);
            p.update()
            .then(result=>{
                response.redirect("/product/view-product");
            }).catch(err=>{
                console.log(err);
            })
        }
        export const editProductPage = async (request,response,next)=>{
           try{ 
            let productId = request.params.productId;
            let result  = await product.getProductById(productId);
            console.log(result[0]);
            return response.render("edit-product.ejs",{product: result[0]});
           }
           catch(err){
            console.log(err);
           }
        }
        export const deleteProduct = (request,response,next)=>{
            let productId = request.params.productId;
            product.delete(productId)
            .then(result=>{
                return response.redirect("/product/view-product");
            }).catch(err=>{
                console.log(err);
            })
        }