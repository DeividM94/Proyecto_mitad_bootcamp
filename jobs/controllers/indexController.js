const connection = require("../config/db");

class IndexController {
  openIndex = (req, res) =>{
    let sql = 'SELECT * FROM company WHERE company_is_deleted = 0';
    connection.query(sql, (err, result)=>{
      if(err){
          throw err
      }else{
    res.render('index', {result})
  }
});
};
}



module.exports = new IndexController;