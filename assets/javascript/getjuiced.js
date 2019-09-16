
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    $('#option').on("change", function (event) {
        event.preventDefault();
        console.log($("#option").val());
        console.log($(this).val().substring(0, 2));

        var range = $("#option").val();
        console.log(range)
        var lat = position.coords.latitude;
        console.log(lat);
        var long = position.coords.longitude;
        console.log(long);
        var data;
      



        var queryURL = "https://api.openchargemap.io/v3/poi/?output=json&latitude=" + lat + "&longitude=" + long + "&distance=" + range + "&distanceunit=miles&maxresults=50";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response[0].AddressInfo.Latitude)
            console.log(response[0].AddressInfo.Longitude)
            data = response;
            console.log(data);
            initMap(lat, long, data);
        });



    });

};


function addMarker(data) {
    for (var i = 0; i < data.length; i++) {
        var town2 = data[i].AddressInfo.Town ;
        var state2 = data[i].AddressInfo.StateOrProvince;
        var contentString = "<div id='content'><h5>" + data[i].AddressInfo.Title + "</h5><p>" + data[i].AddressInfo.AddressLine1 + "<br>" + town2 + "<br>" + state2 + "</p></div>";
        var pos = new google.maps.LatLng(data[i].AddressInfo.Latitude, data[i].AddressInfo.Longitude)
        
        console.log(town2)
        const marker = new google.maps.Marker({
            position: pos,
            map: map
        });
        marker.index = i;
        // contents[i] = data[i];


        const infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 200
        });

        marker.addListener('click', function () {
            var newState = format(data[this.index].AddressInfo.StateOrProvince);
            console.log(this.index)
            infowindow.open(marker.get('map'), marker);
            snip(data[this.index].AddressInfo.Town, newState);
        });
        
    };

};

function initMap(lat, long, data) {
    var location = { lat: lat, lng: long };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: location

    });
    addMarker(data);
};


function format(letters){
     return letters === "AL" ? "Alabama" :
     letters === "AK" ? "Alaska" :
     letters === "AZ" ? "Arizona":
     letters === "AR" ? "Arkansas":
     letters === "CA" ? "California":
     letters === "CO" ? "Colorado":
     letters === "CT" ? "Connecticut":
     letters === "DE" ? "Delaware":
     letters === "FL" ? "Florida":
     letters === "GA" ? "Georgia":
     letters === "HI" ? "Hawaii":
     letters === "ID" ? "Idaho":
     letters === "IL" ? "Illinois":
     letters === "IN" ? "Indiana":
     letters === "IA" ? "Iowa":
     letters === "KS" ? "Kansas":
     letters === "KY" ? "Kentucky":
     letters === "LA" ? "Louisiana":
     letters === "ME" ? "Maine":
     letters === "MD" ? "Maryland":
     letters === "MA" ? "Massachusetts":
     letters === "MI" ? "Michigan":
     letters === "MN" ? "Minnesota":
     letters === "MS" ? "Mississippi":
     letters === "MO" ? "Missouri":
     letters === "MT" ? "Montana":
     letters === "NE" ? "Nebraska":
     letters === "NV" ? "Nevada":
     letters === "NH" ? "New Hampshire":
     letters === "NJ" ? "New Jersey":
     letters === "NM" ? "New Mexico":
     letters === "NY" ? "New York":
     letters === "NC" ? "North Carolina":
     letters === "ND" ? "North Dakota":
     letters === "OH" ? "Ohio":
     letters === "OK" ? "Oklahoma":
     letters === "OR" ? "Oregon":
     letters === "PA" ? "Pennsylvania":
     letters === "RI" ? "Rhode Island":
     letters === "SC" ? "South Carolina":
     letters === "SD" ? "South Dakota":
     letters === "TN" ? "Tennessee":
     letters === "TX" ? "Texas":
     letters === "UT" ? "Utah":
     letters === "VT" ? "Vermont":
     letters === "VA" ? "Virginia":
     letters === "WA" ? "Washington":
     letters === "WV" ? "West Virginia":
     letters === "WI" ? "Wisconsin":
     letters === "WY" ? "Wyoming":
     letters;
};


function snip(town2,state2) {
    var queryURL = "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext=1&titles="+ town2 +", " + state2;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
};
$(document).ready(function () {
    getLocation();
});



