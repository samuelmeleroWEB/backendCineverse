import jwt from 'jsonwebtoken' // importamos jwt para verificar tokens


export const authMiddleware = (req, res, next) => { // creamos middleware, con 3 parametros = req,res y next, que deja pasar a la siguiente funcion
  try {
    const authHeader = req.headers.authorization; // revisa en header si tienes autorizacion, si no tienes, mandara ese error
    if (!authHeader) {
      return res.status(401).json({ message: 'No se proporcionó token' });
    }

    const token = authHeader.split(' ')[1]; // esto lo hacemos para que no lea bearer
    if (!token) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify  para detectar si token corresponde con nuestro.env
    req.user = decoded; // aqui reconocemos que existe
    next(); // lo dejamos pasar
  } 
  catch (error) {
    console.error('Error en authMiddleware:', error);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// ----------- SOLO ADMIN ----------- //
export const isAdmin = (req, res, next) => {  // isadmin mira req.user, si no hay usuario 401, si no es el rol 403, si s admin, next
  try {
    // authMiddleware debe haber metido req.user antes
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso solo para administradores' });
    }

    // Si es admin, continua
    next();
  } catch (error) {
    console.error('Error en isAdmin:', error);
    return res.status(500).json({ message: 'Error en el servidor (isAdmin)' });
  }
};