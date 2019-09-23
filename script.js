function deleteSqueak(squeakId) {
  $.ajax({
    type: "POST",
    url: `${url}/deleteSqueak.php`,
    data: `id=${squeakId}`
  }).then(data => {
    if (data.id) {
      $(`#${data.id}`).remove();
    }
  }).catch(error => {
    console.log("ERROR", error);
  });
}

function likeSqueak(squeakId) {
  $.ajax({
    type: "POST",
    url: `${url}/likeSqueak.php`,
    data: `id=${squeakId}&value=1`
  }).then(data => {
    if (data.squeak) {
      $(`#${data.squeak.id}`).find('.squeak_like-count').text(data.squeak.likeCount);
    }
  }).catch(error => {
    console.log("ERROR", error);
  });
}

function unLikeSqueak(squeakId) {
  $.ajax({
    type: "POST",
    url: `${url}/likeSqueak.php`,
    data: `id=${squeakId}&value=-1`
  }).then(data => {
    if (data.squeak) {
      $(`#${data.squeak.id}`).find('.squeak_like-count').text(data.squeak.likeCount);
    }
  }).catch(error => {
    console.log("ERROR", error);
  });
}

function addSqueak(squeak) {
  $(`
  <div id="${squeak.id}" class="squeak card">
    <h3>${squeak.username}</h3>
    <p>${squeak.message}</p>
    <p class="squeak_likes">Likes: <span class="squeak_like-count">${squeak.likeCount}<span></p>
    <a onclick="deleteSqueak('${squeak.id}')" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">delete</i></a>
    <a onclick="likeSqueak('${squeak.id}')" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">thumb_up</i></a>
    <a onclick="unLikeSqueak('${squeak.id}')" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">thumb_down</i></a>
  </div>
  `).appendTo('.all-squeaks');
}

function getAllSqueaks() {
  $.ajax({
    type: "GET",
    url: `${url}/squeaks.php`
  }).then(data => {
    console.log(data);
    for(const id in data.squeaks) {
      const squeak = data.squeaks[id];
      addSqueak(squeak);
    }

  }).catch(error => {
    console.log("ERROR", error);
  });
}

getAllSqueaks();

function postSqueak(data) {
  $.ajax({
    type: "POST",
    url: `${url}/squeaks.php`,
    data: data
  }).then(data => {
    console.log(data);
    addSqueak(data.squeak);
  }).catch(error => {
    console.log("ERROR", error);
  });
}


$("#new-squeak-form").on("submit", function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  postSqueak(data);
});
