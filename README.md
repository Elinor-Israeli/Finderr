# findder - pixel perfect, E2E clone of fiverr (React + Node.js).

An open source marketplace platform inspired by [Fiverr.com](https://www.fiverr.com/?utm_source=google&utm_medium=cpc-brand&utm_campaign=G_US_Brand_BrandingDeskTop_Exact&utm_term=one-fiverr_(exact)&utm_content=AdID^549600552450^Keyword^fiverr^Placement^^Device^c&caid=731898203&agid=43879774452&ad_id=549600552450&kw=fiverr&lpcat=br_general&show_join=true&gad_source=1&gclid=CjwKCAiAzvC9BhADEiwAEhtlN4X4ZBjOm9Et3XFOPa7j3PocVw3WNAyUOtJ7vtr1IjLigaUUn5P18RoCEUkQAvD_BwE).
You can access the deployed version of my project [**here**](https://finderr-demo.onrender.com "finderr link").
You can scroll down and see for yourselves!

![Homepage image](./screenshots/HomePage.png "HomePage") 

___

### Table of Contents
- [finderr Description](##finderr-description)
- [Application Features](##Gig-Features)
- [Technologies](#Technologies-Used)
- [Getting started](#Getting-started)
- [Showcase](#showcase)

  
## findder Description
The Gig Management platform provides a seamless space for sellers to easily create, manage, and showcase their gigs, while buyers can browse through a variety of services, purchase with ease, and track their favorite gigs. 
Sellers can update their offerings, set prices, and monitor performance, while buyers can save their preferred gigs to a wishlist :heartpulse: and manage their purchased gigs for future use. 
This platform streamlines the process for both buyers and sellers, ensuring a smooth and efficient experience.

## Gig Features
Custom Gig Creation & Management: 
- Create and manage your gig listings with ease. You can update titles, descriptions, pricing, and add relevant details to ensure your services stand out.
- Easy Authentication: Sign in using and login, ensuring your account is secure and easy to access.

## Technologies Used
This open-source marketplace platform is built using the MERN stack **(MongoDB, Express, React, Node.js)**, offering a smooth, real-time experience. 
It leverages the latest web technologies, including ** REST APIs** for backend communication and **WebSockets** for real-time updates, ensuring seamless interaction between users.
The platform features robust authentication methods for secure logins, and images are efficiently stored and retrieved using **Cloudinary** for optimal performance.
The user interface is crafted with pixel-perfect precision using **Sass**, providing a visually appealing and intuitive experience.

## Getting started
Head to the repository on top and clone the project or download the files.

```
git clone https://github.com/Elinor-coder999/Finderr
```

Enter the backend folder and make sure you have node_modules installed. 
After that we will initiate the server with 'npm start':

```
cd backend
npm i 
npm start
```

You should get a console output that the server is up and running at port 3030.
Enter the frontend folder and repeat the same process.

```
cd frontend
npm i 
npm start
```
## Showcase

### Homepage
The landing page in which the user can sign up / login, or start browsing the app for different gigs.
![Homepage image](./screenshots/HomePage.png "HomePage") 

### The Explore page 
The Explore page offers users an organized view of all available gigs within the same category. 
Users can easily browse through a wide range of options and filter them based on delivery time and budget to find the best fit for their needs.

Key features:
- Gig Filters: Sort gigs by delivery time and budget to streamline the selection process and find exactly what you're looking for.
- Wishlist Functionality: Logged-in users can save their favorite gigs by clicking the heart button, adding them to their personalized wishlist for easy access later.
- User-Friendly Layout: The page is designed for effortless navigation, making it easy for users to explore and compare gigs at their convenience.
Whether you’re searching for a quick turnaround or a budget-friendly option, the Explore page ensures you can find and save the perfect gig with just a few clicks.

![Explorepage image](./screenshots/Explorepage.png "Explorepage")


### The Gig Detail Page
This is where users can view all the information about the specific gig they’ve selected. The page includes a detailed description of the service, pricing, delivery time, reviews, and any additional features or options offered by the seller.

Key features:

- Detailed Gig Information: A comprehensive overview of the gig, including a description, deliverables, and pricing.
- Seller Information: View the seller's profile, ratings, and previous work to help you make an informed decision.
- Reviews & Ratings: Check customer feedback to gauge the quality of the gig and seller performance.
The Gig Detail Page is designed to give you all the necessary information to confidently purchase or save your selected gig.

![GigDetailpage image](./screenshots/GigDetails.png "GigDetailpage ")

### The Payment   
The Payment Page is where users can securely complete their purchases after selecting a gig. 
This page provides a simple and transparent process for making payments, ensuring a smooth transaction experience.

Key features:

- Clear Pricing Breakdown: See the total cost of your gig, including any applicable taxes or additional fees, for full transparency.
- Secure Payment Options: Choose from a variety of payment methods, including credit/debit cards, PayPal, or other trusted payment gateways, ensuring your transaction is safe and secure.
- Order Summary: Review the details of the gig, delivery time, and seller information before finalizing your purchase.
- Easy Checkout: A fast and user-friendly checkout process designed to minimize any friction and complete your order quickly.
The Payment Page is built for ease of use and security, ensuring your gig purchase is completed efficiently and safely.

![Paymentpage image](./screenshots/Paymentpage.png "Paymentpage")

### The Order Dropdown
The Order Dropdown offers buyers a quick and convenient way to track the status of their orders. 
It’s designed for seamless access, allowing users to stay updated on their purchase without leaving the page.

Key features:
- Order Status: View real-time updates on the status of your order, including Pending, Approved, or Completed.
- Quick Access: Instantly check the progress of your order with a single click, without needing to navigate to another page.
- Organized Tracking: Stay informed on all your orders in one place, ensuring a smooth and transparent tracking experience.
The Order Dropdown helps buyers keep everything organized and stay on top of their orders with ease.

![OrderDropdown image](./screenshots/OrdersDropdown.png "OrderDropdown")

### Wishlist
The Wishlist allows users to save their favorite gigs for easy access later. 
Simply click the heart icon on any gig to add it to your wishlist, ensuring you can quickly find and revisit gigs that meet your needs when you're ready to make a purchase. 
This feature helps buyers keep track of preferred options and stay organized.

![Wishlist image](./screenshots/Wishlist.png "Wishlist")


### The Seller Dashboard
The Seller Dashboard provides sellers with a powerful and intuitive interface to manage their gigs and track performance.
Key features include:
- Revenue Tracking: View monthly and yearly revenue reports to easily monitor your earnings and track business growth.
- Order Management: Approve or deny incoming gigs with a single click, giving you control over which projects to take on.
- Completion Notifications: Inform customers when their orders are complete and ready for delivery, ensuring clear communication and timely service.
The Seller Dashboard is designed to streamline your workflow, making it easier than ever to manage gigs, track revenue, and stay on top of your orders.

![SellerDashboard image](./screenshots/Seller%20dashhboard.png "SellerDashboard")

### Sign-up
The Sign-up process is simple and secure, allowing new users to create an account quickly. 
With options for Google login or traditional authentication, users can sign up effortlessly while keeping their information safe. 
Once signed up, users can start browsing gigs, saving favorites, and making purchases seamlessly.

![Sign-up image](./screenshots/sign-up.png "Sign-up")

### The Profile
Anyone can become a seller by creating a profile and adding gigs based on the category that best fits their skills and services. 
Sellers can:
- Add Gigs: Easily create new gigs, specifying the category, description, pricing, and more to showcase their services.
- Update Existing Gigs: Modify gig details such as pricing, descriptions, and images to keep their offerings fresh and competitive.
- Add Pictures: Upload images to enhance the visual appeal of gigs, providing potential buyers with a clear idea of the service quality and value.
With this flexible and easy-to-use profile, sellers can quickly get started and manage their gigs with full control over their offerings.

![Profile image](./screenshots/Profilepage.png "Profile")

### Deploy on Render
Render is a platform that simplifies deploying and managing applications in the cloud. 
It's a fully managed service designed to handle web apps, APIs, static sites, databases, and background jobs, providing an easy-to-use interface for developers.

Below is a guide on how you can deploy the open source platform into render

Step 1: set up mongo database

Step 2: web service
Web service is the backend that serves the apis by accessing mongo db 
How to set up web service (mention the environment variables and the configuration you use)

Step 3: Static 
Static site is where we deploy our SPA bundle.  It leverage global CDN which ensures fast loading times for user
How to set up static site (mention the environment variables and the configuration you use)


### Authors
 - [Elinor Israeli](https://github.com/Elinor-coder999)
 - Refael Levi
