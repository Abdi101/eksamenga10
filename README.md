# idg2100-2022-oblig3

This document contains the description and starter code for `oblig3: IDG2100 Spring 2022`.

# Goal

Prove and demonstrate:

* your understanding about `React` library and how to use it to create `SPAs` using [React Router v6](https://reactrouter.com);
* you can build react components and understand the `component lifecycle`;
* you understand the difference between `stateless`, `stateful` and `controlled` components;
* that you are able to enhance an existing component with new functions;
* your ability to connect the front-end to the back-end;
* your understanding of backend authentication/authorization processes by protecting routes using JWT 

# Context

If the assignment is graded as "not approved" you will have an additional opportunity based on the following conditions:

1. The first version of the project must have been delivered within the set deadline;
1. The second version of the project will have to include an additional task (as described later).

# The coffee Beans dashboard

This is a continuation of the second oblig (The coffee Beans API) and the [NTNU coffee tracker](https://github.com/carlosvicient/ntnu-coffee-tracker) and, therefore, you can reuse your previous code when needed (remember to cite the origin of the code).

## Scenario

Lefteris is impressed by the coffee Beans API you implemented and now he is interested in the project. He is very annoyed about the coffee machine being on the third floor while his office is in the second. Therefore, he foresees a new use case for the coffee application: The coffee beans dashboard. So, the main goal of this new tool is to notify users when fresh coffee is ready. However, you do not need to create notifications. The idea is that the user can check the app for information about the coffee status.

He thinks it is important that only his colleagues in the office have the ability to inform the system when new coffee is brewed. Therefore, he realised that only authorised users should to brew a new coffee (or to vote for a specific coffee preparation in other iterations of this project). However, showing the information about the last coffee that has been brewed is not sensitive information (coffee status). 

## Requirements

Your job is to analise the needs of the project based on the new scenario and use the following information to create "The coffee beans dashboard".

The web application needs the following pages/components:

* homepage: this page is public for any user and it shows the information of the last coffee that has been brewed, as you can see in the picture below (See `<CoffeeDisplay>` - _Lecture 11: Lifting the state up - Activity#2_).

![Homepage](./description-documents/homepage.png)

* Brew updater: this page is only available for authenticated users. It is used to inform the system (and the users) a new coffee has been brewed. It will render the `<CoffeeControl/>` component (see picture below).

![Brew updater page](./description-documents/brew-updater.png)

* Sign in, log in and log out functionalities: users must be able to register to the platform, log in to the platform and log out. 

* The back end needs to be __extended__ to the new application needs. Also specific routes have to be protected.

## Task

* Create the views and functionalities described above.

  * Remember to use the <CoffeeDisplay> and <CoffeeRecipe> components you implemented in the last module 3 lab's activity: [lecture 11, activity 2](./description-documents/lecture11-activity2.pdf) (or do it from scratch if you did not work on it during the lab activity)

* Style the component and new views to match the current theme.

* Extend and/or modify the API to match the new functionalities.

## Optional task

For this "oblig" you don't have to deliver an additional task if your project is graded as not approved. In that case, you must use the feedback received with the grade to fix and improve your project. You must also include a readme.txt file explaining the main changes you have done (chagelog).

# Delivery

This assignment must be delivered in two different places: GitHub classroom and Blackboard.

* To deliver the assignment in GitHub Classroom, you only need to push your changes and commits to your Git repository. Make sure the final version of your code is merged into the `main` branch. 

* Before delivering the assignment in Blackbard, make sure your project has all the files it needs. Delete any file or info not needed (this is `.git/` folder, `node_modules/`, etc.). Zip the project and upload the file to Blackboard.