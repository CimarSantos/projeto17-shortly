import { STATUS_CODE } from "../enums/statusCode.js";
import { schemas } from "../schemas/schemas.js";

async function schemasValidation(req, res, next) {
  const { path } = req.route;
  let result;

  if (path === "/signup") {
    const { error } = schemas.signUpSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details
        .map((detail) => detail.message)
        .join(",")
        .replace("[ref:password]", "equal to password");
      return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
    }
  }

  if (path === "/signin") {
    result = schemas.signInSchema.validate(req.body, {
      abortEarly: false,
    });
  }

  if (path === "/urls/:id") {
    let { id } = req.params;
    id = id.trim();

    result = schemas.paramsIdSchema.validate({ id });
    res.locals.id = result?.value.id;
  }

  if (path === "/urls/open/:shortUrl") {
    result = schemas.paramsShortUrl.validate(req.params);
  }

  if (result?.error) {
    const message = result.error.details
      .map((detail) => detail.message)
      .join(",");
    return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send({ message });
  }

  next();
}

export { schemasValidation };
