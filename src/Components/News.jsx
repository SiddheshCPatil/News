import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';

export class News extends Component {

    constructor() {
        super();
        console.log("Hello I am a Constructor!");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c5592599de148d1beceb47f5d1378e1&Page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        console.log(data);
        let parsedData = await data.json();
        this.setState({ loading: false });
        console.log(parsedData);
        this.setState(
            {
                 articles: parsedData.articles,
                 totalResults:parsedData.totalResults, 
                 loading:false
                })
    }

    async componentDidMount() {
        this.updateNews();
    }
 

    prevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();


    }

    nextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }


    render() {
        return (
            <div className='container' my-3="true">
                <div className="text-center"><h1>NewsBulletin-Top Headlines</h1></div>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : 'Anonymous'} date={element.publishedAt} info={element.source.name} />
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prevClick} >&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.nextClick} >Next &raquo;</button>
                </div>
            </div>
        )
    }
}

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}

News.defaultProps = {
    pageSize: 5,
    country: 'in',
    category: 'general'
}

export default News
