import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class ArticlesList extends Component {
  
  state = {
    articles: [],
    nytArticles: []
  }

 submit = () => {
  console.log(this.text.value)  
    const res = fetch(`https://content.guardianapis.com/search?api-key=d1358fca-f887-48cc-a9d8-5dee7e0ff85a&q=${this.text.value}&section=world`);
    const res2 = fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cff1cc49cb2f40ab97411b04432fcb72&q=${this.text.value}`);
    
    res.then(function(result) {return result.json()}).then(res => this.setState({ articles: res.response }));
    res2.then(function(result) {return result.json()}).then(res2 => this.setState({ nytArticles: res2 }));
    
    //res2.then(function(result) {return result.json()}).then((function(data) {console.log(data.response);}));

  }
  /*  
  async componentDidMount(){
    try{
      const res = await fetch('https://content.guardianapis.com/search?api-key=d1358fca-f887-48cc-a9d8-5dee7e0ff85a&q=egypt&section=world');
      const articles = await res.json();
      console.log("Lol");
      console.log(articles.response.total);
      console.log(articles);  

      this.setState({
        articles: articles.response
      })

    } catch(e){
      console.log(e);
    }
  }
  */

  render() {
    console.log(this.state.articles);
    console.log(this.state.nytArticles);
    console.log("Shuuu");
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mentions of your search term:</h1>
          The Guardian: {this.state.articles.total}, The New York Times:
        </header>
        <input type="text" ref={(input) => this.text=input}></input>
        <button onClick={this.submit}>Search</button>
      </div>
    );
  }
}

export default ArticlesList;
