import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, info } = props;
    return (
        <div className='ok' my-3="true">
            <span className="badge text-bg-danger">{info}</span>
            <div className="card">
                <img src={imageUrl ? imageUrl : 'https://static.toiimg.com/thumb/msid-47529300,width-1070,height-580,imgsize-110164,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text "><small className="text-success">By {author} on {new Date(date).toGMTString().slice(0, 30)}</small></p>
                    <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more...</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem