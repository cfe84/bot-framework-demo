var pick = (array) => array[Math.floor(Math.random() * array.length)];

var weTriedIt = (something) =>
  [ `We tried ${something} at EA, it doesn't work`, `${something} are useless`, `I don't believe in ${something}` ]

var quotes = {
  generalitiesAboutEa: ["EA is awesome", "At EA everything was cool", "We actually understood what we were doing at EA"],
  unitTests: weTriedIt("unit tests").concat(["Developers shouldn't write unit tests"])
};

var process = function(message){
  response = {
    respond: false,
    text: ""
  };

  switch (true)
  {
    case /\bEA\b/.test(message.text):
    case /\belectronic arts\b/i.test(message.text):
      response.respond = true;
      response.text = pick(quotes.generalitiesAboutEa);
      break;
    case /\bunit test\b/i.test(message.text):
      response.respond = true;
      response.text = pick();
      break;
  }

  return response;
};

module.exports = {
  process,
  quotes
};
