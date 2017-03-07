var assert = require("assert");
var should = require("should");

var processor = require("../messages");

testMessage = (text, matchResponse = null) => {
  var response = processor.answer({text});
  response.respond.should.equal(matchResponse !== null);
  if (matchResponse !== null) {
    if (Object.prototype.toString.call( matchResponse ) === '[object Array]')
      matchResponse.should.containEql(response.text);
    else
      response.text.should.match(matchResponse);
  }
}

describe("Set prob", () => {
  it("Should set chance", () => {
    var response = processor.process({text: "set chance to 39%"});
    response.respond.should.be.true();
    response.text.should.equal("Ok, I\'ll reply with a chance of 0.39");
  });
});

describe("Message processing", () => {

  it("Shouldn't react to triviality", () => {
      ["Hello, how are you?"].forEach((message) => testMessage(message));
  });

  it("Should react to company", () => {
    ["Do you like the company?", "At Builddirect stuff is screwed up", "Build Direct", "builddirect", 'BD', "bd"].forEach((message) =>
      testMessage(message, processor.quotes.generalitiesAboutCompany));
  });

  it("Should react to Unit tests", () => {
    ["I don't like unit tests", "Did you write unit tests?", "I'm on this Unit Test"].forEach((message) =>
      testMessage(message, processor.quotes.unitTests));
  });

  it("Should be apologetic", () => {
    ["The build is broken", "It doesn't work", "It's not working", "The build failed.", "Some tests are failing"].forEach((message) =>
      testMessage(message, processor.quotes.notWorking));
  });

  it("Should be saying it tried", () => {
    ["I've tried everything", "Did you try this thing"].forEach((message) =>
      testMessage(message, processor.quotes.tried));
  });

  it("Should insult you when it's down", () =>
    ["1.amazonaws.com/estimation-service:latest Failure after 1 min 42 sec (Open)","1.amazonaws.com/estimation-service:latest Still Failing after 3 min 54 sec (Open)", "The website is slow.", "The site is down!"].forEach((message) => testMessage(message, processor.quotes.isDown))
  );

  it("Should tell you it was fixing it", () =>
    ["service:latest Back to normal after 1 hr 53 min (Open)"].forEach((message) => testMessage(message, processor.quotes.IwasFixingIt))
  );

  it("Should tell you there's no volume", () =>
    ["The website has a high throughput.", "The site is high volume!"].forEach((message) => testMessage(message, processor.quotes.volume))
  );
  
  it("Should tell you we don't have microservices", () =>
    ["You should create a new microservice.", "We have tons of microservices and stuff!"].forEach((message) => testMessage(message, processor.quotes.microservices))
  );

  it("Should tell you PRs are evil", () =>
    ["I created a PR", "I assigned the pull request to you."].forEach((message) => testMessage(message, processor.quotes.pullRequests))
  );

  it("Should bitch about standups", () =>
    ["Reminder: do standup"].forEach((message) => testMessage(message, processor.quotes.standup))
  );

});