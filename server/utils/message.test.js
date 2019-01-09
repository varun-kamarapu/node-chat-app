const expect = require('expect');
const {generateMessage} = require('./message');

describe('Generate Message', () => {

    it('Should generate correct message', () => {
      var from = 'Varun';
      var text = 'Hru doing?';
      var res = generateMessage(from, text);

      expect(res.createdAt).toBeA('number');
      expect(res).toInclude({from, text});
    });
});
