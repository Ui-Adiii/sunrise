const apiURL =
  "https://api.allorigins.win/get?url=" +
  encodeURIComponent(
    "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today"
  );

fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    let parsed = JSON.parse(data.contents);

    if (parsed.status === "OK") {
      // Get the raw sunrise and sunset times (adjust for time zone if needed)
      let sunrise = parsed.results.sunrise;
      let sunset = parsed.results.sunset;
      sunrise =
        sunrise.split(":").slice(0, 2).join(":") + " " + sunrise.split(" ")[1];
      sunset =
        sunset.split(":").slice(0, 2).join(":") + " " + sunset.split(" ")[1];

      // Update the DOM with sunrise and sunset times
      document.getElementById("sunrise").textContent = "Sunrise: " + sunrise;
      document.getElementById("sunset").textContent = "Sunset: " + sunset;
    } else {
      document.getElementById("error").textContent =
        "API returned invalid data.";
    }
  })
  .catch((err) => {
    document.getElementById("error").textContent = "Failed to load data.";
    console.error(err);
  });
