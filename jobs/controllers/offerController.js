const connection = require("../config/db");

class offerController {
  showFormOffer = (req, res) => {
    const { company_id } = req.params;
    res.render("offerRegister", { company_id });
  };

  addOffer = (req, res) => {
    const { company_id } = req.params;
    const { title, description, salary } = req.body;

    let sql =
      "INSERT INTO offer (title, offer_description, salary, company_id) VALUES (?, ?, ?, ?)";
    let values = [title, description, salary, company_id];

    if (req.file) {
      sql =
        "INSERT INTO offer (title, offer_description, salary, company_id, img) VALUES (?, ?, ?, ?,?)";
      values = [title, description, salary, company_id, req.file.filename];
    }

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/company/oneCompany/${company_id}`);
      }
    });
  };

  showEditOffer = (req, res) => {
    const { offer_id } = req.params;
    let sql = "SELECT * FROM offer WHERE offer_id = ? AND offer_is_deleted = 0";
    connection.query(sql, [offer_id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.render("EditOffer", { result: result[0] });
      }
    });
  };

  editOffer = (req, res) => {
    const { company_id, offer_id } = req.params;
    const { title, description, salary } = req.body;
    let sql =
      "UPDATE offer SET title = ?, offer_description = ?, salary = ? WHERE offer_id = ? ";
    let values = [title, description, salary, offer_id];

    connection.query(sql, values, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/company/oneCompany/${company_id}`);
      }
    });
  };

  deleteOffer = (req, res) => {
    const { company_id, offer_id } = req.params;
    let sql = "DELETE from offer WHERE offer_id = ?";
    connection.query(sql, [offer_id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/company/oneCompany/${company_id}`);
      }
    });
  };

  logicDeleteOffer = (req, res) => {
    const { company_id, offer_id } = req.params;
    let sql = "UPDATE offer SET offer_is_deleted = 1 WHERE offer_id = ?";
    connection.query(sql, [offer_id], (err, result) => {
      if (err) {
        throw err;
      } else {
        res.redirect(`/company/oneCompany/${company_id}`);
      }
    });
  };
}

module.exports = new offerController();
