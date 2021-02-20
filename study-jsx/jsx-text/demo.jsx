/* @jsx h */

// 执行 babel --plugins transform-react-jsx demo.jsx

// var profile = (
//   <div>
//     <img src='avatar.pgn' className='profile' />
//     <h3>{[user.firstName, user.lastName].join(' ')}</h3>
//   </div>
// )

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

// ;<ul>
//   {list.map((item, index) => {
//     return <li key={index}>{item}</li>
//   })}
// </ul>

import List from './list'
import Input from './input'
function render() {
  return (
    <div>
      <p>this is demo</p>
      <Input addTitle={this.addTitle.bind(this)} />
      <List data={this.state.list} />
    </div>
  )
}
