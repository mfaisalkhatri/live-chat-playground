[![Node.js CI](https://github.com/mfaisalkhatri/live-chat-playground/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/mfaisalkhatri/live-chat-playground/actions/workflows/node.js.yml)

# Live Chat Playground

A simple live chatting application built for testers to practice and learn web automation testing.

![Demo](/assets/live_chat_app.gif)

## Don't forget to give a :star: to make the project popular

## Tech Stack 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Installation using NPM
1. Clone the repo
1. Navigate into the root folder
1. Run `npm install`
1. Run `npm run dev`
1. Open any browser and navigate to `http://localhost:3000` to start using the live chat playground

### Installation Using Dockerfile
1. Clone the repo
1. Navigate into the root folder
1. Run the command `docker build -t live-chat-playground .` to build the app using DockerFile
1. Start the application by running the command `docker run -it -p 3000:3000 -p 3001:3001 live-chat-playground`
1. Open any browser and navigate to `http://localhost:3000` to start using the live chat playground

### Using Docker Compose

1. Clone the repo
1. Navigate to the root folder of the project
1. Run `docker compose -f docker-compose-chat-playground.yml up -d` - This command will start the application in detached mode
1. Open any browser and navigate to `http://localhost:3000` to start using the live chat playground 
1. Run `docker compose -f docker-compose-chat-playground.yml down` to stop the application


## How to use the application

1. Open any browser and navigate to `http://localhost:3000` to start using live chat app playground
    - Enter the following mandatory details on the screen to start chatting: 
        - Name
        - Location
        - Age
        - Select Chat Room
        - Select Gender
        - Tick the Agree to Terms and condition
        - Click on the Start Chatting button to start the chat

1. Open a new browser on the same machine or Another Tab of same browser and navigate to `http://localhost:3000`
    - Enter the mandatory details on the screen to start chatting


1. To join within same network: Open a browser and enter the IP address of the network with `port`- `3000`
    - Enter the following mandatory details on the screen to start chatting

1. Once the login is successful, on the next screen you should be able to see the live users list with their Name, Age and Gender

1. The "Enter Message" textbox could be used to type a message and "Send" button can be used to send the message.

1. The "Live Chat" window will show the following details to the user:
    - User information of joining, leaving the chat
    - Sent and Received Messages
    - Logout button to exit the Live Chat

## :question: Need Assistance?

- Discuss your queries by writing to me @ `mohammadfaisalkhatri@gmail.com`
  OR ping me on any of the social media sites using the below link:
    - [Linktree](https://linktr.ee/faisalkhatri)