// notId is the id of the note to be deleted
function deleteNote(noteId) { // noteId is the id of the note to be deleted
    fetch("/delete-note", {// fetch is a function that requests data from the server 
      method: "POST",// POST is the HTTP method that we use to send data to the server
      body: JSON.stringify({ noteId: noteId }),// JSON.stringify converts a JavaScript object or value to a JSON string
    }).then((_res) => {// _res is the response from the server
      window.location.href = "/";// redirect to the homepage
    });
  }
