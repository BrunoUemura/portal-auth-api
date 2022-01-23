CREATE TABLE users (
    id VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
  	password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,

    PRIMARY KEY (id)
);