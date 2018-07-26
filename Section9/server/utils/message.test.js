var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    var from = 'Jen';
    var text = 'test';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude(from, text);
});