var profile = (
  <div>
    <img src='avatar.pgn' className='profile' />
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
  </div>
)

// 执行 babel --plugins transform-react-jsx demo.jsx

// class Input extends Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     return (
//       <div>
//         <input
//           value={this.state.title}
//           onChange={this.changeHandle.bind(this)}
//         />
//         <button onClick={this.clickHandle.bind(this)}>submit</button>
//       </div>
//     )
//   }
// }
