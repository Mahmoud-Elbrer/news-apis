-- news queries

-- -- Create users table
-- CREATE TABLE users (
--     id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
--     name VARCHAR(255) NOT NULL , 
--     email VARCHAR(255) , 
--     password VARCHAR(255) NOT NULL , 
--     phone VARCHAR(255) NOT NULL , 
--     emailVerified BOOLEAN  , 
--     phoneVerified BOOLEAN  , 
--     profilePhoto VARCHAR(500) , 
--     created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );


-- Create users table
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    name VARCHAR(255) NOT NULL , 
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Create User Emails table By email and password
CREATE TABLE userEmails (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    emailVerified BOOLEAN  , 
    phoneVerified BOOLEAN  , 
    profilePhoto VARCHAR(500) ,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
-- Create User Phones table by phone number verification 
CREATE TABLE userPhones (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    phone VARCHAR(20) UNIQUE,
    phoneVerified BOOLEAN  , 
    profilePhoto VARCHAR(500) ,
    otp VARCHAR(10),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- OTP table to store OTPs for phone verification
CREATE TABLE otps (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    otp VARCHAR(10) NOT NULL,
    otpType ENUM('email', 'phone') NOT NULL,
    expiresAt TIMESTAMP,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);


-- Create User UserNames table
CREATE TABLE userUsernames (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    phone VARCHAR(255) , 
    emailVerified BOOLEAN  , 
    phoneVerified BOOLEAN  , 
    profilePhoto VARCHAR(500) , 
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create User Google table
CREATE TABLE userGoogle (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    googleId VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);


-- Create User Facebook table
CREATE TABLE userFacebook (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    facebookId VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);


-- Create User Apple table
CREATE TABLE userApple (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    appleId VARCHAR(255) UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);


-- Create User Twitter table
CREATE TABLE userTwitter (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    twitterId VARCHAR(255) UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);



-- Create categories table
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    name VARCHAR(255) NOT NULL , 
    nameEn VARCHAR(255) NOT NULL , 
    image VARCHAR(500) , 
    enable BOOLEAN NOT NULL DEFAULT TRUE,  
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Create typeCategories table
CREATE TABLE typeCategories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    name VARCHAR(255) NOT NULL , 
    nameEn VARCHAR(255) NOT NULL , 
    enable BOOLEAN NOT NULL DEFAULT TRUE, 
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create channels table
CREATE TABLE channels (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    categoryId BIGINT UNSIGNED NOT NULL,
    typeCategoryId BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) , 
    language ENUM('ar', 'en') NOT NULL,
    nameEn VARCHAR(255) , 
    channelUrl VARCHAR(255) , 
    image VARCHAR(500) NOT NULL , 
    enable BOOLEAN , 
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (typeCategoryId) REFERENCES typeCategories(id) ON DELETE CASCADE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Create news table
CREATE TABLE news (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    channelId BIGINT UNSIGNED NOT NULL,
    title TEXT NOT NULL , 
    link VARCHAR(255) NOT NULL, 
    pubDate  DATE NOT NULL,
    enclosures VARCHAR(255) , 
    content TEXT NOT NULL , 
    contentSnippet VARCHAR(255) , 
    guid VARCHAR(255) , 
    isoDate DATE , 
    itunes VARCHAR(255) , 
    enable BOOLEAN NOT NULL DEFAULT TRUE,  
    FOREIGN KEY (channelId) REFERENCES channels(id) ON DELETE CASCADE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Create favoriteNews table
CREATE TABLE favoriteNews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    newsId BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (newsId) REFERENCES news(id) ON DELETE CASCADE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create subscriptionUser table
CREATE TABLE subscriptionUser (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    channelId BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (channelId) REFERENCES channels(id) ON DELETE CASCADE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Create subscriptionUser table
CREATE TABLE subscriptionUser (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    channelId BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (channelId) REFERENCES channels(id) ON DELETE CASCADE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Create the comments table
CREATE TABLE comments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    content TEXT NOT NULL,
    userId BIGINT UNSIGNED NOT NULL,
    newsId BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (newsId) REFERENCES news(id) ON DELETE CASCADE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the replies Comment table
CREATE TABLE repliesComment (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    content TEXT NOT NULL,
    userId BIGINT UNSIGNED NOT NULL,
    commentId BIGINT UNSIGNED NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE
);



-- Create the CommentLikes table
CREATE TABLE commentLikes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    commentId BIGINT UNSIGNED NOT NULL,
    isLike BOOLEAN NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE
);

-- Create the ReplyLikes table
CREATE TABLE replyLikes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY , 
    userId BIGINT UNSIGNED NOT NULL,
    replyId BIGINT UNSIGNED NOT NULL,
    isLike BOOLEAN NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (replyId) REFERENCES repliesComment(id) ON DELETE CASCADE
);