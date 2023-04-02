import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // document.title = `${capitalizeFirstLetter(props.category)} - NewsBulletin`;


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews = async () => {

        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c5592599de148d1beceb47f5d1378e1&Page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        console.log(data);
        let parsedData = await data.json();
        setLoading(false);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)

        props.setProgress(100);

    }


    // const previous = () => {
    //     setPage(page - 1);
    //     updateNews();
    // }

    // const next = () => {
    //     setPage(page + 1);
    //     updateNews();
    // }

    useEffect(() => {
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3c5592599de148d1beceb47f5d1378e1&Page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        console.log(data);
        let parsedData = await data.json();
        setLoading(false);
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }

    return (
        <div className='container' my-3="true">
            <div className="text-center"><h1>NewsBulletin - Top  {capitalizeFirstLetter(props.category)} Headlines</h1></div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                loader={<Spinner />}
                hasMore={articles.length !== totalResults}
            >
                <div className="container">

                    <div className="row">

                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : 'Anonymous'} date={element.publishedAt} info={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
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
