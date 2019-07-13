# ReactJS Coding Challenge - Zopa

Congratulations! You're here because you've made it through to the next step of your Zopa interview.

We'd like to ask you to complete this coding challenge, so you can showcase your creative problem-solving and technical ability.

We hope you'll enjoy it. It should take around **4 hours**, give or take. We're happy to look at partial solutions too.

We're on the lookout for best practices and evidence that you understand the technology. The one thing we insist on is that you use React to complete this challenge – but you're free to use any other libraries or tools on top.

## The background

Your challenge is to create a web application that helps you send money to friends.

On the left side of the screen below, you have a form to enter your friend's details. On the right side, you have your account details.

You will fill in the form with your friend's details, name, email and amount you'd like to send. Each field of the form has inline validation displaying error messages when one of the field is not valid. Clicking the "Send" button will create a transaction if the fields are valid and there is enough money available in the account.

The account shows how much money you've sent so far and how much is available. You can set the initial amount to whichever value you'd like. The difference is represented on a circular graphic which updates every time you send money to someone. Under it, you can see the details of your past transactions.

![](./design/screen.png)

## Your task

-   Build the screen so it looks exactly like the design above.
-   Implement the logic as described above.
-   Provide unit tests.

Bonus points (optional, only if you have time to spare):

-   The application is designed for desktop. Use your creativity to make the design responsive, so it looks great on mobile devices as well.
-   To make this challenge more realistic, you can submit the form in asynchronous to an API server and add the transaction when you get a valid response. You can use something like [json-server](https://github.com/typicode/json-server) to create a quick javascript server.

## How to submit your web application

Create a markdown file `INSTRUCTIONS.md` with documentation about how we can run your web application. When you're happy with the result, zip it up and send it to your recruiter. Please don't publish it to a publicly accessible repository.

## Suggested libraries and tools

-   [create-react-app](https://github.com/facebook/create-react-app): Easy to install and to get started.
-   [redux](https://github.com/reactjs/redux): Keep the entire state of your app in a single place.
-   [styled-components](https://github.com/styled-components/styled-components): Use tagged template literals to style your components.
-   [typescript](https://github.com/Microsoft/TypeScript)/[flow](https://github.com/facebook/flow): Strong types make your code more reliable when you work in larger teams.
-   [jest](https://github.com/facebook/jest): Easy unit testing framework for javascript.

## Assets provided

You'll find designs and fonts in the 'design' folder.
