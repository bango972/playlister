async function search() {
    const query = document.getElementById("query").value;
    const playlist = document.getElementById("playlist");
    playlist.innerHTML = ""; // vide la playlist
  
    if (!query) return;
  
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(query)}&key=AIzaSyD_donneeTaCleIci`
    );
    const data = await response.json();
  
    data.items.forEach(item => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const video = document.createElement("div");
      video.className = "video";
      video.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        <p>${title}</p>
      `;
      playlist.appendChild(video);
    });
  }
  async function searchSoundCloud(query) {
    const clientId = "2t9loNQH90kzJcsFCODdigxfp325aq4z";
    const url = `https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(query)}&client_id=${clientId}&limit=5`;
  
    const res = await fetch(url);
    const data = await res.json();
  
    const playlist = document.getElementById("playlist");
    playlist.innerHTML = "";
  
    data.collection.forEach(track => {
      const title = track.title;
      const permalink = track.permalink_url;
  
      const item = document.createElement("div");
      item.className = "video";
      item.innerHTML = `
        <iframe width="100%" height="166" scrolling="no" frameborder="no"
        src="https://w.soundcloud.com/player/?url=${encodeURIComponent(permalink)}&color=%23ff5500"></iframe>
        <p>${title}</p>
      `;
      playlist.appendChild(item);
    });
  }
    