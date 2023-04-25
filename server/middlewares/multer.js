const multer = require ("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,path.join(__dirname,"../../public/public/images"))
    },
    filename:function(req,file,cd){
        cd(null,Date.now()+'-'+file.originalname)
    }
})

const upload =multer({storage:storage})
module.exports =upload