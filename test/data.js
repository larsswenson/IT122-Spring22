import { expect } from "chai";
import * as guitar from "../data.js";

describe("guitar", function() {

    it("returns requested guitar", function() {
        let result = guitar.getItem("telecaster");
        expect(result).to.deep.equal({model: "telecaster", make: "fender", type: "electric solid body", year: 1954});
    });

    it("fails invalid guitar request", function() {
        let result = guitar.getItem("invalid");
        expect(result).to.be.undefined;
    });

    it("adds new guitar", function() {
        let result = guitar.addItem({model: "starfire", make: "guild", type: "electric semi-hollow body", year: 1960});
        expect(result.added).to.be.true;
    });
    it("fails adding listed guitar", function() {
        let result = guitar.addItem({model: "les paul", make: "gibson", type: "electric solid archtop", year: 1952});
        expect(result.added).to.be.false;
    });

    it("deletes listed guitar", function() {
        let result = guitar.deleteItem("phantom");
        expect(result.deleted).to.be.true;
    });
    it("fails deleting invalid guitar", function() {
        let result = guitar.deleteItem("danelectro");
        expect(result.deleted).to.be.false;
    });

});
