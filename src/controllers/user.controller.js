import { Encrypt, Compare } from "../helpers/password.helper";
import producto from "../models/producto";
import UserScheme from "../models/user"

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
    const newUser = await UserScheme.create({
      email,
      photoUrl,
      passwordHash,
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
    const userLogged = await UserScheme.findOne({ email }).populate();

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
}  

export { AddUser, Login };