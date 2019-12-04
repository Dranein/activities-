import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [4, 2, 0, 0],
        [0, 2, 2, 0]
      ]
    }
  }

  render() {
    let {list} = this.state;
    return <div className='wrapper'>
      <div className='game_content'>
        {
          list.map((item, index) => (
            <div key={index} className='game_row'>
              {
                item.map((itemC, indexC) => (
                  <div key={'c'+indexC} className='game_col'>{itemC}</div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>;
  }
}

export default Game;
