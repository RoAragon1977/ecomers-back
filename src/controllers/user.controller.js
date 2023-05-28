import { Encrypt, Compare } from "../helpers/password.helper";
import productoSchema from "../models/producto";
import userScheme from "../models/user"

const Login_Error_Message = "El usuario o la contraseña no coincide"
const base_error_objet = {
  ok: false,
  error_msg: Login_Error_Message,
}

async function AddUser(req, res) {
  try {
    const { email, password, photoUrl} = req.body;

    const passwordHash = await Encrypt(password);
    console.log(passwordHash);
    const newUser = await userScheme.create({
      email,
      photoUrl,
      passwordHash,
      favoritos: [],
    });

    return res.json({
      ok: true,
      data_added: newUser,
    })
  } catch (err) {
      console.log(err);
      return res.status(400).json({
        ok: false,
        message: err
    });
  }
};

async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const userLogged = await userScheme.findOne({ email }).populate();

    if (!userLogged) return res.status(400).json(base_error_objet);

    const passwordCheck = await Compare(password, userLogged.passwordHash);

    if(!passwordCheck) return res.status(400).json(base_error_objet);

    const token = userLogged.generateAccesToken();

    return res.status(200).json ({
      ok: true,
      user: userLogged,
      token: token,
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      message: err,
    });
  }
};

async function AddFavoriteProduct(req, res) {
  try {
    const { userId, productId } = req.body;

// Verifica si el usuario existe    
    const user = await userScheme.findById(userId);
    if (!user) {
      return res.status(400).json({
        ok: false,
        error_msg: 'Usuario no encontrado'
      });
    }

// Verificar si el producto existe  
  const producto = await productoSchema.findById(productId);
  if (!producto) {
    return res.status(404).json({
      ok: false,
      error_msg: 'Producto no encontrado'
    });
  }

// Agregar el producto a la lista de favoritos del usuario
  user.favoritos.push(producto);
  await user.save();

  return res.status(200).json({
    ok: true,
    message: 'Producto agregado a favoritos'
  });
  }catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error,
    });
  }
};

export { AddUser, Login, AddFavoriteProduct };