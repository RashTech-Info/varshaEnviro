let express = require("express");
const {
  addClients,
  updateClients,
  getClients,
  deleteClients
} = require("../../controllers/admin/clients");
let router = express.Router();
let auth = require("../../../auth/adminauth");
const multer = require("multer");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router.get("/getClient", getClients);
router.post("/addClient", auth, upload.single("image"), addClients);
router.put("/updateClient/:id", auth, upload.single("image"), updateClients);
router.delete("/deleteClient/:id", auth, deleteClients);

module.exports = router;
