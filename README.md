# Dani’s Animals 3

## Objective 
Create a simple RESTful application using Node, Express, and MongoDB. I threw a fun twist into this one by making it a little database for my wife’s beloved stuffed animal collection!

## Steps Taken
In this project I was only working with a single page application, so I first updated the layout.jade file to include the jQuery and Bootstrap I wanted to use for the layout. Then I updated the index.jade file with the main sections of the application. To build out the RESTful architecture, I then had to update the users.js routes file for the GET, POST and DELETE functions. Finally I wrote a global.js file to load the table, take user input, and use AJAX to add and remove data from the table.
  
Like any project, troubleshooting was the biggest challenge with this application. As I continue to work on separation of concerns, it is becoming more important than ever to form a clear schema of how the application is laid out. When a problem arises, this then enables me to trace it back through the application efficiently and find the source. 

## Outcome
The final application looks clean and simple, but it can functionally pull data from my MongoDB database and fill the table. It can also add new entries and delete current entries without requiring a page refresh. One layout challenge I was especially proud of overcoming is the scrolling animals table. Once the entries reach a certain number, it will allow you to scroll down, instead of just pushing the content off the page. There is currently no UPDATE function in this application, so adding that feature may be a future project.
