var process = function(message){
  response = {
    respond: true,
    text: `You said ${message.text}`
  };

  return response;
};

module.exports = {
    process: process
};
