import Navigator from "./modules/Navigator.js";
import React, { useState, useEffect, useContext } from 'react';
import { ScreenStateContext } from './App.js';

import LogOut from "./modules/Logout.js";

export default function AccountPage() {
    let data = JSON.parse(sessionStorage.getItem("user"));
    window.scrollTo(0, 0);

    const changeScreen = useContext(ScreenStateContext);


    function Login() {
      changeScreen(2);
    }

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
        try{
          if(data.length > 0){
            let threads = [];

            for(let i = 0; i < data.length; i++){
              threads.push(data[i][0]);
            }

            return(
              <div>
                {threads.slice(0, 3).map((thread, index) => (
                  <h3 key={index}>{thread}</h3>
                ))}
              </div>
            );
          }else {
            return "No Threads";
          }
        } catch(err) {
          return "No Threads";
        }
      }

      function getTopReplies(){
        let data = JSON.parse(sessionStorage.getItem("topReplies"));
        
        try{
          if(data.length > 0){
            let replies = [];


            for(let i = 0; i < data.length; i++){
              replies.push(data[i][0]);
            }
            return(
              <div>
                {replies.slice(0, 3).map((reply, index) => (
                  <h3 key={index}>{reply}</h3>
                ))}
              </div>
            );

          }else {
            return "No Replies";
          }
        } catch(err) {
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
          body: JSON.stringify({user_id: data?.uuid})
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

        {data === null && (
        <div className="overlay">
          <div className="box-holder">
            <div className="overlay-box">
              <div className="box-content">
                <div className="box-top">
                  <h2>Please log in to access your account</h2>
                </div>
              <div className="box-bottom">
                  <p className="text">You need to log in to access this page. Please <div className="underline" onClick={Login}>log in </div> to continue.</p>
              </div>
             </div>
            </div>
          </div>
        </div>
        )}

        {data !== null && activeSection === 'activity' && ( 
          <div className="activity">
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
        </div>
        )}

        {data !== null && activeSection === 'stats' && ( 
          <div className="stats">
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

          <div className="my-user-stats">
          <h2>User Stats</h2>

            <div className="user-stats"><h3>Answers</h3><div className="number">{data.replies}</div></div>
            <div className="user-stats"><h3>Questions</h3><div className="number">{data.threads}</div></div>
            <div className="user-stats"><h3>User Score</h3><div className="number">{Math.floor(data.score * 100)}</div></div>
            <div className="user-stats"><h3>Views</h3><div className="number">{data.views}</div></div>

          </div>
        </div>
        </div>
        )}
      </div>
      </div>
    );
}