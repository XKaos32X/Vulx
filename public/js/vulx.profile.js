const searchBar = document.querySelector('input[type="text"]');
import ranksJson from '../json/ranks.json' assert {type: 'json'};

window.autosaveUrl = "http://127.0.0.1:/updatePresence";

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

if(searchBar.addEventListener('focusin', (event) => {
    var overlay = document.getElementById("overlay");
    var searchBar = document.getElementById("searchBar");
        //Remove old class
        overlay.classList.remove("hidden");
        overlay.classList.remove("fadeout");
        searchBar.classList.remove("hidden");
        searchBar.classList.remove("fadeout");
        //Add new class
        overlay.classList.add("visible");
        overlay.classList.add("fadein");
        searchBar.classList.add("visible");
        searchBar.classList.add("fadein");
}));

function closeSearchBar() {
    var overlay = document.getElementById("overlay");
    var searchBar = document.getElementById("searchBar");
        //Remove old class
        overlay.classList.remove("visible");
        overlay.classList.remove("fadein");
        searchBar.classList.remove("visible");
        searchBar.classList.remove("fadein");
        //Add new class
        overlay.classList.add("hidden");
        overlay.classList.add("fadeout");
        searchBar.classList.add("hidden");
        searchBar.classList.add("fadeout");
        
} window.closeSearchBar = closeSearchBar;

let dropLoc = 0;
for(var i = 0; i < ranksJson.length; i++) {
    var ranksDropdown = document.getElementById("collapseRank");
    var rank = document.createElement("div");
    rank.setAttribute("class", "valorantDropdownItem");
    rank.setAttribute("data-toggle", "collapse");
    rank.setAttribute("href", "#collapseRankSpecific" + i);
    rank.setAttribute("role", "button");
    rank.setAttribute("aria-expanded", "false");
    rank.setAttribute("aria-controls", "collapseRankSpecific" + i);
    rank.setAttribute("onclick", "rankDropdownToggle(this.children[2])");
    rank.setAttribute("id", i);

    var rankImg = document.createElement("img");
    rankImg.setAttribute("style", "height: 30px;");
    rankImg.setAttribute("class", "valorantRankImg");
    rankImg.setAttribute("src", `https://cdn.aquaplays.xyz/ranks/${ranksJson[i].id}.png`);
    rank.appendChild(rankImg);

    var rankName = document.createElement("h4");
    rankName.setAttribute("style", "font-size: 20px; padding-top: 2px;");
    rankName.setAttribute("class", "valorantRank");
    rankName.innerHTML = Object.keys(ranksJson[i])[1];
    rank.appendChild(rankName);

    var rankArrow = document.createElement("div");
    rankArrow.setAttribute("style", `top: ${dropLoc}px !important;`);
    rankArrow.setAttribute("class", "arrow-left arrow-downV2");
    rankArrow.setAttribute("id", "rankArrow" + i);
    rank.appendChild(rankArrow);
          
    var rankSpecificDropdown = document.createElement("div");
    rankSpecificDropdown.setAttribute("data-parent", "#collapseRank");
    rankSpecificDropdown.setAttribute("style", `top: ${dropLoc}px !important;`);
    rankSpecificDropdown.setAttribute("id", "collapseRankSpecific" + i);
    rankSpecificDropdown.setAttribute("class", "collapse profileRankSpecificDropdown");
    rank.appendChild(rankSpecificDropdown);

    for(var j = 0; j < Object.values(ranksJson[i])[1].length; j++) {
        let rank = Object.values(ranksJson[i])[1][j];
        
        var rankSpecific = document.createElement("div");
        rankSpecific.setAttribute("class", "valorantDropdownItem");
        rankSpecific.setAttribute("id", j);
        rankSpecific.addEventListener('click', async (event) => {
            await selectRank(rank);
        });
        rankSpecificDropdown.appendChild(rankSpecific);

        var rankSpecificImg = document.createElement("img");
        rankSpecificImg.setAttribute("style", "height: 30px;");
        rankSpecificImg.setAttribute("class", "valorantRankImg");
        rankSpecificImg.setAttribute("src", `https://cdn.aquaplays.xyz/ranks/${rankName.innerHTML == "Special" ? 0 : rank}.png`);
        rankSpecific.appendChild(rankSpecificImg);

        const num = j+1;
        var rankSpecificName = document.createElement("h4");
        rankSpecificName.setAttribute("style", "font-size: 20px; padding-top: 2px;");
        rankSpecificName.setAttribute("class", "valorantRank");
        rankSpecificName.innerHTML = rankName.innerHTML + " " + num;
        rankSpecific.appendChild(rankSpecificName);
    }

    dropLoc += 45;
    ranksDropdown.appendChild(rank);
}

function rankDropdownToggle(el) {
	var rankDropdowns = document.querySelectorAll(".arrow-downV2");
	rankDropdowns.forEach(rankDropdown => {
		if (rankDropdown.id != "mainRankDropdown" && rankDropdown != el)
			rankDropdown.classList.remove("active")
	})
	el.classList.toggle("active")
} window.rankDropdownToggle = rankDropdownToggle;

function Notification(type, message) {
    if(type == true) {
        Toastify({ text: message,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true, 
            className: "info",
        }).showToast();
    } else {
        Toastify({ text: message,
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true, 
            className: "info",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            }
        }).showToast();
    }
}

async function selectRank(id) {
    await fetch('http://127.0.0.1:/updatePresence', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                flag: 2,
                rank: id
            }
        )
    }).then((response) => {
        Notification(true, "Rank updated successfully!");
        getProfile();
    }).catch((error) => {
        Notification(false, "An error occured while updating your rank!");
    });  
} window.selectRank = selectRank;

if ($('#valorantMatchStatus')[0].scrollWidth > $('#valorantMatchStatusContainer').innerWidth()) {
    const isHover = e => e.parentElement.querySelector(':hover') === e;    
    const valorantStatus = document.getElementById('valorantMatchStatus');
    document.addEventListener('mousemove', function checkHover() {
    const hovered = isHover(valorantStatus);
        if (hovered !== checkHover.hovered) {
            if(hovered == true) {
                var profile = document.getElementById("profile");
                var spacer = document.getElementById("bottomSpacer");
                var status = document.getElementById("valorantMatchStatus");
                var advertising = document.getElementsByClassName("vulxAdvertising");
                var background = document.getElementById('valorantMatchStatusContainer');
                var bgimage = getComputedStyle(background);

                profile.style.height = parseInt(bgimage.getPropertyValue('height')) + 505 - 37 + "px"
                spacer.style.top = parseInt(bgimage.getPropertyValue('height')) + 452 - 37 + "px" 
                status.style.whiteSpace = "normal";
                advertising[0].style.top = parseInt(bgimage.getPropertyValue('height')) + 475 - 37 + "px" 
            } else {
                var profile = document.getElementById("profile");
                var spacer = document.getElementById("bottomSpacer");
                var status = document.getElementById("valorantMatchStatus");
                var advertising = document.getElementsByClassName("vulxAdvertising");
                profile.style.height = "505px";
                spacer.style.top = "452px";
                status.style.whiteSpace = "nowrap";
                advertising[0].style.top = "475px";
            }
        }
    });
}   //

var titlesDropdown = document.getElementById("titleDropdown");
var dropdownSelect = document.getElementById("dropdownButton");
var response = fetch('https://valorant-api.com/v1/playertitles').then(res => res.json()).then(response => {
    response.data = [{ "displayName": "No Title", "uuid": "null" }, ...response.data];
        response.data.forEach(title => {
            var dropdownItem = document.createElement("a");
            if (window.playerTitleId == title.uuid) {
                dropdownItem.setAttribute("class", "dropdown-item active");
                dropdownSelect.textContent = title.displayName;
            }
            else dropdownItem.setAttribute("class", "dropdown-item");
            dropdownItem.setAttribute("href", "#");
            dropdownItem.setAttribute("data-value", title.uuid);
            dropdownItem.addEventListener('click', async (event) => {
                selectTitle(title.uuid);
            });
            dropdownItem.innerHTML = title.displayName;
            titlesDropdown.appendChild(dropdownItem);
        });
});

function selectTitle(playerTitleId) {
    fetch(window.autosaveUrl, {
        method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    flag: 64,
                    playerTitleId,
                }
            )
    }).then(() => {
        Notification(true, "Profile updated successfully!");
        getProfile();
    }).catch(() => {
        Notification(false, "An error occured while updating your profile!");
    })
}

document.querySelectorAll(".searchBarInput").forEach((inputField) => {
    inputField.addEventListener("change", () => {
    const name = inputField.getAttribute("name");
    const value = inputField.value;

    const formData = new FormData();
    formData.append(name, value);

    const flagConversion = {
        status: 1,
        rank: 2,
        position: 4,
        level: 8,
        ally: 16,
        enemy: 32,
        playerTitleId: 64,
    }

    var autosaveJson = { flag: 0 };

    for (const pair of formData.entries()) {
        autosaveJson.flag += flagConversion[pair[0]];
        autosaveJson[pair[0]] = pair[1];
    }

    fetch(window.autosaveUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autosaveJson)
    }).then(() => {
        Notification(true, "Profile updated successfully!");
        getProfile();
    }).catch(() => {
        Notification(false, "An error occured while updating your profile!");
    })});
});

function setupSlip(list) {       
    list.addEventListener('slip:beforewait', function(e){
        if (e.target.classList.contains('instant')) e.preventDefault();
    }, false);

    list.addEventListener('slip:beforeswipe', function(e){
        e.preventDefault();
    }, false);

    list.addEventListener('slip:reorder', function(e){                             
        e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);

        var olArray = []         
        var olChilds = document.getElementById("profileThemes").querySelectorAll('li');

        olChilds.forEach(child => olArray.push(child.id))

        return false;
    }, false);
    
    return new Slip(list);
}
setupSlip(document.getElementById('profileThemes'));