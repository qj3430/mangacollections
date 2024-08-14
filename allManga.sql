CREATE TABLE Author (
	author_id SERIAL PRIMARY KEY,
	first_name VARCHAR(255),
	last_name VARCHAR(255)
);


CREATE TABLE Illustrator (
	illustrator_id SERIAL PRIMARY KEY,
	first_name VARCHAR(255),
	last_name VARCHAR(255)
);

CREATE TABLE Publisher (
	publisher_id SERIAL PRIMARY KEY,
	publisher_name VARCHAR(255),
	country VARCHAR(100)
);

CREATE TABLE Translator (
	translator_id SERIAL PRIMARY KEY,
	first_name VARCHAR(255),
	last_name VARCHAR(255)
);

CREATE TABLE Title (
    title_id SERIAL PRIMARY KEY,
    title_name VARCHAR(255) NOT NULL
);

CREATE TABLE Series (
    series_id SERIAL PRIMARY KEY,
    series_edition VARCHAR(50),
    series_language VARCHAR(50),
    series_status VARCHAR(10),
    publisher_id INT,
		title_id INT
    FOREIGN KEY (publisher_id) REFERENCES Publisher(publisher_id)
    FOREIGN KEY (title_id) REFERENCES Title(title_id)
);

CREATE TABLE Volume (
    volume_id SERIAL PRIMARY KEY,
    ISBN VARCHAR(13) NOT NULL UNIQUE,
    volume_no FLOAT,
    volume_name VARCHAR(255),
    volume_cover VARCHAR(255),
    publish_date DATE,
    series_id INT,
    FOREIGN KEY (series_id) REFERENCES Series(series_id)
);

CREATE TABLE TitleIllustrator (
    title_id INT,
    illustrator_id INT,
    PRIMARY KEY (title_id, illustrator_id),
    FOREIGN KEY (title_id) REFERENCES Title(title_id),
    FOREIGN KEY (illustrator_id) REFERENCES Illustrator(illustrator_id)
);

CREATE TABLE SeriesTranslator (
    series_id INT,
    translator_id INT,
    PRIMARY KEY (series_id, translator_id),
    FOREIGN KEY (series_id) REFERENCES Series(series_id),
    FOREIGN KEY (translator_id) REFERENCES Translator(translator_id)
);

CREATE TABLE TitleAuthor (
    title_id INT,
    author_id INT,
    PRIMARY KEY (title_id, author_id),
    FOREIGN KEY (title_id) REFERENCES Title(title_id),
    FOREIGN KEY (author_id) REFERENCES Author(author_id)
);
