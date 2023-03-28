var ss, ds, date, d, s_day, d_day, cityFromAPI; var cityName="";
var t_name = document.getElementsByClassName('tName');
var time = document.getElementsByClassName('timeLine');
var a_time = document.getElementsByClassName('ssdetails');
var d_time = document.getElementsByClassName('dsdetails');
function check() {
    var j, t = "";
    document.getElementById('setUpdate').innerHTML="";
    t = document.getElementsByTagName('input')[0].value;
    ss = document.getElementsByTagName('input')[1].value;
    ds = document.getElementsByTagName('input')[2].value;
    date = t.substring(8, 10) + "-" + t.substring(5, 7) + "-" + t.substring(0, 4);
    d = new Date(`${t}`);
    for (j = 0; j < 25; j++)//displaying no tiles of trains
    {
        document.getElementsByClassName('trainListItem')[j].style.display = "none";
    }
    if(ss==''||ds==""||t=="")
    {
        document.getElementById('setUpdate').innerHTML="Enter all fields";
        document.getElementsByClassName('goButton')[0].style.display="none";
    }
    else{
    fetch(`https://railway-w6eh.onrender.com/proxy?from=${ss}&to=${ds}&date=${date}`)
        .then(response => response.json())
        .then((data) => {
            var i; 
            document.getElementById('setUpdate').innerHTML="";
            if (data.data.length == 0) {
                document.getElementById('setUpdate').innerHTML="No Trains Available";
                document.getElementsByClassName('goButton')[0].style.display="none";
            }
            else {
                cityFromAPI = data.data[0].train_base.to_stn_name+"";
                document.getElementsByClassName('goButton')[0].style.display="block";
                for (i = 0; i < data.data.length; i++) {
                    var ob = data.data[i].train_base;
                    document.getElementsByClassName('trainListItem')[i].style.display = "grid";
                    t_name[i].innerHTML = ob.train_no + " " + ob.train_name;
                    a_time[i].innerHTML = ob.from_time;
                    d_time[i].innerHTML = ob.to_time;
                    time[i].innerHTML = "------- " + ob.travel_time + " -------";
                }
            }

        }).catch(err => console.error(err));
}
}
function T_Book(){
    location.assign("https://www.irctc.co.in/nget/train-search");
    //  location.href("https://www.irctc.co.in/nget/train-search");
}

function printPlaces()
{
        cityName = document.getElementsByTagName('input')[3].value;
    var placeId;
    var requestOptions = {
        method: 'GET',
    };
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${cityName}&apiKey=5576779e4e7342bcbbe9858cfe9e93fd`, requestOptions)
        .then(response => response.json())
        .then(result => {

            placeId = result.features[0].properties.place_id;

            fetch(`https://api.geoapify.com/v2/places?categories=tourism&filter=place:${placeId}&limit=20&apiKey=5576779e4e7342bcbbe9858cfe9e93fd`)
                .then(response => response.json())
                .then(result => {
                     console.log(placeId);
                     var i; var val="";
                     if(result.features.length==0)
                     document.getElementById('visitPlaceList').innerHTML="No Tourist attraction found";
                     else{
                     for(i=0;i<=result.features.length-1;i++)
                     {
                        val = val+ `<li>`+`&#8226 `+result.features[i].properties.address_line1+`</li>`;
                     }
                     document.getElementById('visitPlaceList').innerHTML=val;
                    }
                })
                .catch(error => console.log('error', error));
        })
        .catch(error => console.log('error', error));
}

