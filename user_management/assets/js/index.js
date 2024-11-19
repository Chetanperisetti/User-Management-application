$("#add_user").submit(function(event){
    event.preventDefault(); // Prevent form from submitting automatically

    // Collect input values
    const name = $("input[name='name']").val().trim();
    const email = $("input[name='email']").val().trim();
    const gender = $("input[name='gender']:checked").val();
    const status = $("input[name='status']:checked").val();

    // Check for required fields
    if (!name || !email || !gender || !status) {
        alert("All fields are required! Please fill out the form completely.");
        return; // Stop further execution
    }

    // If validation passes, submit the form
    $.ajax({
        url: "/api/users",
        method: "POST",
        data: {
            name: name,
            email: email,
            gender: gender,
            status: status
        },
        success: function(response) {
            alert("Data inserted Successfully!");
            window.location.href = "/"; // Redirect to the homepage or another page
        },
        error: function(err) {
            alert("An error occurred while inserting data.");
        }
    });
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data={}

    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
    })
    console.log(data);

    var request={
        "url": "http://localhost:3000/api/users/" + data.id,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully")
    })
})

if (window.location.pathname === "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id");

        var request = {
            "url": `http://localhost:3000/api/users/${id}`, // Use backticks for URL
            "method": "DELETE"
        };

        if (confirm("Do you want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully");
                location.reload();
            });
        }
    });
}