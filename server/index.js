const express = require("express");
const cors = require("cors");
const port = 8888;
const pool = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/manga", (req, res) => {
  const a = req.body;
  res.send(JSON.stringify(a));
});

// insert title
//  TODO: "unit testing for post('/post')"
app.post("/title", async (req, res) => {
  const client = await pool.connect();
  // console.log(client);
  try {
    // get request input from client
    const { first_name, last_name, title_name } = req.body;
    // console.log(req.body);
    await client.query("BEGIN");

    // Insert new title
    const newTitle = await client.query(
      "INSERT INTO title (title_name) VALUES ($1) RETURNING title_id;",
      [title_name],
    );
    const newTitleID = newTitle.rows[0].title_id;
    // console.log(newTitleID);

    // Insert author
    const newAuthor = await client.query(
      "INSERT INTO author (first_name, last_name) VALUES ($1, $2) RETURNING author_id",
      [first_name, last_name],
    );
    const newAuthorID = newAuthor.rows[0].author_id;
    // console.log(newAuthorID);

    // Insert author
    const newIllustrator = await client.query(
      "INSERT INTO illustrator (first_name, last_name) VALUES ($1, $2) RETURNING illustrator_id",
      [first_name, last_name],
    );
    const newIllustratorID = newIllustrator.rows[0].illustrator_id;
    // console.log(newIllustratorID);

    // Insert TitleAuthor
    const titleauthor = await client.query(
      "INSERT INTO titleauthor (title_id, author_id) VALUES ($1, $2)",
      [newTitleID, newAuthorID],
    );

    // Insert TitleIllustrator
    const titleillustrator = await client.query(
      "INSERT INTO titleillustrator (title_id, illustrator_id) VALUES ($1, $2)",
      [newTitleID, newIllustratorID],
    );

    // Insert TitleIllustrator

    await client.query("COMMIT");

    res.json({ newTitle, newAuthor, titleauthor });
  } catch (e) {
    /* handle error */
    client.query("ROLLBACK");
    console.log(e.message);
  } finally {
    client.release();
  }
});

// create new series
// TODO: unit test for post('/series')
app.post("/series", async (req, res) => {
  const client = await pool.connect();
  try {
    // get request input from client
    const {
      series_edition,
      series_language,
      series_status,
      publisher_name,
      first_name,
      last_name,
      country,
      title_id,
    } = req.body;
    await client.query("BEGIN");

    // Insert Publisher
    const newPublisher = await client.query(
      "INSERT INTO publisher (publisher_name, country) VALUES ($1, $2) RETURNING publisher_id",
      [publisher_name, country],
    );
    const publisherID = newPublisher.rows[0].publisher_id;
    console.log(publisherID);

    // Insert Series
    const newSeries = await client.query(
      "INSERT INTO series (series_edition, series_language, series_status, title_id, publisher_id) VALUES ($1, $2, $3, $4, $5) RETURNING series_id",
      [series_edition, series_language, series_status, title_id, publisherID],
    );
    const seriesID = newSeries.rows[0].series_id;
    console.log(seriesID);

    const newTranslator = await client.query(
      "INSERT INTO translator (first_name, last_name) VALUES ($1, $2) RETURNING translator_id",
      [first_name, last_name],
    );
    const translatorID = newTranslator.rows[0].translator_id;
    console.log(translatorID);

    const seriestranslator = await client.query(
      "INSERT INTO seriestranslator (series_id, translator_id) VALUES ($1, $2)",
      [seriesID, translatorID],
    );

    client.query("COMMIT");
  } catch (e) {
    /* handle error */
    client.query("ROLLBACK");
    console.log(e.message);
  } finally {
    /* be executed regardless of the try / catch result*/
    client.release();
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
    return;
  }

  console.log(`Server is running on port ${port}`);
});
