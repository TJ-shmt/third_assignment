import React, { useState } from 'react';
import './App.css';
//import SaveDog from './Save';
//import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';

// --- Get old data form localStorage ---
let loadedStorageData = [];
const loadStorage = localStorage.getItem("newKey");
if (loadStorage) {
  loadedStorageData = JSON.parse(loadStorage);
}
// --- Get old data form localStorage ---

// --- The App ---
export default function App() {

  const [imgUrls, setImgUrls] = React.useState([]);
  const [storedImg, setStoredImg] = React.useState(loadedStorageData);

  // --- Load ---
  async function loadData() {
    const url = "https://random.dog/woof.json";
    const response = await fetch(url);
    const data = await response.json();

    let imageSrc = [data["url"]];

    setImgUrls(imageSrc);
    //console.log("Loaded Url", imgUrls);
  }
  //



  // --- Add ---
  function addDog() {
    const addUrl = [...storedImg, imgUrls]
    setStoredImg(addUrl);

    const uploadData = JSON.stringify(addUrl);
    localStorage.setItem("newKey", uploadData);

    loadData()

    //console.log("Stored Data", loadedStorageData);
  }
  //


  // --- Delete ---
  function deleteImg(item) {

    const deletedImg = storedImg.filter(function (idk) {
      return idk !== item;
    });

    setStoredImg(deletedImg)

    const uploadData = JSON.stringify(deletedImg);
    localStorage.setItem("newKey", uploadData);

    //console.log("Stored Data", loadedStorageData);
  }
  //


  React.useEffect(function () {
    loadData();
  }, []);

  // --- App Render ---
  return (
    <div className="App" id="grid">

      <div className="spacer" />
      <h1>Random Dogs</h1>
      <div className="spacer" />

      <div className="spacer" />
      <div className="main">

        <div className="randomSearch">
          <div className="imgDiv">
            <img id="firstpic" src={imgUrls}></img>
            <div>
              <span className="like" onClick={addDog}></span>
              <i className="arrow right" onClick={loadData}></i>
            </div>

          </div>
        </div>



        <h2 className="favorites">favorites</h2>
        <div className="favs">
          {storedImg.map(item => {
            return (
              <div className="imgDiv">
                <img className="gallery" src={item} ></img>
                <span className="dislike" onClick={function () { deleteImg(item) }}></span>
              </div>
            )
          })}
        </div>



      </div>
      <div className="spacer" />


    </div>








  )
  //
}
//--- The App ---
