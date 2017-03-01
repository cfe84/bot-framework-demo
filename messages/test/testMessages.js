var assert = require("assert");
var should = require("should");

var processor = require("../messages");

testMessage = (text, matchResponse = null) => {
  var response = processor.process({text});
  response.respond.should.equal(matchResponse !== null);
  if (matchResponse !== null) {
    if (Object.prototype.toString.call( matchResponse ) === '[object Array]')
      matchResponse.should.containEql(response.text);
    else
      response.text.should.match(matchResponse);
  }
}

describe("Message processing", () => {

    it("Shouldn't react to triviality", () => {
        testMessage("Hello, how are you?");
    });

    it("Should react to EA", () => {
        testMessage("At EA stuff is screwed up", processor.quotes.generalitiesAboutEa);
    });
});