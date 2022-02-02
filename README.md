# FantasyFootballPickEm

## Purpose
A little while ago my fantansy football league was struggling to come up with a good way to decide the draft order for each year. Some years we drew names out of a hat. Other years we picked horses in the Kentucky Derby horse race. We wanted a way to determine draft order that was still somehow rooted in football and also had an element of skill instead of 100% luck. 

We came up with the idea of a pick'em league. Each week, the members of the league would pick the winner of each game and send them in to the commisioner. At the end of the week a points was awarded if the winner was picked correctly. Primetime games would be worth two points. At the end of the year the leader in points would get 1st choice in deciding their place in the next years draft order. 2nd place in points would then decide their draft position and so on. 

I created this Discord bot to keep track of the weekly games, the league members picks, caclulate scores, and store the leaderboard.

## Technologies Used
This bot was written in Javascript using the Discord.js library to do the heavy lifting. MongoDB is used as the backed to store the users and weekly games data. The bot is hosted on Heroku so will always be available during the season as well as the offseason.

## Commands and Screenshots
!Schedule \<week>  
This command will show the Nfl schedule from the provided week.  
Note that each games shows the Away team vs the Home team. Each team is also numbered. This is used in our next available command to pick the winners from each week   
<img width="326" alt="Screen Shot 2022-01-29 at 5 53 43 PM" src="https://user-images.githubusercontent.com/78622890/151680253-aa35bad1-9f2f-4b2e-9a0f-81b364e06d45.png">  
  
!makePicks \<week> <games>    
This command will allow the user to select who will be the winner of each game that week. The week is entered as the second parameter of the command and a string delimeted by commas or periods is used to store the chosen teams    
  <img src="https://user-images.githubusercontent.com/78622890/151680386-b0dc4133-d702-4619-8ebe-4e83f73f7564.png" height="40%" width="40%">
  
!seePicks \<week>    
At any time users can enter this command to see who they selected for the provided week    
  <img src="https://user-images.githubusercontent.com/78622890/151680458-f71ff0ad-a874-4bc2-ad1a-a661959711a1.png" height="40%" width="40%">
  
!setWinners \<week> <winning_teams>    
This is a priviledged command given by a custom role. Other league members are not allowed to set each weeks winners  
The week being set is given as the first parameter and then a comma or period delimeted string. This will set the weeks winners in the MongoDB backend    
  <img src="https://user-images.githubusercontent.com/78622890/151680732-e6cbeaf8-3222-488b-bdb4-ff178d758e05.png" height="40%" width="40%">
  
!setPoints \<week> <special_games> <modifier>    
This command will calculate points for each league member. The week specifies which week points will be calculated for. Special games will speicify which games are primetime games and will be worth the modifier parameter. The example below calculates points for week 1 and sets the primetime games 1,15,16 to be worth 2 points  
  <img src="https://user-images.githubusercontent.com/78622890/151680892-bf8aec62-9bb2-4089-b69d-a9f479c94ed6.png" height="40%" width="40%">
  
!seePoints \<week>  
This command will allow a user to see the points given to the league for the provided week
  <img src="https://user-images.githubusercontent.com/78622890/151680920-7842e1a3-f29b-4057-a289-2fe68a2a9ff6.png" height="40%" width="40%">
  
  !leaderboard  
  This command will show the overall scores and rankings of each member in the leage  
  <img src="https://user-images.githubusercontent.com/78622890/151680929-082dba01-ef5a-4111-8fc1-a78d2c4408cf.png" width="50%" height="50%">
  
