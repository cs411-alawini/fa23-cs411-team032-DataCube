## ER:

![project1_stage2.drawio (1)](/Users/czh/Downloads/project1_stage2.drawio (1).png)

## FDs:

userID -> userName, password，userType, PredictID, input

userID, input-> predictID

userID, predictID -> model, result

channelId -> channelTitle

videoId -> view_count, comment count, title, trending_date, tags, description, like, dislike

ChannelId, videoId -> publishedAt

## Normalization

To begin with, our team choose to use 3NF to normalize our scheme. Comparing with BCNF, 3NF will keep some related dependencies in one table which will lead to simpler table implementations. For our database design, since our database do not have very complicated dependencies (basically for each entity, all attributes depend on the prime key of the entity), we decided to use 3NF to make our design tide and workable. 


 ***User(userId:INT [PK], userName:VARCHAR(30), password:VARCHAR(40), userType ENUM('admin', 'default'))***


 ***Prediction(predictId:INT [PK], userId: INT [PK] [FK to User.userId], model ENUM('tag_generation', 'trending_prediction'), input:VARCHAR(100), result:VARCHAR(100))***


 ***Channel(channelId: INT [PK], channelTitle VARCHAR(30))***


 ***Update(video_id: INT [PK] [FK to Video.video_Id], userId: INT [PK] [FK to User.userId)***


 ***Category(categoryId: INT [PK], categoryName: VARCHAR(30))***

***Video(video_id INT [PK], channelId: INT [FK to Channel.channelId], categoryId: INT [FK to Category.categoryId], dislikes: INT, likes: INT, description: TEXT, tags: VARCHAR(255), trending_date: DATE, title: VARCHAR(255), comment_count: INT, view_count: BIGINT, published_at: DATE, Region: VARCHAR(255))***

This is our current relational schema translated from the ER diagram. It has already met the requirements of 3NF. 

For the user table, dependency indicates that username, password, and user type depend on the user id. 

Since prediction is a weak entity, the prediction ID and user ID decide the output and model. Even though prediction ID depends on user ID and input, prediction ID is part of the prime key for this table, so 3NF still stands.

For the channel table and category table, the channel title depends on the channel ID, and the category name depends on the category ID, so these tables meet 3NF requirements.

For the update table, the table only stores any maintenance record of the admin updating the video table. 

Last, all attributes in video tables like region, channel ID, category ID, tags, etc. all depend on the video ID. Therefore, video ID is a non-trivial key for this table which meet the requirement of 3NF. 

## Relational Schema:


User(userId:INT [PK], userName:VARCHAR(30), password:VARCHAR(40), userType ENUM('admin', 'default'))

Prediction(predictId:INT [PK], userId: INT [PK] [FK to User.userId], model ENUM('tag_generation', 'trending_prediction'), input:VARCHAR(100), result:VARCHAR(100))


Channel(channelId: INT [PK], channelTitle VARCHAR(30))

Update(video_id: INT [PK] [FK to Video.video_Id], userId: INT [PK] [FK to User.userId)

Category(categoryId: INT [PK], categoryName: VARCHAR(30))


Video(video_id INT [PK], channelId: INT [FK to Channel.channelId], categoryId: INT [FK to Category.categoryId], dislikes: INT, likes: INT, description: TEXT, tags: VARCHAR(255), trending_date: DATE, title: VARCHAR(255), comment_count: INT, view_count: BIGINT, published_at: DATE, Region: VARCHAR(255))



## Description and Assumption:

### Entity

**User:** Generated for anyone who wishes to use TuberInsights. Users must first provide userName and password to register. UserId will be assigned to each user during registration.

**Normal User:** A subclass from User. This will be the default type for most users as these will be the customers trying to require predictions and view trending video info. UserType will be marked as a normal user when registering. 

**Admin:** A subclass from User. This will be the user type for website administrators who can update and delete video and channel information.

**Prediction:** A weak entity referencing users. Regular users can request predictions about suggested video tags by inputting some descriptions. A new row will be added to the prediction table with the user ID, input, output, and unique prediction ID when requesting a prediction.

**Channel:** Each Youtuber has its channel. In the video table, each row will have a channel ID referencing the channel table. The channel table provides channel title paring with channel ID.

**Video:** All info provided by the raw data is stored in this table. Besides, each row will have a region attribute based on different CSV files of different locations. video reference to channel table by channel ID and category table by category ID.

**Category:** a table stores information about the category ID and its corresponding name.

## Relationship:

**User-Prediction Relationship (Request):**

\-    One-to-many from User to Prediction

\-    Assumptions: A user can request multiple predictions, but each prediction is associated with only one user.

**User-Video Relationship (Update):**

\-    Many-to-Many between User and Video through the Update entity

\-    Assumptions: Users can update multiple videos, and multiple users can update videos.

**Channel-Video Relationship (Publish):**

\-    One-to-many from Channel to Video

\-    Assumptions: A channel can publish multiple videos, but each video belongs to one and only one channel.

**Category-Video Relationship (Belong):**

\-    One-to-many from Category to Video

\-    Assumptions: A category can have multiple videos, but each video belongs to one and only one category.