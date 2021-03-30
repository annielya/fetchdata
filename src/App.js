import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      menu: [],
      detail: [],
      selected: []
    }
  }

  componentDidMount(){
    axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/category`)
      .then(res => {
        const menus = res.data;
        this.setState({menu: menus})
      })
    axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/item`)
      .then(res => {
        const details = res.data;
        this.setState({detail: details})
      })
  }

  displayDetails(short_name){
    let selectedCategory = this.state.detail.filter(item => item.short_name.startsWith(short_name));
    this.setState({selected: selectedCategory})
  }

  renderlist =()=> {
    return(
      this.state.menu.map(category => {
        return (
          <li key={category.id}
              onClick={()=>this.displayDetails(category.short_name)}>{category.name}-{category.short_name}
          </li>
        )
      })
    )
  }

  renderdetails =() => {
    return(
      this.state.selected.map(category => {
        return (
          <tr key={category.id}>
            <td style={{width: "200px", textAlign:"center"}}>{category.name}</td>
            <td style={{width: "500px", textAlign:"center"}}>{category.description}</td>
          </tr>
        )
      })
    )
  }

  render(){
    return (
      <div>
        <ul>
          {this.renderlist()}
        </ul>
        <ul>
          <thead>
            <tr>
              <th style={{width: "200px", textAlign:"center"}}>Name</th>
              <th style={{width: "500px", textAlign:"center"}}>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.renderdetails()}
          </tbody>
        </ul>
      </div>

    )
  }
}
export default App;
