const e = require("express");
const connection = require("../config/db");
const bcrypt = require("bcrypt");

class companyController {
  showRegister = (req, res) => {
    res.render("register");
  };

  register = (req, res) => {
    console.log(req.body);
    const { name, email, password, passwordRepeat } = req.body;

    let msgs = {
      textName: name,
      textEmail: email,
      textPassword: password,
      textPasswordRepeat: passwordRepeat,
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    };

    if (name == "" || email == "" || password == "" || passwordRepeat == "") {
      if (name == "") {
        msgs.name = "Company name is required";
      }
      if (email == "") {
        msgs.email = "Email is required";
      }
      if (password == "") {
        msgs.password = "Password is required";
      }
      if (passwordRepeat == "") {
        msgs.passwordRepeat = "Write your password again";
      }

      return res.render("register", { mensajes: msgs });
    } else {
      let sql = "SELECT * FROM company WHERE email = ?";
      let values = [email];
      connection.query(sql, values, (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result.length > 0) {
            msgs.email = "Email duplicate";
            return res.render("register", { mensajes: msgs });
          }
          if (password != passwordRepeat) {
            msgs.passwordRepeat = "Passwords do NOT match";
            return res.render("register", { mensajes: msgs });
          }
          let sql2 =
            "INSERT INTO company (name, email, password) VALUES (?, ?,?)";
          bcrypt.hash(password, 8, (errBycrypt, hash) => {
            if (errBycrypt) {
              throw errBycrypt;
            } else {
              connection.query(
                sql2,
                [name, email, hash],
                (errInsert, resultInsert) => {
                  if (errInsert) {
                    throw errInsert;
                  } else {
                    res.redirect("/");
                  }
                }
              );
            }
          });
        }
      });
    }
  };

  showOneCompany = (req, res) => {
    const { id } = req.params;
    let sql =
      "SELECT * FROM company WHERE company_id = ? AND company_is_deleted = 0";
    let values = [id];
    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        let sql2 =
          "SELECT * FROM offer WHERE company_id = ? AND offer_is_deleted = 0";

        connection.query(sql2, [id], (errOffer, resultOffer) => {
          if (errOffer) {
            throw errOffer;
          } else {
            res.render("oneCompany", { result: result[0], resultOffer });
          }
        });
      }
    });
  };

  showEdit = (req, res) => {
    const { company_id } = req.params;
    let sql =
      "SELECT * FROM company WHERE company_id = ? AND company_is_deleted = 0";
    connection.query(sql, [company_id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render("EditCompany", { result: result[0] });
      }
    });
  };

  editCompany = (req, res) => {
    const { company_id } = req.params;
    console.log(req.body);

    const { name, email, tel, city, address, description } = req.body;
    let sql =
      "UPDATE company SET name = ?, email = ?, address = ?, city = ?, description = ?, tel = ? WHERE company_id = ? ";
    let values = [name, email, address, city, description, tel, company_id];

    if (req.file) {
      sql =
        "UPDATE company SET name = ?, email = ?, address = ?, city = ?, description = ?, tel = ?, img = ? WHERE company_id = ? ";
      values = [
        name,
        email,
        address,
        city,
        description,
        tel,
        req.file.filename,
        company_id,
      ];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/company/oneCompany/${company_id}`);
      }
    });
  };

  logicDelCompany = (req, res) => {
    const { company_id } = req.params;
    let sql =
      "UPDATE company LEFT JOIN offer ON company.company_id = offer.company_id SET company.company_is_deleted = 1, offer.offer_is_deleted = 1 WHERE company.company_id = ?";
    connection.query(sql, [company_id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/");
      }
    });
  };
  //realmente la left join no es necesaria aqui porque solo se accede a las ofertas a través del a empresa y si no hay empresa, no se pueden ver las ofertas.(Se deja preparado por si acaso)

  deleteCompany = (req, res) => {
    const { company_id } = req.params;
    let sql = "DELETE from company where company_id = ?";
    connection.query(sql, [company_id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect("/");
      }
    });
  };
}

module.exports = new companyController();
