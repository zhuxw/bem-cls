# bem-cls

An easy-to-use BEM class name generator.

# Install

```
npm i -S bem-cls
```

# Usage

```js
var bemcls = require('bem-cls');

var c = bemcls('myblock');

c(); // myblock

c.block; // myblock

c('btn'); // myblock__btn

c('btn', 'required'); // myblock__btn myblock__required

c('btn', false); // myblock__btn

c({ btn: true, required: false }); // myblock__btn

c(['btn', {required: true}]); // myblock__btn myblock__required

c(c.exact('exact-name'), 'btn'); // exact-name myblock__btn

c.exact('exact-name', c.block); // exact-name myblock

```

## Use in React
```js
import bemcls from 'bem-cls';

const c = bemcls('my-comp');

class MyComp extends React.Component {
    render() {
        const { className, hasFooter, contentCollapsed } = this.props;

        return (
            <div className={c.exact(c.block, className)}>
                <div className={c('header')}/>
                <div className={c('content', { 'content-collapsed': contentCollapsed })}/>
                <div className={c(hasFooter && 'footer')}/>
            </div>
        );
    }
}

```
