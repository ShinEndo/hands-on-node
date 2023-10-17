const sinon = require('sinon');

sinon.spy(console, 'log');

console.log('foo');

sinon.assert.calledWith(console.log, 'foo');

sinon.assert.calledOnce(console.log);

sinon.assert.calledWith(console.log, 'bar');

sinon.assert.calledTwice(console.log);

const spy = sinon.spy();

setTimeout(spy, 0);

sinon.assert.calledOnce(spy);

sinon.stub(String.prototype, 'startsWith').returns(true);

'foo'.startsWith('f');

'foo'.startsWith('x');

sinon.assert.calledWith(String.prototype.startsWith, 'f');

sinon.assert.calledWith(String.prototype.startsWith);

sinon.assert.calledWith(String.prototype.startsWith, 'y');

sinon.assert.calledOnce(String.prototype.startsWith);

sinon.stub(String.prototype, 'endsWith');

'foo'.endsWith('o');

const mock = sinon
	.mock(JSON)
	.expects('parse')
	.withExactArgs('{"foo": 1}')
	.atLeast(1)
	.atMost(2)
	.returns({});

mock.verify();

JSON.parse('{"foo": 1}');

mock.verify();

JSON.parse('{"bar": 1}');

JSON.parse('{"foo": 1}');

sinon.restore();
