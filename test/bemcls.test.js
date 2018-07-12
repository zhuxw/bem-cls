var bemcls = require('../index');
var expect = require('chai').expect;

describe('bem-cls', function(){
  var c = bemcls('myclsname');

  it('test1', function(){
    expect(c()).to.equal('myclsname');
    expect(c.block.toString()).to.equal('myclsname');
  });

  it('test2', function(){
    expect(c('btn')).to.equal('myclsname__btn');
    expect(c('btn', 'header', 'footer')).to.equal('myclsname__btn myclsname__header myclsname__footer');
    expect(c('')).to.equal('');
    expect(c(false)).to.equal('');
    expect(c(null)).to.equal('');
    expect(c(undefined)).to.equal('');
    expect(c('btn', false, 'header')).to.equal('myclsname__btn myclsname__header');
    expect(c('btn', 'header', 'btn')).to.equal('myclsname__btn myclsname__header');
  });

  it('test3', function(){
    expect(c.exact('btn').toString()).to.equal('btn');
    expect(c.exact(c.block).toString()).to.equal('myclsname');
    expect(c.exact(c.block, 'btn').toString()).to.equal('myclsname btn');
    expect(c(c.block, c.exact('btn'))).to.equal('myclsname btn');
  });

  it('test4', function(){
    expect(c({
      btn: true,
      tab: false,
      content: 1,
      header: undefined,
      footer: null
    })).to.equal('myclsname__btn myclsname__content');

    expect(c('btn', {
      header: true,
      content: false,
    })).to.equal('myclsname__btn myclsname__header');

    expect(c(['btn', 'header'])).to.equal('myclsname__btn myclsname__header');
    expect(c('btn', ['header', 'footer'])).to.equal('myclsname__btn myclsname__header myclsname__footer');
    expect(c('btn', ['header', {footer: true}])).to.equal('myclsname__btn myclsname__header myclsname__footer');
    expect(c('btn', ['header', {footer: true}, []])).to.equal('myclsname__btn myclsname__header myclsname__footer');

    expect(c({
      '': true,
    })).to.equal('');

    expect(c({
      '': false,
    })).to.equal('');
  });


});
