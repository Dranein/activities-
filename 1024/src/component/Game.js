import React from 'react';

class Game extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      list: [
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [4, 2, 0, 0],
        [2, 2, 4, 8]
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
                  <div key={'c' + indexC} className='game_col'>{itemC}</div>
                ))
              }
            </div>
          ))
        }
      </div>
      <div className='btn_ground'>
        <div onClick={this.handleLeft.bind(this)}>左</div>
        <div onClick={this.handleRight.bind(this)}>右</div>
      </div>
    </div>;
  }

  handleLeft() {
    let list = this.add(this.state.list);
    this.setState({
      list
    })
  }

  handleRight() {
    let {list} = this.state;
    list.map(item => {
      item = item.reverse();
    })
    list = this.add(list);

    this.setState({
      list
    })
  }

  add(list) {
    let arr = list;
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr[i] = [];
      let arrCutZero = arr[i].filter(item => item !== 0);
      for (let k = 0; k < arrCutZero.length; k++) {
        if (arrCutZero[k + 1] && arrCutZero[k + 1] === arrCutZero[k]) {
          newArr[i][k] = arrCutZero[k] * 2;
          arrCutZero[k] = 0;
          arrCutZero[k + 1] = 0;
        } else {
          newArr[i][k] = arrCutZero[k];
        }
      }
      newArr[i] = newArr[i].filter(item => item !== 0);
      let num = list[0].length - newArr[i].length;
      if (num > 0) {
        newArr[i].splice(newArr[i].length, 0, ...Array(num).fill(0));
      }
    }
    console.log(newArr)
    return newArr;
  }


}

export default Game;
