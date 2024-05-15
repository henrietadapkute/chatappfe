# C.I.C.E

## Description
A MERN stack messaging application using Websockets to provide seamless communication between users, built by a team of two. As a two-person team we developed a feature-rich messaging application, emphasising seamless communication and user-centric functionality.

## Deployment link
Project: [C.I.C.E](https://cicefe.netlify.app/)
Backend: [Link here](https://github.com/henrietadapkute/recipebe)

To view the features of the app, please create an account.

## Timeframe
7 days 

## Goal
A solo project to design a full-stack React app using Express,Node.js and MongoDB.

## Technologies Used
- React.js
- Node.js
- Express.js
- MongoDB
- ShadCN
- Tailwind CSS
- Sockets.io
- react-router-dom
- Craco
- Bcrypt
- Mongoose
- Git
- jsonwebtoken
- zod

## Planning
### Wireframes and ERD
Using Excalidraw, we drew out wireframes to visualise the application's layout and design, keeping in mind that we would use ShadCN and Tailwind CSS later on. In parallel, an Entity-Relationship Diagram (ERD) was planned to map out the relationships between different data entities, ensuring a well-structured database. 

![image](https://github.com/henrietadapkute/chatappfe/assets/112635209/0e6f6897-cf50-435d-81c6-cd200f977da4)
![68747470733a2f2f696d6775722e636f6d2f634f46455858662e706e67](https://github.com/henrietadapkute/chatappfe/assets/112635209/21e313a6-19c6-47fd-b912-6ad3fe2dd0cb)

### User Stories and Trello
As a team, we created User Stories to outline the functionality from the user's perspective. Trello became our organisational hub, with boards structured to save information about possible API integrations for emojis, and Websockets, utilising the Icebox method for prioritisation. Sections for research into Trello helped in planning and resource allocation.

![image](https://github.com/henrietadapkute/chatappfe/assets/112635209/eaa2f21e-9148-430c-8433-a76e9790c3a7)

## Process
### Day 1 & 2
Our development process for C.I.C.E started with planning wireframes and an ERD.  Together we worked on user stories, organised using Trello by priority. We used Tailwind CSS and Shadcn for the UI, and we also kept this in mind when creating the wireframes before starting the coding process . Daily stand-up meetings ensured communication and goal alignment. During our first weekend, my team-mate implemented basic front page design, as a team we implemented user authorisation using JWT tokens.

![68747470733a2f2f696d6775722e636f6d2f46756b58544a612e706e67](https://github.com/henrietadapkute/chatappfe/assets/112635209/4b714311-3ba0-45a4-8063-234b4de37d36)

### Day 3
**Backend**
Implemented fundamental models, routes, and controllers, establishing a connection between the application and the MongoDB database. 

**Frontend**
Started on the basic UI for the Login/Sign-up pages. Implemented the message list view and chat view, incorporating message card UI elements within the message list view on the homepage.

### Day 4
**Frontend**
Linked the plus button on the homepage to create a new chat/conversation. Set up the Message View Page UI, laying down the basic framework. Created the ChatListView page to pull data from the backend, utilising it to generate Chatview components.

MessageListView primary function is to display messages exchanged within a specific chat conversation. Using React hooks like useState and useEffect, it manages state variables for message input, dialogue visibility, error handling, and alert prompts. The component dynamically renders MessageView components for each message, including features such as message highlighting and tracking last-read messages. 

### Day 5
**Frontend & Backend**
Successfully implemented the creation and display of messages in the message list view. The MessageListView component interacts with the chat context to access messages, add new messages, fetch messages for a specific chat, and handles message deletion. I included UI elements like buttons, inputs, and emoji selectors for sending messages and managing chat-related actions. Enabled users to view and edit their profiles. Worked on group chat logic and integrated it into the application.

Implemented a few tweaks to the backend to ensure the group chat integration in the frontend works as expected.

### Day 6
**Backend & Frontend**
Established Websockets for live notifications and real-time messaging, using event handlers between the backend and frontend. Created UI elements to highlight the currently selected chat. Implemented the functionality to view other users' profiles by clicking on their profile picture at the top of the chat by using a modal. Converted the message input into a form for easier message entry and sending. Integrated an emoji API, and created a simple UI that filters through emoji categories, allowing users to search emojis and view multiple at a time. This feature is to be used on the desktop.

### Day 7
**Frontend**
Polished the UI, focusing on enhancing mobile responsiveness, as well as light mode and dark mode. Incorporated adjustments to ensure a seamless user experience across various devices. The final day was dedicated to optimising performance, and addressing any remaining issues/bugs. 

## Challenges
**Websockets**: Implementing Websockets for real-time communication presented a learning curve. Understanding the intricacies of Websockets, such as establishing connections and handling events, required dedicated time and effort. Overcoming this challenge contributed to an impressive application.

**Styling**: Tailwind CSS, was challenging to work with due to its utility-first approach. Ensuring consistency in styling and understanding the utility classes was something that required more time, reading and researching documentation. The challenge was overcome through practice and a commitment to achieving a polished UI and neat mobile responsiveness. 

**Git/Github**: Working together on Git and GitHub, using development branches, pushing and pulling code, and staying in the loop presented some challenges. Handling merging issues as a team, taught us a lot. Solving problems and comparing code made GitHub collaboration more straightforward and enjoyable for our team.

## Wins
**Websockets**: Implementing Socket.io for real-time communication was a significant achievement. This feature enhanced the application's responsiveness and interactivity. Users can enjoy instant messaging, and creating group chats. 

**CRUD operations**: Implementation of CRUD operations allows users to manage conversations, edit profiles, and perform various actions seamlessly.

**Styling**: Using Tailwind CSS and Shadcn has resulted in a visually appealing and modern user interface. I am particularly proud of this UI, as it is also mobile-friendly. 

## Key Learnings
- Installation and implementation of WebSockets for real-time communication.
- Mastery of Tailwind CSS for efficient UI development.
- Solidifying confidence working with MongoDB and Postman.

## Future Improvements
- Implement CRUD for editing group titles and other group functionalities.
- Allow users to upload pictures using AWS.
