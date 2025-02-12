import Navigator from "./modules/Navigator.js";
import React, { useState, useEffect } from 'react';

import LogOut from "./modules/Logout.js";

export default function AccountPage() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    window.scrollTo(0, 0);


    fetchTopThreads();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("dark-mode") === "enabled";
      });
    
      useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("dark-mode", darkMode ? "enabled" : "disabled");
      }, [darkMode]);
    
      const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
      };

      const [activeSection, setActiveSection] = useState('activity'); 

      const handleSectionClick = (section) => {
        setActiveSection(section);
    
      };

      function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min + ':' + sec ;
        return time;
      }

      function getTopThreads(){
        let data = JSON.parse(sessionStorage.getItem("topThreads"));

        if(data.length > 0){
          let threads = [];

          for(let i = 0; i < data.length; i++){
            threads.push(data[i][0]);
          }

          return(
            <div>
              <h2>{threads[0]}</h2>
              <h2>{threads[1]}</h2>
              <h2>{threads[2]}</h2>
            </div>
          );
        }else {
          return "No Threads";
        }
      }

      function getTopReplies(){
        let data = JSON.parse(sessionStorage.getItem("topReplies"));

        if(data.length > 0){
          let replies = [];

          for(let i = 0; i < data.length; i++){
            replies.push(data[i][0]);
          }

          return(
            <div>
              <h2>{replies[0]}</h2>
              <h2>{replies[1]}</h2>
              <h2>{replies[2]}</h2>
            </div>
          );
        }else {
          return "No Replies";
        }
      }

      function fetchTopThreads(){
        console.log(sessionStorage.getItem("server_address")+"/topThreads");
        fetch(sessionStorage.getItem("server_address")+"/topThreads", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id: data.uuid})
        })
        .then((response) => response.json())
        .then((json) => toReplies(json))
        .catch((error) => {
          console.log(error);
        })
      }

      function toReplies(json) {
        sessionStorage.setItem("topThreads", JSON.stringify(json));
        fetchTopReplies();
      }

      function fetchTopReplies(){
        fetch(sessionStorage.getItem("server_address")+"/topReplies", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({user_id: data.uuid})
        })
        .then((response) => response.json())
        .then((json) => sessionStorage.setItem("topReplies", JSON.stringify(json)))
        .catch((error) => {
          console.log(error);
        })
      }

      function nameFetch(){
        try{
          return(
            <div>
            {data.first_name} {data.last_name}
            </div>
          );
        } catch(err) {
          return(
            <div>
            Failed to fetch user
            </div>
          );

        }
      };
    

    return(
      <div>
        <Navigator />

      <div className="account-page">
      <div className="account-top">
        <h1 className="userName">{nameFetch()}</h1>
        <div className="account-pages">
          <h3 
            className={activeSection === 'activity' ? 'active' : ''} 
            onClick={() => handleSectionClick('activity')}
          >
            Activity
          </h3>
          <h3 
            className={activeSection === 'stats' ? 'active' : ''}
            onClick={() => handleSectionClick('stats')}
          >
            Stats
          </h3>
        </div>
      </div>

      {activeSection === 'activity' && ( 
        <div className="account-content">
          <div className="my-trending">
        <h2>My Trending Threads</h2>
        <div className="recent-threads">
          <ul>
            {/* {recentThreads.map((thread, index) => (
              <li key={index}>
                <a href={thread.link}>{thread.title}</a>
              </li>
            ))} */}
          </ul>
          <div>{getTopThreads()}</div>
          </div>
        </div>
        <div className='my-trending-comments'> 
        <div className="latest-posts">
          <h2>My Trending Comments</h2>
          <ul>
            {/* {latestPosts.map((post, index) => (
              <li key={index}>
                <a href={post.link}>{post.content}</a>
              </li>
            ))} */}
          </ul>
          <div>{getTopReplies()}</div>
        </div>
        </div>
        <div>
        <div className="my-recent-tags">
        <h2>Recent Tags</h2>
        <div className="recent-tags">
        <ul>
            {/* {recentTags.map((tag, index) => (
              <li key={index}>
                <a href={tag.link}>{tag.title}</a>
              </li>
            ))} */}
          </ul>
        </div>
        </div>
        </div>
        </div>
      )}

      {activeSection === 'stats' && ( 
        <div className="account-content">

        <div className="account-info">
        <h2>Account Info</h2>
        <div className="user-details">
          <h4>Joined on {timeConverter(data.timestamp)}</h4>
          <h4>{data.type}</h4>
          <LogOut />
        </div>
      </div>
      
      <div className="achievements">
        <h2>Achievements</h2>
        <div className="achievement-list">
          {/* {achievements.map((achievement, index) => (
            <div key={index} className="achievement">
              <span className="achievement-icon">{achievement.icon}</span>
              <p>{achievement.title}</p>
            </div>
          ))} */}
        </div>
      </div>

      <div className="my-notifications">
        <h2>My Notifications</h2>
        {/* <ul>
          {notifications.map((notification, index) => (
            <div key={index} className="TBD">

            </div>
          ))}
        </ul> */}
      </div>


        <div className="site-customizations">
        <h2>Theme Switch</h2>
        <div className="theme-switch">
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
        
        </div>

       



      <div class="my-user-stats">
          <h2>User Stats</h2>
  <div class="user-stats">
    Answers
    <div class="number">{data.replies}</div>
  </div>
  <div class="user-stats">
    Questions
    <div class="number">{data.threads}</div>
  </div>
  <div class="user-stats">
    User Score
    <div class="number">{Math.floor(data.score*100)}</div>
  </div>
  <div class="user-stats">
    Views
    <div class="number">{data.views}</div>
  </div>
</div>

    
        </div>
      )}


      
      
        
    
    </div>
    </div>
    );
}