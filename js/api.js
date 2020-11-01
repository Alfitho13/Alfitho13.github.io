
const base_url = "https://api.football-data.org/v2/";
const url_team = `${base_url}teams/`;
const url_standings = `${base_url}competitions/2021/standings`;
const fetchAPI = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      'X-Auth-Token': `65cc578fbd874694896c97e56c8282c7`
    },
  });
};


// Blok kode yang akan di panggil jika fetch berhasil
const status =  (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
const json = (response) => {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
const error = (error) => {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams() {
  if ("caches" in window) {
    caches.match(url_team).then((response) => {
      if (response) {
        response.json().then((data) => {
          let articlesHTML = "";
          data.teams.forEach((team) => {
            articlesHTML += `
            <div class="col s12 m6">
                  <div class="card">
                    <a href="./article.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-black">
                        <img alt="logo-football-team" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                      </div>
                    </a>
                    <div class="divider"></div>
                    <div class="card-content">
                       <span class="card-title truncate black-text">${team.name}</span>
                       <span class="card-title truncate">${team.venue}</span>
                       <span class="card-title truncate">${team.founded}</span>
                     </div>
                  </div>
            </div>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("football-team").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetchAPI(url_team )
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
      data.teams.forEach((team) => {
        articlesHTML += `
        <div class="col s12 m6">
              <div class="card">
                <a href="./article.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-black">
                    <img alt="logo-football-team" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                  </div>
                </a>
                <div class="divider"></div>
                <div class="card-content">
                   <span class="card-title truncate black-text">${team.name}</span>
                   <span class="card-title truncate">${team.venue}</span>
                   <span class="card-title truncate">${team.founded}</span>
                 </div>
              </div>
        </div>

            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("football-team").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getTeamsById() {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function(response) {
        if (response) {
          response.json().then((data) => {
            let articleHTML = `
            <h3 class="center"> About the Team </h3>
            <div class="container">
            <div class="card">
            <div class="row">
                <img alt="logo-football-team" class="col s12 m6"src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" />
            <div class="card-content col s12 m6">
                <h4>${data.name}</h4>
                <div class="divider"></div>
                <ul>
                <li>Nama Panggilan : ${data.shortName}</li>
                <li>Alamat : ${data.address}</li>
                <li>No.telepon: ${data.phone}</li>
                <li>Website : ${data.website}</li>
                <li>Warna Club : ${data.clubColors}</li>
                <li>Stadion: ${data.venue}</li>
                <li>Dibuat pada tahun: ${data.founded}</li>
                </ul>
                <div class="divider"></div>
                <blockquote>${data.lastUpdated}</blockquote>
              </div>
              </div>
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchAPI(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then((data) => {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // console.log(data);
        // Menyusun komponen card artikel secara dinamis
        let articleHTML = `
        <h3 class="center"> About the Team </h3>
        <div class="container">
        <div class="card">
        <div class="row">
            <img alt="logo-football-team" class="col s12 m6"src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}" />
        <div class="card-content col s12 m6">
            <h4>${data.name}</h4>
            <div class="divider"></div>
            <ul>
            <li>Nama Panggilan : ${data.shortName}</li>
            <li>Alamat : ${data.address}</li>
            <li>No.telepon: ${data.phone}</li>
            <li>Website : ${data.website}</li>
            <li>Warna Club : ${data.clubColors}</li>
            <li>Stadion: ${data.venue}</li>
            <li>Dibuat pada tahun: ${data.founded}</li>
            </ul>
            <div class="divider"></div>
            <blockquote>${data.lastUpdated}</blockquote>
          </div>
          </div>
          </div>
        </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getYourFavoritTeam() {
  getAll().then(function(teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    teams.forEach((team) => {

      articlesHTML += `
      <div class="container">
            <div class="card">
              <a href="./article.html?id=${team.id}&saved=true">
                <div class="card-image waves-effect waves-block waves-black">
                  <img alt="logo-football-team" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" />
                </div>
              </a>
              <div class="divider"></div>
              <div class="card-content">
                 <span class="card-title truncate black-text">${team.name}</span>
                 <span class="card-title truncate">${team.venue}</span>
                 <span class="card-title truncate">${team.founded}</span>
               </div>
            </div>
      </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  getById(parseInt(idParam))
  .then((team) => {
    let articleHTML = '';
    articleHTML = `
    <h3 class="center"> About the Team </h3>
    <div class="container">
    <div class="card">
    <div class="row">
        <img alt="logo-football-team" class="col s12 m6" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}"/>
    <div class="card-content col s12 m6">
        <h4>${team.name}</h4>
        <div class="divider"></div>
        <ul>
        <li>Nama Panggilan : ${team.shortName}</li>
        <li>Alamat : ${team.address}</li>
        <li>No.telepon: ${team.phone}</li>
        <li>Website : ${team.website}</li>
        <li>Warna Club : ${team.clubColors}</li>
        <li>Stadion: ${team.venue}</li>
        <li>Dibuat pada tahun: ${team.founded}</li>
        </ul>
        <div class="divider"></div>
        <blockquote>${team.lastUpdated}</blockquote>
      </div>
      </div>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}


function getAllStandings() {
  if ("caches" in window) {
    caches.match(url_standings).then((response) => {
      if (response) {
        response.json().then((data) => {
          const topTeam = data.standings[0];
          let articlesHTML = "";
          topTeam.table.forEach((standing) => {
            articlesHTML += `
            <tr>
                <td class="center-align"> ${standing.position} </td>
                <td> ${standing.team.name}</td>
                <td class="center-align">${standing.won} </td>
                <td class="center-align">${standing.lost} </td>
                <td class="center-align"> ${standing.draw}</td>
            </tr>
                `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standing-team").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetchAPI(url_standings)
    .then(status)
    .then(json)
    .then((data) => {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      const topTeam = data.standings[0];
      let articlesHTML = "";
      topTeam.table.forEach((standing) => {
        articlesHTML += `
        <tr>
            <td class="center"> ${standing.position} </td>
            <td>${standing.team.name}</td>
            <td class="center">${standing.won} </td>
            <td class="center">${standing.lost} </td>
            <td class="center"> ${standing.draw}</td>
        </tr>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standing-team").innerHTML = articlesHTML;
    })
    .catch(error);
}
