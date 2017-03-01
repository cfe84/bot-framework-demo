var pick = (array) => array[Math.floor(Math.random() * array.length)];

var weTriedIt = (something) =>
  [ `We tried ${something} at EA, it doesn't work`, `${something} are useless`, `I don't believe in ${something}`, `${something} sucks`]

var quotes = {
  generalitiesAboutEa: ["EA is awesome", "At EA everything was cool", "We actually understood what we were doing at EA", "This place is beneath me"],
  unitTests: weTriedIt("unit tests").concat(["Developers shouldn't write unit tests"]),
  AWS: weTriedIt("AWS"),
  tried: ["We tried it at EA", "I know how it works"],
  notWorking: ["It's not my fault", "I didn't break it", "It works on my machine", "It's not me it's you", "They forced me to do it this way"],
  isDown: ["You should make it more resilient", "At EA this wouldn't have happened"],
  volume: ["BD doesn't have any volume.", "You should have seen at EA, we had BILLIONS of events"],
  microservices: ["Oh great, we're building a distributed monolith.", "At EA we had a monolith and it was great", "That's not how you do a microservice."],
  pullRequests: weTriedIt("pull requests").concat(["I don't believe in pull requests", "You should merge directly to master"])
};

var process = function(message){
  response = {
    respond: false,
    text: ""
  };

  setResponse = (array) =>
  {
    response.respond = true;
    response.text = pick(array);
  }

  switch (true)
  {
    case /\bEA\b/.test(message.text):
    case /electronic art/i.test(message.text):
      setResponse(quotes.generalitiesAboutEa);
      break;
    case /unit test/i.test(message.text):
      setResponse(quotes.unitTests);
      break;
    case /not working/.test(message.text):
    case /doesn\'t work/.test(message.text):
    case /\bfail/.test(message.text):
    case /\bbroken\b/.test(message.text):
      setResponse(quotes.notWorking);
      break;
    case /\btry\b/i.test(message.text):
    case /\btried\b/i.test(message.text):
      setResponse(quotes.tried);
      break;
    case /\bslow\b/i.test(message.text):
    case /\bis down\b/i.test(message.text):
      setResponse(quotes.isDown);
      break;
    case /\bthroughput\b/i.test(message.text):
    case /\bvolume\b/i.test(message.text):
      setResponse(quotes.volume);
      break;
    case /\bmicro[\b]?service[s]?\b/i.test(message.text):
      setResponse(quotes.microservices);
      break;
    case /\bPR\b/.test(message.text):
    case /\bpull[ -]?request/i.test(message.text):
      setResponse(quotes.pullRequests);
      break;
  }

  return response;
};

module.exports = {
  process,
  quotes
};
