import React from 'react'
import { connect } from 'react-redux'
import Game from './Game'
import { loadCards } from '../actions/loadCards'

const initialState = {
  // cardsInOrder: [1,2,3,4],
  hideCards: false,
  win: false,
  lose: false,
  clickedCards: [],
  isEnabled: false
}

class GameContainer extends React.Component {
  state = {
    hideCards: false,
    win: false,
    lose: false,
    clickedCards: []
  }

  componentDidMount() {
    this.flipCards();
  }

  flipCards() {
    setTimeout(() => {
      const cardsInOrder = [...this.props.cards].sort()
      this.setState({
        hideCards: true,
        cardsInOrder: cardsInOrder,
        isEnabled: true
      })
    }, 3000)
  }

  handleClick = event => {
    console.log(this.state.cardsInOrder)
    this.setState({
      clickedCards: [...this.state.clickedCards, event]
     });
    if (this.state.cardsInOrder.length > 0) {
      const firstCard = this.state.cardsInOrder.shift()
      if (firstCard === event && this.state.cardsInOrder.length > 0) {
        return null
      } else if (firstCard === event && this.state.cardsInOrder.length === 0) {
        this.setState({
          hideCards: false,
          win: true
        })
      } else {
        this.setState({
          hideCards: false,
          lose: true
        })
      }
    } else {
      alert('this shouldnt happen, i dont know whats going on here, im sorry')
    }
  }

  levelUp = () => {
    this.props.loadCards(this.props.difficulty + 4)
  }

  playAgain = () => {
    this.setState({
      state: initialState
    })
    this.props.loadCards(this.props.difficulty)
    this.componentDidMount()
  }

  render() {
    return (
      <Game
        cards={this.props.cards}
        hideCards={this.state.hideCards}
        clickedCards={this.state.clickedCards}
        handleClick={this.handleClick}
        lose={this.state.lose}
        win={this.state.win}
        levelUp={this.levelUp}
        playAgain={this.playAgain}
        isEnabled={this.state.isEnabled}
      />
    )
  }
}

const mapStateToProps = state => ({
  cards: state.cards,
  difficulty: state.difficulty
})

export default connect(
  mapStateToProps
  ,   {loadCards}
)(GameContainer)
