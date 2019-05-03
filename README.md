# Music Mash

## Description
Music is an application, where the user can up- or down-vote their favorite artists by listening to sample songs and clicking on the one they like better.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about. Before I can access it I will be redirected to the login page.
- **sign up** - As a user I want to sign up on the webpage so that I can judge music for fun and discover some new stuff.
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will be able to judge on my behalf.


## Routes:

| Method | Route | Description|
|------|-------|------------|
| GET  | /     | Main page route. If logged in takes to choose to vote for different genres. If not redirects to login.
| GET  | /login | Login route. Renders login formulary view
| POST | /login | Login route. Sends login formulary info to the server
| GET | /signup | Signup route. Renders signup formulary view
| POST | /signup | Signup route. Sends signup info to server and creates user in DB
| GET | /profile/:userId | Profile route. Renders profile view, User can choose to edit or delete profile.
| GET | /vote/:genre | Vote route. User can vote for the song they like better
| POST | /vote/:genre | Vote route. Connects vote choice to rank data.
| GET | /ranks/:genre | Ranks route. User can see the current top 10 songs from the genre they chose.

## Models

User model

```javascript
{
  username: String
  password: String
  timeStamp: Date
}

```

Song model

```javascript
{
  name: String,
  artist: String,
  song_url: String,
  img: String
}
```

* Genre model
```javascript
{
   name: String,
   songs: [songsSchema]
}
```


## Backlog
- comment-section for more user interaction
- more profile editing options

## Links
tbd
### Git

tbd

### Slides

tbd
