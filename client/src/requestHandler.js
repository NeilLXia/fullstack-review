var Parse = {
  serverURL: '/repos',

  updateDatabase: (username, successCB = () => {}, errorCB = null) => {
    $.ajax({
      url: Parse.serverURL,
      type: 'POST',
      data: JSON.stringify({username}),
      contentType: 'application/json',
      success: data => successCB(data),
      error: errorCB
    });
  },

  pullRepos: (successCB = () => {}, errorCB = null) => {
    $.ajax({
      url: Parse.serverURL,
      type: 'GET',
      success: data => successCB(data),
      error: errorCB
    });
  }
};

export default Parse