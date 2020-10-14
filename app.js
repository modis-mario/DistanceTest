const directionsService = new google.maps.DistanceMatrixService();

function getDistance() {
  let org = document.getElementById("origin").value;
  let dst = document.getElementById("destination").value;

  const option = {
    origins: [`"${org}"`],
    destinations: [`"${dst}"`],
    travelMode: "DRIVING",
  };

  directionsService.getDistanceMatrix(option, result);

  function result(response, status) {
    if (status != "OK") {
      alert("Something wrong");
      return;
    } else {
      // Display the result

      console.log(response);

      let results = response.rows[0].elements;
      let element = results[0];

      let message = "";
      let dist = "";

      if(element.status == "OK")
      {
        message = `Distance from <span style="color:red">${response['originAddresses']}</span>
         to <span style="color:red">${response['destinationAddresses']}</span> is :`;
        dist = document.getElementById('output').innerHTML = `${element.distance.text}`;
      }
      else if (element.status == "NOT_FOUND")
      {
        message = "Could not find the origin and/or destination";
      }
      else if (element.status == "ZERO_RESULTS")
      {
        message = `No route found from <span style="color:red">${response['originAddresses']}</span>
        to <span style="color:red">${response['destinationAddresses']}</span>`;
      }
      
      document.getElementById('text-output').innerHTML = message;
      document.getElementById('output').innerHTML = dist;

    }
  }
}
