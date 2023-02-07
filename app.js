$(document).ready(function () {
  var API_KEY = "AIzaSyCO61s_ZE22pHvHCWeHbVCUipk5lGL8zjI";

  $("#button").click(function (event) {
    event.preventDefault();

    var search = $(".input").val();
    videoSearch(API_KEY, search, 10);
    $(".input").val("");
  });

  function videoSearch(key, search, maxResult) {
    $(".vid-row").empty();
    let response = fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=${maxResult}&q=${search}&type=video&key=${key}`
    );
    response
      .then((v) => {
        return v.json();
      })
      .then((e) => {
        let idata = "";
        let location = document.getElementsByClassName("vid-row")[0];
        console.log(e);
        console.log(e.items.length);
        for (let i = 0; i < e.items.length; i++) {
          console.log(e.items[i].id.videoId);
          idata += `
            <div class="card">
            <p class="head">${e.items[i].snippet.title}</p>
            <div class="video-i">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${e.items[i].id.videoId}" title="YouTube video player" frameborder="0" allowfullscreen></iframe></div>
        </div>
            `;
        }
        setTimeout(() => {
          window.scrollTo(0, 1000);
        }, 2000);
        document.getElementsByClassName("vid-row")[0].innerHTML =
          document.getElementsByClassName("vid-row")[0].innerHTML + idata;
      });
  }
});
