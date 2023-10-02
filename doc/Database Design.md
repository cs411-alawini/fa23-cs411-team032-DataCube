# Description 

### Entity
**User**: Generated for anyone who wishes to use TuberInsights. Users must first provide userName and password to register. UserId will be assigned to each user during registration.

**Normal User**: A subclass from User. This will be the default type for most users as these will be the customers trying to require predictions and view trending video info. UserType will be marked as a normal user when registering

**Admin**: A subclass from User. This will be the user type for website administrators who can update and delete video and channel information. 

**Prediction**: A weak entity referencing users. Normal users can request predictions about suggested tags for their videos by inputting some descriptions about their videos. When requesting a prediction, a new row will be added to the prediction table with the user ID, input, output, and unique prediction ID. 

**channel**: 


Description 

Entity

User: Generated for anyone who wishes to use TuberInsights. Users must first provide userName and password to register. UserId will be assigned to each user during registration.

Normal User: A subclass from User. This will be the default type for most users as these will be the customers trying to require predictions and view trending video info. UserType will be marked as a normal user when registering

Admin: A subclass from User. This will be the user type for website administrators who can update and delete video and channel information. 

Prediction: A weak entity referencing users. Normal users can request predictions about suggested tags for their videos by inputting some descriptions about their videos. When requesting a prediction, a new row will be added to the prediction table with the user ID, input, output, and unique prediction ID. 

channel: Each Youtuber has its own channel. In the video table, each row will have a channel ID referencing the channel table. The channel table provides channel title paring with channel ID.

video: All info provided by the raw data is stored in this table. Besides, based on different CSV files of different locations, each row will have a region attribute. video reference to channel table by channel ID and reference to category table by category ID. 

category: a table stores info about the category ID and its corresponding category name. 
