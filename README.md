This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Intersection observer
One of the biggest challenges was the number of requests that needed to be made for each component. e.g.
- The like button first makes a request ot check if the user liked a post
- When the like buttton is clicked, the component needs to be updated.
- The app data is loaded using pagination for faster load times so not all the data is available on load

To fix this, I included an ***intersection observer***. The observer has a target ref to check whether the like 
button is visible on the screen. I also used state variable to record whether that like button has been viewed 
at least once. When viewed, the number of likes for that button is saved. If the user likes/unlikes the post/comment 
the number of likes are toggled consecutively. <br>

The saved state combined with only fetching data in view reduced the number of api calls drammartically and improved 
overall performance. But there was still an issue.

### Infinite Scroll
Paginating api requests reduces the load times for pages making the time to show data relatively quick but it comes 
with additional issues. One way of implementing pagination is
- Initialize a list in state to save all the posts data
- Include a loading div (can be animated or not) at the bottom of the page
- Use an intersection observer to make an api request whenever the loading div is visible.
    - I extended this to use the root margin so that data loads once you're 500px from the bottom of the page

Technically, you can stop here and have an infinite scroll component. 

> [!Important]
> Your api setup and prisma queries on your backend server would need to extract data using pagination too to support this.

But, when you click on a post (e.g. post 10) to show the post details and navigate back to your home page, you 
now start with only the first 10 posts and have to use api calls to load all the data which creates a crappy user 
experience. <br>

To address this, I had to cache my posts with a zustand store. Caching comes with the benefit that we can store the scroll 
position on the feed page in cache. When you navigate back to the home page from the post details, you can navigate back 
to your previous scroll location which will save the number of api calls and scrolling. Caching creates an additional issue 
though. Because loaded posts in the cache omit api calls, things like post likes or number of comments on a post don't get 
updated especially if the action was performed on a post details page. To address this, I created a cache function to update 
post details using the id of the post. That way, when a post is liked for instance, the total number of posts is also 
updated in cache. Same goes for comments/views where the total number of comments are incremented accurately once successfully 
published to the backend. The post views are gotten from the backend api which records unique views using prisma update 
if a existing relationship between the logged in user and post is not found <br>

Everything is done locally, so state changes like another user posting a comment might not update accurately and a websocket 
broadcasting messages might be better but those will only show if 2 users are comparing their metrics side by side.

> [!Important]
> I didn't persist the cache in localStorage for personal reasons and a refresh clears it. If the page is not reloaded 
and you logout and login back, the scroll position from the cache is used and new api calls cannot be made. To address 
this, I clear out all cache dependencies on logout.

I only implemented the cached infinite scroll for the home feeds page. Other pages also use pagination but return the user 
to the top once you navigate away from the page and back.

- Example Vite [Video](https://www.youtube.com/watch?v=nR85ayDEVBc) 

### Context and State Management
I use the ContextProvider to manage accesstokens inside react state, which is slightly harder to access than localStorage for 
security reasons. I've used this pattern in most of my final Odin projects with JWTs. Context Providers are good for caching 
data that's needed everywhere in the app but they can cause unneccessary re-renders when tracking other data in state. e.g.

<div style="width:600px; margin: 0 auto">
    <img style="object-fit:contain; max-width:100%;" src="./public/Context Example.png" alt="desktop view of application" >
</div>

In the image above, when I follow a user like _Ansel Rolfson_ who I'm following for the first time. Without context, the api 
call will only update one card for the button that I clicked and the second card showing _Ansel Rolfson_ is still displayed 
as if I haven't followed her. Using context allows both cards to be updated but it also re-renders all the other cards on the 
page which is also inefficient. To fix this, I used zustand store again to implement the api calls. The zustand store is tied 
to the target userId and also implements the api calls. This way, when a follow request is updated, only the visible cards 
connected to the target user id are updated, improving the performance.


### Show More Feature
Nice to have features were the search bar and the `Show More` text. The Show More feature was implemented primarily with CSS 
using the checkbox example from [web-dev simplified](https://www.youtube.com/watch?v=OhCzEjXvY9A). I extended with react to 
only show for posts thumbnails that were longer than 3 lines to prevent UI clutter. <br>

For search, I implemented it using a debouncing method that waits for 1 second after the user stops typing to make an api 
request. This potentially reduces the number of requests made to the backend api instead of triggering it after every character 
change in the input box. The search route checks the users and posts db for results. In the users db, it checks either the fullname 
or the username and takes the first 5 entries. In the posts table, it searches the post body, sorts them by most recently published, 
number of likes, and number of views, then it also takes 5. I then shuffle both lists to create a seemingly random result for the 
search query. The results are viewed using a custom search card that is hyperlinked to the post details or the user details.