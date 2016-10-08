// request lat lng coordinates of a location
function requestLocation(){
  var query_value = document.getElementById('insert_query').value;
  var xhr =  new XMLHttpRequest();
  xhr.onreadystatechange = function (){
    if(this.status == 200 && this.readyState == 4){
      var info = JSON.parse(this.responseText);
      requestChannels(info.results[0].geometry.location);
    };
  };
  xhr.open("GET",`https://maps.googleapis.com/maps/api/geocode/json?address=${query_value}&key=AIzaSyDas06uAPexYsx_8MQn3KQFI78Hl5JaxPo`,true)
  xhr.send();
}
/// request youtube chanels within a location
function requestChannels (location){
  var xhr =  new XMLHttpRequest();
  xhr.onreadystatechange = function (){
    if(this.status == 200 && this.readyState == 4){
      var info = JSON.parse(this.responseText);
      fetchInfo(info);
    };
  };
  xhr.open("GET",`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyDWXw7qqxlnY_e726-pkyHDDOJ8PWi1A3c&location=${location['lat']}%2C${location['lng']}&locationRadius=10km&maxResults=10`, true);
  xhr.send();
}
/// filtrates the necessary info
function fetchInfo(info) {
  clearHistory();
  for(var i = 0; i < info.items.length; i++){
    document.getElementById('result').innerHTML +=
    appendResults(
      info.items[i].snippet.thumbnails.high.url,
      info.items[i].snippet.channelTitle
    );
  };
}
// append The results
function appendResults(url,channel_title){
  return '' +
  '<div class="" onclick="add_playlist(this)">' +
    '<p>' + channel_title + '</p>' +
    '<img src="' + url + '">' +
  '</div>'
}
// clears the search history
function clearHistory(){
  document.getElementById('result').innerHTML = "";
}
// adds playlist to favorite
function add_playlist(event){
  var div_class = event.className;
  if ( div_class == ""){
    event.classList.add("selected");
  } else {
    event.classList.remove("selected");
  };
}
// save Playlist
function savePlaylist(){
  var selected = document.getElementsByClassName('selected')
  for(var i = 0 ;  i < selected.length; i++){
    saveInfo(selected[i]);
  };
}
// save the info that is send to the database
function saveInfo(element){
  var my_info = {};
  my_info.name = element.firstChild.textContent;
  my_info.url = element.childNodes[1].currentSrc;
  sendDb(my_info);
}
// send to db
function sendDb(info) {
  var xhr =  new XMLHttpRequest();
  xhr.open("POST",'/api/v1/create');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({
      name: "teste",
      url: "also teste"
    })
  );
}
