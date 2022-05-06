https://noroff-feu.netlify.app/content/semester-project-2/pzpzna

# Semester Project 2
<!-- This is a school assignment for the javascript 2 lectures. -->
This is a semester project for my second year. 
The assignment is to create a e-commerce website that has a customer section and a admin section. It has to be responsive and it will be populated by Strapi API that I am hosting on Heroku. 

## Table of Content
- [General Info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Status](#status)

## General Info
<!-- When starting the prosject it takes sometime before the heruku API replays -->
#### Level 1
Build a customer frontend with home, product list, product detail and cart pages. 
- Home page must include home banner and a list of featured products that is marked as ‘featured’ in strapi. 
- Product page has to include a list of all products and a search box. 
- Product detailed page must include title, description, image, price and an add to cart button. 
- Cart/Basket page must display a list of products that is added in the cart and stored in the local storage. It must display title, price, a link to the product view page, image end the total price of all the product in the cart. 
- Have an empty cart button and a message that indicating this. 
This page is not a checkout page. No payment or user details are required to be taken.

Build an admin frontend with the possession to create, update and delete products. 
- Login page that stores username and token in the local storage. Make a logout that empty’s the local storage space where the username and token is stored. 
-	Add/edit product create forms that allows the user to add or edit the product. And it must be allowed to toggle whether the product is featured or not. 
-	Change product image has two possibilities to solve this. 
One is the upload a file to strapi. The second one is to use a text input that allows a URL to be entered. This allows an image from a external URL to be used as product image
-	Delete existing product.
It must be responsive on all devices. 
Building a checkout and payment system is not a part of the project. 


#### Level 2
This is a optional level. It is to create my own API for the site. I used strapi and it is publicly hosted on Heroku. 

## Technologies
- Backend Strapi [api](https://semester-project-02.herokuapp.com/)
- Heroku for backend hosting
- Plain JavaScript
- Sass
- HTML

## Setup

Login for the admin page:
```
username: admin@admin.com
password: Pass1234
```

## Status
<!-- - [x] adding a CKEditor to the text body of a post when edition or add a post. -->