const multer = require('multer');

const uploadImage = (carpeta) =>{
    //1.- configurar donde y como se guarda mi archivo

    const storage = multer.diskStorage({
        destination: `public/images/${carpeta}`,
        filename: function(req, file, cb){
            let nombreOriginal = file.originalname;
            const finalName = `${Date.now()}-${nombreOriginal}`;
            cb(null, finalName);
        }
    })

    const upload = multer({storage: storage}).single("img");

    return upload;

}
module.exports = uploadImage;

