import React from 'react';
import ReactDom from 'react-dom';
import './static/css/reset.css';
import './static/css/index.scss';

import Game from "./component/Game";

ReactDom.render(<div>
  <Game/>
</div>, document.getElementById('root'));
