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
    const res2 = fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=cff1cc49cb2f40ab97411b04432fcb72&q=${this.text.value}&begin_date=19990101`);
    
    Promise.all([res, res2])
    .then(data => {return Promise.all(data.map(r => r.json()));})
    .then(data => this.setState({articles: data[0].response, nytArticles: data[1].response.meta}));

    //res.then(function(result) {return result.json()}).then(res => this.setState({ articles: res.response }));
    //res2.then(function(result) {return result.json()}).then(res2 => this.setState({ nytArticles: res2 }));
  }

  render() {
    console.log(this.state.articles);
    console.log(this.state.nytArticles);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mentions of your search term:</h1>
          The Guardian: {this.state.articles.total} , The New York Times: {this.state.nytArticles.hits} 
        </header>
        <input type="text" ref={(input) => this.text=input}></input>
        <button onClick={this.submit}>Search</button>
      </div>
    );
  }
}

export default ArticlesList;
