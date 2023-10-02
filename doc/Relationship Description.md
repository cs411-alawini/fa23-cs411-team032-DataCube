# Relationships:

## User-Prediction Relationship (Request):
- One-to-Many from User to Prediction
- Assumptions: A user can request multiple predictions, but each prediction is associated with only one user.

## User-Video Relationship (Update):
- Many-to-Many between User and Video through the Update entity
- Assumptions: Users can update multiple videos, and videos can be updated by multiple users.

## Channel-Video Relationship (Publish):
- One-to-Many from Channel to Video
- Assumptions: A channel can publish multiple videos, but each video belongs to one and only one channel.

## Category-Video Relationship (Belong):
- One-to-Many from Category to Video
- Assumptions: A category can have multiple videos, but each video belongs to one and only one category.


Entities:
User:

Attributes: userId (PK), userName, password, userType
Assumptions: Each user has a unique ID and can be of type admin or default.
Prediction:

Attributes: predictId (PK), userId (FK), model, input, result
Assumptions: Each prediction is unique with a specific user associated with it.
Channel:

Attributes: channelId (PK), channelTitle
Assumptions: Each channel has a unique ID and title.
Update:

Attributes: channelId (FK), userId (FK)
Assumptions: The Update entity represents a record of user activity related to a channel. It might not be clear without further context whether multiple Updates per user and channel are allowed.
Category:

Attributes: categoryId (PK), categoryName
Assumptions: Each category is unique.
Video:

Attributes: video_id (PK), channelId (FK), categoryId (FK), and others.
Assumptions: Each video belongs to one channel and one category.
