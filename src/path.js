import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import path from "path";

export const __dirname = dirname(fileURLToPath(import.meta.url));
export const pathProducts = __dirname + "/daos/filesystem/productos.json";
export const pathCarritos = __dirname + "/daos/filesystem/carrito.json";
export const pathMessages = __dirname + "/daos/filesystem/messages.json";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadFolder = ""
    const uploadType = req.body.uploadType
    const userId = req.params.uid

    if (uploadType === "profile") {
        uploadFolder = "profiles"
    } else if (uploadType === "product") {
        uploadFolder = "products"
    } else if (uploadType === "document") {
        uploadFolder = "documents"
    }
    const userFolder = path.join(__dirname, '..', '/public/files', uploadFolder, userId);
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
      }  
    cb(null, userFolder);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
  
});

const fileFilter = function(req, file, cb) {
  const validDocumentNames = [
      "Identificacion",
      "Comprobante de domicilio",
      "Comprobante de estado de cuenta"
  ]
  const validExtensions = [".jpg", ".jpeg", ".png", ".pdf"]

  const uploadType = req.body.uploadType
  if (uploadType === "document") {
      const fileName = file.originalname.split(".")
      const fileBaseName = fileName.slice(0, -1).join(".")
      const fileExtension = `.${fileName.pop()}`

      if (
          validDocumentNames.includes(fileBaseName) &&
          validExtensions.includes(fileExtension)
      ) {
          cb(null, true)
      } else {
          cb(new Error("Nombre de archivo o extensión no válidos para la carga de documentos"), false);
      }
  } else {
      cb(null, true)
  }
};

export const uploader = multer({
  storage,
  fileFilter,
  onError: function(err, next){
      console.log(err)
      next()
  }
});


