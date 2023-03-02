import { db } from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import * as urlsRepository from "../repositories/urlRepository.js";
import { nanoid } from "nanoid";

async function shotyUrl(req, res) {
  const { userId } = res.locals;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await urlsRepository.insertUrlIntoUrls(userId, url, shortUrl);
    const cutUrl = await db.query("SELECT * FROM urls WHERE url = $1;", [url]);

    return res.status(STATUS_CODE.CREATED).send({
      id: cutUrl.rows[0].id,
      shortUrl: cutUrl.rows[0].shorturl,
    });
  } catch (error) {
    return res.sendStatus(STATUS_CODE.SERVER_ERROR);
  }
}



export { shotyUrl };
