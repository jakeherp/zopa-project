# Solution for ReactJS Coding Challenge - Zopa

This project was created with _Create React App_ and _json-server_ to simulate an API to provide Transactions and Balance information.

## What I have done

I have done my best to complete the code challenge in as much detail as possible considering the time limit.

-   [x] Set up React app using _create-react-app_
-   [x] Implement _ZOPA Component Library_
-   [x] Implement _styled-components_ for custom styles
-   [x] Develop app logic using _React Hooks_
-   [x] Manual testing of functionality
-   [ ] Create Unit Tests using _Jest_
-   [x] Adapt design to mobile resolution for fully responsive user experience
-   [ ] Implement _Redux_ for state management

## What I haven't done

<ul>
    <li>**Redux**: I did not see the need to use Redux here and therefore relied on React's native state management due to time constraints</li>
    <li>**Unit Tests**: I have to admit, that this is my weakest skill, since I have never worked in a TDD environment. However, I am very keen on adapting a best-practice approach to TDD with Jest and Enzyme and am confident that I would pick up the required skills quickly, when I get the chance to use them in my day-to-day work.</li>
</ul>

## How to run

1. run `yarn install` to install all dependencies.
2. run (`npx&nbsp;`)`json-server --port 9672 --watch db.json` to start the API server on port `9672` (_ZOPA_).
3. run `yarn start` to start the app on `localhost:3000`.
