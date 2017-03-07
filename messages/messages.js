var pick = (array) => array[Math.floor(Math.random() * array.length)];

var weTriedIt = (something) =>
  [ `We tried ${something} at my former company, it doesn't work`, `I know how ${something} works: it doesn't really work`, `${something} is useless`, `I don't believe in ${something}`, `${something} sucks`]

var names = ["@ardy", "@anthony", "@graham", "@bessie", "@robblovell", "@charles"];

var quotes = {
  generalitiesAboutCompany: ["my former company is awesome", "At my former company everything was cool", "We actually understood what we were doing at my former company", "This place is beneath me"],
  unitTests: weTriedIt("unit testing").concat(["Developers shouldn't write unit tests"]),
  AWS: weTriedIt("AWS"),
  standup: weTriedIt("standup"),
  tried: weTriedIt("this"),
  notWorking: ["It's not my fault", `It's ${pick(names)}'s fault.`,  `I blame ${pick(names)}. He told me to do it this way.`,  "I didn't break it", "It works on my machine", "It's not me it's you", "They forced me to do it this way"],
  isDown: ["You should make it more resilient", "At my former company this wouldn't have happened"],
  volume: ["BD doesn't have any volume.", "You should have seen at my former company, we had BILLIONS of events"],
  microservices: ["Oh great, we're building a distributed monolith.", "At my former company we had a monolith and it was great", "That's not how you do a microservice."],
  pullRequests: weTriedIt("pull requests").concat(["I don't believe in pull requests", "You should merge directly to master"]),
  IwasFixingIt: ["Oh no, I was fixing it! All this work for nothing", "I would have fixed it faster if you told me"]
};

var answer = function(message){
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
    case /\bcompany\b/i.test(message.text):
    case /\bBD\b/i.test(message.text):
    case /build[ ]?direct/i.test(message.text):
      setResponse(quotes.generalitiesAboutCompany);
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
    case /Still Failing/.test(message.text):
    case /Failure after/.test(message.text):
    case /\b403\b/i.test(message.text):
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
    case /Back to normal after/.test(message.text):
      setResponse(quotes.IwasFixingIt);
      break;
    case /standup/i.test(message.text):
      setResponse(quotes.standup);
      break;
  }

  return response;
};

var rand = 0.5;

var process = (message) =>
{
  var prob = /set chance to ([0-9]+)/i;
  if (prob.test(message.text)) {
    rand = prob.exec(message.text)[1] / 100;
    return {
      respond: true,
      text: `Ok, I'll reply with a chance of ${rand}`
    };
  }
  else
    return answer(message);
};

module.exports = {
  answer,
  process,
  quotes
};
