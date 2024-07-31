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

// NOTE: get all title
app.get("/title", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM title;");
    console.log(results);
    res.json(results.rows);
  } catch (e) {
    /* handle error */
  }
});

// NOTE: get title with title_id
app.get("/title/:title_id", async (req, res) => {
  const query = `
    SELECT
      t.title_name,
      t.title_id,
      t.title_cover_url,
      a.author_name,
      i.illustrator_name,
    FROM
      Title t
    LEFT JOIN
      TitleAuthor ta ON t.title_id = ta.title_id
    LEFT JOIN
      Author a ON ta.author_id = a.author_id
    LEFT JOIN
      TitleIllustrator ti ON t.title_id = ti.title_id
    LEFT JOIN
      Illustrator i ON ti.illustrator_id = i.illustrator_id
    WHERE
      t.title_id = $1
    GROUP BY
      t.title_id, t.title_name, t.title_cover_url;
  `;

  try {
    let reqTitleID = req.params.title_id;

    const result = await pool.query(query, [reqTitleID]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Title not found" });
    }
    const title_info = result.rows[0];
    console.log(title_info);
    res.json({
      title_id: title_info.title_id,
      title_name: title_info.title_name,
      title_cover_url: title_info.title_cover_url,
      authors_name: title_info.authors_name,
      illustrators_name: title_info.illustrators_name,
    });
  } catch (e) {
    /* handle error */
  }
});

// NOTE: get series with series_id
app.get("/series/:series_id", async (req, res) => {
  const query = `  
    SELECT
      s.series_id,
      s.series_edition,
      s.series_language,
      s.series_status,
      p.publisher_name,
      p.country,
      tr.translator_name,
      t.title_name
    FROM 
      Series s
    LEFT JOIN
      Publisher p ON s.publisher_id = p.publisher_id
    LEFT JOIN
      SeriesTranslator st ON s.series_id = st.series_id
    LEFT JOIN
      Translator tr ON st.translator_id = tr.translator_id
    LEFT JOIN
      Title t ON s.title_id = t.title_id
    WHERE
      s.series_id = $1
    GROUP BY
      s.series_id, s.series_edition, s.series_language, s.series_status, p.publisher_name, p.country, t.title_name;
  `;
  try {
    let reqSeriesID = req.params.series_id;
    const result = await pool.query(query, [reqSeriesID]);
    console.log(result);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Series Not Found" });
    }
    const series_info = result.rows[0];
    console.log(series_info);
  } catch (e) {
    /* handle error */
  }
});

// post title
app.post("/title", async (req, res) => {
  const client = await pool.connect();

  // console.log(client);
  try {
    // get request input from client
    const { author_name, title_name, title_cover_url, illustrator_name } =
      req.body;
    console.log(req.body);
    await client.query("BEGIN");

    // Insert new title
    const newTitleName = await client.query(
      "INSERT INTO title (title_name, title_cover_url) VALUES ($1, $2) RETURNING title_id;",
      [title_name, title_cover_url],
    );
    const newTitleID = newTitleName.rows[0].title_id;
    // console.log(newTitleID);

    // Insert author
    const newAuthor = await client.query(
      "INSERT INTO author (author_name) VALUES ($1) RETURNING author_id",
      [author_name],
    );
    const newAuthorID = newAuthor.rows[0].author_id;
    // console.log(newAuthorID);

    // Insert illustrator
    const newIllustrator = await client.query(
      "INSERT INTO illustrator (illustrator_name) VALUES ($1) RETURNING illustrator_id",
      [illustrator_name],
    );
    const newIllustratorID = newIllustrator.rows[0].illustrator_id;
    // console.log(newIllustratorID);

    // Insert TitleAuthor
    await client.query(
      "INSERT INTO titleauthor (title_id, author_id) VALUES ($1, $2)",
      [newTitleID, newAuthorID],
    );

    // Insert TitleIllustrator
    await client.query(
      "INSERT INTO titleillustrator (title_id, illustrator_id) VALUES ($1, $2)",
      [newTitleID, newIllustratorID],
    );

    await client.query("COMMIT");

    res.json({
      title_id: newTitleID,
      title_name: title_name,
      title_cover_url: title_cover_url,
      author_name: author_name,
      illustrator_name: illustrator_name,
    });
  } catch (e) {
    /* handle error */
    client.query("ROLLBACK");
    console.log(e.message);
  } finally {
    client.release();
  }
});

// create new series
app.post("/series", async (req, res) => {
  const client = await pool.connect();
  try {
    // get request input from client
    const {
      series_edition,
      series_language,
      series_status,
      publisher_name,
      translator_name,
      country,
      title_id,
    } = req.body;
    console.log(req.body);
    await client.query("BEGIN");

    // Insert Publisher
    const newPublisher = await client.query(
      "INSERT INTO publisher (publisher_name, country) VALUES ($1, $2) RETURNING publisher_id",
      [publisher_name, country],
    );
    const publisherID = newPublisher.rows[0].publisher_id;

    // Insert Series
    const newSeries = await client.query(
      "INSERT INTO series (series_edition, series_language, series_status, title_id, publisher_id) VALUES ($1, $2, $3, $4, $5) RETURNING series_id",
      [series_edition, series_language, series_status, title_id, publisherID],
    );
    const seriesID = newSeries.rows[0].series_id;

    const newTranslator = await client.query(
      "INSERT INTO translator (translator_name) VALUES ($1) RETURNING translator_id",
      [translator_name],
    );
    const translatorID = newTranslator.rows[0].translator_id;

    const seriestranslator = await client.query(
      "INSERT INTO seriestranslator (series_id, translator_id) VALUES ($1, $2)",
      [seriesID, translatorID],
    );

    client.query("COMMIT");
    res.json({ newPublisher, newSeries, newTranslator, seriestranslator });
  } catch (e) {
    /* handle error */
    client.query("ROLLBACK");
    console.log(e.message);
  } finally {
    /* be executed regardless of the try / catch result*/
    client.release();
  }
});

app.post("/volume", (req, res) => {
  try {
    const {
      isbn_no,
      volume_no,
      volume_name,
      volume_cover,
      publish_date,
      series_id,
    } = req.body;

    const newVolume = pool.query(
      "INSERT INTO volume (isbn, volume_no, volume_name, volume_cover, publish_date, series_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [isbn_no, volume_no, volume_name, volume_cover, publish_date, series_id],
    );

    res.json({ newVolume });
  } catch (e) {
    /* handle error */
    pool.query("ROLLBACK");
    console.log(e.message);
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
    return;
  }

  console.log(`Server is running on port ${port}`);
});
