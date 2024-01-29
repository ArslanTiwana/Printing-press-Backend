const jwt = require("jsonwebtoken");
function currentToken(req) {
  const { access_token } = req.headers;
  if (access_token) {
    return access_token;
  } else {
    return undefined;
  }
}

async function Authorization(req, res, next) {
  try {
    const token = currentToken(req);
    const result = await verifyAccessToken(token);
      if (!result?.data) {
        console.log('Permission:', 'Unauthorized!');
        return res.status(401).json({
          code: 401,
          message: result?.message,
        });
      } 
      req.user = result?.data;
      next();
    } catch (error) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid access token',
      error:error
    });
  }
}

function createAccessToken(payload){
  const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;
  const accessToken = jwt.sign(JSON.parse(JSON.stringify(payload)), "JWT_SECRET_ACCESS_TOKEN", { expiresIn });
  console.log(accessToken)
  return accessToken;
}

async function getTokenPayload(token) {
  return jwt.verify(token, JWT_SECRET_ACCESS_TOKEN, { ignoreExpiration: true });
}


async function verifyAccessToken(token) {
  try {
    if (!token) {
      return { data: null, message: 'Unauthorized!' };
    }
    const data = jwt.verify(token, "JWT_SECRET_ACCESS_TOKEN");
    console.log("data",data)
    return { data, message: 'Token is verified' };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log('JWT Expired Error:', err.message);
      return { data: null, message: `JWT Expired Error: ${err.message}` };
    }

    if (err instanceof JsonWebTokenError) {
      console.log('JWT Token Error:', err.message);
      return { data: null, message: `JWT Token Error: ${err.message}` };
    }

    if (err instanceof NotBeforeError) {
      console.log('JWT Not Before Error:', err.message);
      return { data: null, message: `JWT Not Before Error: ${err.message}` };
    }
  }
}
module.exports={Authorization,createAccessToken}
