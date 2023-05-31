import React, { Component } from "react";
import rep from './rep.jpg'
export class Newsitem extends Component {
  render() {
    let { title, Description, urltonews, imageurl, author, time,source } = this.props;
    return (
      <div>
        <div className="card">
          <span className="position-absolute translate-middle badge rounded-pill bg-danger" style={{left:'88%',bottom:'95%',zIndex:1}}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={imageurl?imageurl:rep} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{Description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} -{" "}
                {new Date(time).toGMTString()}
              </small>
            </p>
            <a
              href={urltonews}
              target="_target"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
