import jwt from "jsonwebtoken";

function Authenticate(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) 
    return res.status(404).json({
      ok: false,
      error_msg: 'Usuario no autorizado primer if'
    });

    jwt.verify(token, 'mi secreto', (error, payload) => {
      if(error){
        return res.status(404).json({
          ok: false,
          error_msg: 'Usuario no autorizado segudo if'
        });
      }

      console.log(token, 'en la verificación');
      next();
    });
} 

export { Authenticate };