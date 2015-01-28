var Store = require('../src/js/stores/Store');
describe("myFunction", function() {
 
    beforeEach(function(){
        Store.setText('test');
    });
 
    afterEach(function() {
        
    });
 
    it("should count character freq", function() {
        Store.setText('aaaabbcc')
        expect(Store.freq).toEqual({
            "a": 4,
            "b": 2,
            "c": 2
        });
    });
 
    it("should count words freq", function(){
        Store.freqBy = 'words';
        Store.setText('ok ok omg omg omg work')
        expect(Store.freq).toEqual({
            "ok": 2,
            "omg": 3,
            "work": 1
        });
    });
});