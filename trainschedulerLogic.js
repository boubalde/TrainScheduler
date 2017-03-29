


var config = {
    apiKey: "AIzaSyC4EFWrV6qJIUrmkZDRf9RbrKULP05vdyU",
    authDomain: "thatrain-a31f6.firebaseapp.com",
    databaseURL: "https://thatrain-a31f6.firebaseio.com",
    storageBucket: "thatrain-a31f6.appspot.com",
    messagingSenderId: "1055505336909"
  };
  firebase.initializeApp(config);



var database = firebase.database();

// 2. Button for adding new Train
$("#add-Train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var TrainName = $("#Train-name-input").val().trim();
  var YourDestination = $("#Destination-input").val().trim();
  var firstTime = $("#First-Train-Time-input").val().trim()
	var tFrequency = $("#Frequency-input").val().trim()

  // Creates local "temporary" object for holding Train data
  var newTrain = {
    name: TrainName,
    destination: YourDestination,
    frequency: tFrequency,
    start: firstTime
    
  };

  // Uploads Train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.start);
  

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#Train-name-input").val("");
  $("#Destination-input").val("");
  $("#First-Train-Time-input").val("");
  $("#Frequency-input").val("")
 

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var TrainName = childSnapshot.val().name;
  var YourDestination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(TrainName);
  console.log(YourDestination);
  console.log(firstTime);
  console.log(tFrequency);
  

   var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Add each train's data into the table
  $("#Train-table > tbody").append("<tr><td>" + TrainName + "</td><td>" + YourDestination+ "</td><td>" +
  tFrequency+ "</td><td>"  + moment(nextTrain).format("hh:mm") + "</td><td>"+ tMinutesTillTrain + "</td></tr>");
});
