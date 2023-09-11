## Team-032 DataCube Project Proposal

### Project Title: 

TuberInsights - Empower Your YouTube Success with Data-driven Insights

### Project Summary:

TuberInsights is a web platform designed to provide comprehensive insights for YouTube content creators. TuberInsights helps creators identify the best time to publish their videos by analyzing the correlation between view count and publish time. It provides valuable data on the optimal time of the day, date, and month for maximizing viewership. Additionally, TuberInsights enables creators to rank videos based on categories (tags), likes/dislikes, and regions. It offers insights into the total view count for each category and the like/dislike ratio for individual videos. Moreover, TuberInsights showcases the occurrence of tags in different countries and highlights the most popular video for each tag. With these functionalities, creators can make data-driven decisions, optimize their video publishing strategies, and enhance visibility and engagement.

TuberInsights offers a unique feature that visualizes videos as light data points on a world map within a specific time window. This visualization allows creators to observe global trends and predict the best publish time based on the provided tags. Furthermore, TuberInsights employs advanced algorithms to predict the top trending tags for the next time slot, enabling creators to stay ahead of emerging trends and maintain a competitive edge. Additionally, the platform provides tag suggestions based on the video description, helping creators optimize their video metadata and reach a wider audience. With TuberInsights, YouTube content creators can unlock the full potential of their content, make informed decisions, and effectively engage their target audience.

### Detail Description:

We are planning to design a web platform called TuberInsights based on the YouTube Trending Video Dataset (updated daily). The dataset includes the following attributes: video_id, title, publishedAt, channelId, channelTitle, categoryId, trending_date, tags, view_count, likes, dislikes, comment_count, and description. We aim to implement the following functionalities:

- **Correlation of view count and publish time**: Analyzing the relationship between view count and the time of video publication to determine the best time of the day, date, and month for maximizing viewership.

- **Like/dislike ratio for each video**: Providing the like/dislike ratio for each video, assisting users in evaluating the popularity and reception of specific videos.

- **Ranking by category (tag) + like/dislike, region**: Providing ranking functionality for videos based on categories (tags), likes/dislikes, and regions, allowing users to explore popular videos in different categories and understand their like/dislike ratios.

- **Occurrence of tags in each country**: Analyzing the occurrence of tags in different countries to help users understand the popularity of specific tags in various regions.

- **Total view count for each category (tag):** Offering insights into the total view count for each category or tag, enabling users to assess the popularity of different categories.

- **The most popular video of each tag**: Showcasing the most popular video associated with each tag, allowing users to quickly discover trending content within specific tags.

- **Visualizing videos as light data points on a world map in a time window**: Providing a visual representation of videos as light data points on a world map within a specific time window, enabling users to observe global video trends.

- **Predicting the best publish time based on tags provided**: Utilizing the provided tags to predict the optimal time for video publication, helping users optimize their video release strategies for better performance.

- **Predicting top trending tags for the next time slot**: Employing advanced algorithms to predict the top trending tags for the upcoming time slot, allowing users to stay ahead of emerging trends and maintain a competitive edge.

- **Providing tag suggestions based on the video description**: Offering tag suggestions based on the video description, assisting users in optimizing their video metadata and reaching a wider audience.

This platform will provide comprehensive insights into YouTube trending videos, allowing users to make data-driven decisions, optimize their video publishing strategies, and enhance visibility and audience engagement.

### Usefulness:

This project is a content creator-oriented website, trying to help individual YouTubers create trending videos. This application will analyze the most trending YouTube videos based on different regions and provide YouTubers with suggestions such as topic choosing, publishing time, and tag specifications.

- Correlation of View Count and Publish Time: This application helps content creators determine the best time to publish their videos for maximum viewership. By analyzing the relationship between view count and the time of publication, creators can schedule their releases to coincide with periods when their target audience is most active, thereby increasing the chances of their videos being seen.
- Like/Dislike Ratio for Each Video: Providing the like/dislike ratio helps users assess the popularity and reception of specific videos. It allows viewers to make informed choices about which videos to watch, as a high like/dislike ratio generally indicates a well-received video, while a low ratio may suggest otherwise.
- Ranking by Category (Tag) + Like/Dislike, Region: This application offers users the ability to explore popular videos in different categories, regions, and with varying like/dislike ratios. It helps users discover content that aligns with their interests and preferences and provides content creators with insights into the performance of their videos in specific niches.
- Occurrence of Tags in Each Country: Analyzing tag occurrence in different countries helps users understand regional preferences and trends. It can be valuable for content creators and marketers looking to tailor their content and campaigns to specific geographic regions.
- Total View Count for Each Category (Tag): This feature provides users with an overview of the popularity of different categories or tags. It can be useful for both viewers looking to explore trending topics and creators looking to identify niche areas with high viewer engagement.
- The Most Popular Video of Each Tag: This application helps users quickly discover trending content within specific tags. It's beneficial for viewers seeking the best content in their areas of interest and for content creators looking to see what works well within specific niches.
- Visualizing Videos on a World Map in a Time Window: Visualizing video trends on a world map allows users to observe global video trends and spot regional variations in content consumption. This can be valuable for both content creators and marketers looking to identify global and regional opportunities.
- Predicting the Best Publish Time Based on Tags Provided: Predicting the optimal time for video publication based on provided tags helps content creators optimize their release strategies. It ensures that videos are launched when the associated topics or tags are likely to be most popular, increasing the chances of visibility and engagement.
- Predicting Top Trending Tags for the Next Time Slot: Predicting trending tags for upcoming time slots allows users, especially content creators and marketers, to stay ahead of emerging trends. This can help them create content or marketing campaigns that are timely and aligned with current interests.
- Providing Tag Suggestions Based on Video Description: Offering tag suggestions based on video descriptions helps content creators optimize their video metadata. It can lead to improved discoverability on platforms, reaching a wider audience, and ensuring that the video is categorized appropriately for search and recommendation algorithms.

### Realness:

This dataset is a TA-proposed dataset from kaggle. This dataset contains information about most trending daily videos from Youtube of the past few months, with up to 200 listed trending videos per day. This set includes daily trending Youtube videos from up to 11 country and regions (including  IN, US, GB, DE, CA, FR, RU, BR, MX, KR, and JP regions), as stored in separate files. Data includes the video title, channel title, publish time, tags, views, likes and dislikes, description, and comment count.

### low-fidelity UI mockup:

![img](https://lh5.googleusercontent.com/pUMIseoUBCtcPPV6wGci_clJwcprLdNlMegkzU98EN5MI7KGf-a6NqV1KNAjaCZ2MUWYDeMWFBY2IQNsvK5nQJC5EDOMIt6vvbd92ZBUbZZgvq6GH04f0zk5H0HCTrKGvsH4OgVrJvYU4ASCPbHYGzc)

### Functionality: 

Our web application, based on the YouTube Video Trending dataset, presents an interactive data visualization page. At the top of the page resides a sticky navigation bar offering several selection buttons to the user. A notable facility provided by this application includes a trending prediction feature specifically designed for content creators. By selecting tags related to their video content, creators can predict the optimal time to publish their video to enhance the likelihood of gaining viewership. Additionally, creators can utilize the 'predict' button which triggers a pop-up window. This popup window will show future top 'k' trending tags within the next selected time window (the suitable window size will be determined pre-training) based on a model we trained. The application also boasts a 'classification' feature, providing tag suggestions based on a user-inputted video description. 

The main body of our web application hosts several tables displaying multiple statistical views of the dataset. Located on the left upper corner, we feature a world map, visualizing videos as light data points dispersed globally within a specific time interval. A potentially intriguing feature enables users to click a specific region on the map, extracting data exclusively from that chosen country across all tables. Central to the main body, we offer a table ranking the top 10 trending videos either globally or per country (the ranking algorithm is yet to be confirmed). The lower left section of the application highlights the top 10 trending tags. Clicking on a specific tag triggers a pop-up window displaying trending videos linked to that tag. In the lower center section, we display a tag occurrence graphic, which unveils the frequency of tags in the dataset. The font size is contingent upon the total occurrences of a specific tag, supporting quick visual understanding. Finally, a bar chart is positioned at the lower right corner of the page. This visualization tool aids users in comprehending the overall data dispersion, categorized by time. 

### Work distribution: 

|                                                              | aos5             | jiayig4            | wenxiuw2           | zihengc3           |
| ------------------------------------------------------------ | ---------------- | ------------------ | ------------------ | ------------------ |
| Correlation of view count and publish time                   | frontend         | frontend & backend | frontend & backend | backend            |
| Like/dislike ratio for each video                            | frontend&backend | frontend & backend | frontend & backend | backend            |
| Ranking by category (tag) + like/dislike, region             | frontend&backend | frontend & backend | frontend           | backend            |
| Occurrence of tags in each country                           | backend          | frontend & backend | frontend           | backend            |
| Total view count for each category (tag)                     | frontend&backend | frontend & backend | frontend           | backend            |
| The most popular video of each tag                           | frontend&backend | frontend & backend | backend            | backend            |
| Visualizing videos as light data points on a world map in a time window |                  | frontend           | frontend & backend | frontend & backend |
| Predicting the best publish time based on tags provided      |                  | frontend           | frontend & backend | backend            |
| Predicting top trending tags for the next time slot          |                  | frontend           | frontend & backend | backend            |
| Providing tag suggestions based on the video description     | ml               | frontend           | frontend & backend | backend            |
|                                                              |                  |                    |                    |                    |
| gcp setup                                                    |                  |                    |                    | zihengc3           |
| frontend framework setup                                     |                  | jiayigu4           |                    |                    |
| backend framework setup (optional)                           |                  |                    |                    |                    |



 

