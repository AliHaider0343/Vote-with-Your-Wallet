var accountDataString = localStorage.getItem("accounts");
// Parse accountData from string to object
var accountData = JSON.parse(accountDataString) || [];

var causestring = localStorage.getItem("causes_data");
// Parse accountData from string to object
var cause_data = JSON.parse(causestring) || [];
var user = localStorage.getItem("logged_user");

$(document).ready(function () {
  $("#register-form").submit(function (event) {
    event.preventDefault();

    // Get form data
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirm-password").val();

    // Check if password and confirm password fields match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if username or email already exists
    var existingUser = accountData.find(function (user) {
      return user.username === username || user.email === email;
    });
    if (existingUser) {
      alert("Username or email already taken!");
      return;
    }

    // Create new user account and add to account data
    var newUser = {
      username: username,
      email: email,
      password: password,
    };
    accountData.push(newUser);
    localStorage.setItem("accounts", JSON.stringify(accountData));

    // Display success message and redirect to login page
    alert("Registration successful!");
    window.location.replace("login.html");
  });

  $("#login-form").submit(function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var account = accountData.find(function (user) {
      return user.username === username && user.password === password;
    });
    if (account) {
      localStorage.setItem("logged_user", JSON.stringify(username));
      alert("Login successful!");
      window.location.replace("home.html");
    } else {
      // Login failed
      alert("Invalid username or password!");
    }
  });

  $("#admin-login-form").submit(function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    
    if ( username === "root" && password === "admin") {
      localStorage.setItem("logged_user", JSON.stringify(username));
      alert("Login as Administrator successful!");
      window.location.replace("dashboard.html");
    } else {
      // Login failed
      alert("Invalid username or password!");
    }
  });

  if ($("body").hasClass("cause-form-body")) {
    var user = localStorage.getItem("logged_user");
    user = user.replace(/"/g, "").toUpperCase();

    $("#username").text(user);
  }

  $("#cause-form").submit(function (event) {
    event.preventDefault();

    // Get form data
    var randomId = "Id-" + Math.random().toString(36).substr(2, 9);
    var title = $("#title").val();
    var desc = $("#desc").val();
    var cat = $("#cat").val();
    var total_sigantures = 0;
    var names = [];

    // Create new user account and add to account data
    var newCause = {
      randomId: randomId,
      title: title,
      desc: desc,
      cat: cat,
      total_sigantures: total_sigantures,
      names: names,
    };
    cause_data.push(newCause);
    localStorage.setItem("causes_data", JSON.stringify(cause_data));
    // Display success message and redirect to create caueses page
    alert("Cause Uploaded Successfully You can view in Details Page!");
    window.location.replace("create_causes.html");
  });

  if ($("body").hasClass("view-page")) {
    var table = $("#causes-table"); // get a reference to the table element
    // loop through the causes data and populate the table rows
    $.each(cause_data, function (index, cause) {
      var row =
        "<tr> <td>" +
        cause.randomId +
        "</td> <td>" +
        cause.title +
        "</td> <td>" +
        cause.desc +
        "</td><td>" +
        cause.cat +
        "</td><td>" +
        cause.total_sigantures +
        "</td><td>" +
        cause.names +
        "</td></tr>";
      table.append(row);
    });
  }
  if ($("body").hasClass("view-page-sign")) {
    var user = localStorage.getItem("logged_user");
    user = user.replace(/"/g, "").toUpperCase();

    $("#username").text(user);
    var table = $("#causes-sign-table"); // get a reference to the table element

    // loop through the causes data and populate the table rows
    $.each(cause_data, function (index, cause) {
      var row =
        "<tr> <td>" +
        cause.randomId +
        "</td> <td>" +
        cause.title +
        "</td> <td>" +
        cause.cat +
        "</td><td><button class='btn btn-success p-2 read_more'>Read More for Sigining</button></td></tr>";
      table.append(row);
    });

    $("#causes-sign-table").on("click", ".read_more", function () {
      // Get the index of the row that was clicked
      var rowIndex = $(this).closest("tr").index();
      rowIndex = rowIndex - 1;
      // Get the cause data for that row
      var causeData = cause_data[rowIndex];
      localStorage.setItem("current_cause", JSON.stringify(causeData));
      // Redirect to the details page
      window.location.replace("single_casue.html");
    });
  }

  if ($("body").hasClass("view-page-dashboard")) {
    var user = localStorage.getItem("logged_user");
    user = user.replace(/"/g, "").toUpperCase();

    $("#username").text(user);
    var table = $("#causes-sign-table"); // get a reference to the table element

    // loop through the causes data and populate the table rows
    $.each(cause_data, function (index, cause) {
      var row =
        "<tr> <td>" +
        cause.randomId +
        "</td> <td>" +
        cause.title +
        "</td> <td>" +
        cause.cat +
        "</td><td><button class='btn btn-danger p-2 delete'>Delete Cause </button></td></tr>";
      table.append(row);
    });

    $("#causes-sign-table").on("click", ".delete", function () {
      // Get the index of the row that was clicked
      var rowIndex = $(this).closest("tr").index();
      rowIndex = rowIndex - 1;
      // Get the cause data for that row
      cause_data.splice(rowIndex, 1);
      localStorage.setItem("causes_data", JSON.stringify(cause_data));
      // Redirect to the details page
      window.location.replace("dashboard.html");
    });

    // Attach a click event listener to the button
    $('#Delete_local_storage').on('click', function() {
    // Clear the local storage
    localStorage.clear();
    alert("Local Storage has been Revoked !");
    window.location.replace("signup.html");
  });


  }

  if ($("body").hasClass("single-cause")) {
    $('#whatsapp-share').click(function() {
      var text = 'Check out this page: ' + encodeURIComponent(window.location.href);
      var url = 'https://web.whatsapp.com//send?text=' + text;
      window.open(url, '_blank');
    });
  
    // Share on Facebook
    $('#facebook-share').click(function() {
      var url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
      window.open(url, '_blank');
    });
    var user = localStorage.getItem("logged_user");
    user = user.replace(/"/g, "").toUpperCase();

    $("#username").text(user);
    var currentstring = localStorage.getItem("current_cause");
    var currentdata = JSON.parse(currentstring) || [];

    var Id = null;
    var count = null;
    var title = null;
    var desc = null;
    var cat = null;
    var names = [];

    for (var i = 0; i < cause_data.length; i++) {
      if (cause_data[i].randomId === currentdata.randomId) {
        Id = cause_data[i].randomId;
        count = cause_data[i].total_sigantures;
        title = cause_data[i].title;
        desc = cause_data[i].desc;
        cat = cause_data[i].cat;
        names = cause_data[i].names;
      }
    }

    $.each(names, function (index, name) {
      name = name.replace(/"/g, "").toUpperCase();
      var li = $("<li>").text(name);
      $("#names_").append(li);
    });

    $("#cause_id").val(Id);
    $("#count").text(count);
    $("#title").val(title);
    $("#desc").val(desc);
    $("#cat").val(cat);

    $("#sign-form-btn").click(function () {
      for (var i = 0; i < cause_data.length; i++) {
        if (cause_data[i].randomId === currentdata.randomId) {
          cause_data[i].total_sigantures = cause_data[i].total_sigantures + 1;
          var isready_signed = 0;
          for (var j = 0; j < cause_data[i].names.length; j++) {
            if (cause_data[i].names[j] === user) {
              alert("You have Already Signed the Cause !");
              isready_signed = 1;
              break;
            }
          }

          if (!isready_signed) {
            cause_data[i].names.push(user);
            alert(
              "You have Successfully Signed the Cause Navigate to View Causes for Stats !"
            );

            localStorage.setItem("causes_data", JSON.stringify(cause_data));
            window.location.replace("sign_causes.html");
          }
        }
      }
    });
  }

  if ($("body").hasClass("index-home-body")) {
    var user = localStorage.getItem("logged_user");
    user = user.replace(/"/g, "").toUpperCase();
    $("#username").text(user);
  }


  
});
