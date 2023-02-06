const express = require('express');
const router = express.Router();
const basicController = require('../controller/basic.controller');
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './basics');
    },
      filename:(req,file,cb)=>{
          cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
      }
      
    })
    const upload= multer({
      storage:storage,
      fileFilter:(req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
          return cb(null,true);
        }
        cb("Error: The file should be an image");
      }
    })  

router.post('/', upload.single('photo'), basicController.addEmp);
router.get('/', basicController.findEmps);
router.put('/:id', basicController.updateEmp);
router.delete('/:id', basicController.deleteById);

module.exports = router;