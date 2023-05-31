import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchRes from "./SearchRes";
const MainNews = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState();
  const [page, setpage] = useState(1);
  const [total, setTotal] = useState(0);
  const [forspiner, setSpiner] = useState(true);
  const [searchhand,setsearchhand] = useState(false);
  const update = async () => {
    props.setprogress(10);
    let url = "";
    if (props.typeofnews === "everything" && props.search == null) {
      url = `https://newsapi.org/v2/everything?q=apple&from=2023-05-26&to=2023-05-26&sortBy=popularity&pageSize=${props.pageSize}&apiKey=b8349d88f6ba4c26940927e94654898b&page=${page}`;
    } else if (props.search != null){
      url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${props.pageSize}&category=${props.category}&apiKey=b8349d88f6ba4c26940927e94654898b&lang=en&page=${page}&q=${props.search}`;
      if(total != 0){
      setsearchhand(true);}
      }
    else{
      url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${props.pageSize}&category=${props.category}&apiKey=b8349d88f6ba4c26940927e94654898b&lang=en&page=${page}`;
    }
    document.title = `MonkeyNews  - ${props.category === ""?props.category:capitalize(props.category)}`;
    setLoading(true);
    let data = await fetch(url);
    props.setprogress(20);
    let parsed = await data.json();
    props.setprogress(50);
    setarticles(parsed.articles);
    setTotal(parsed.totalResults);
    setLoading(false);
    props.setprogress(100);
  };
  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };
  useEffect(() => {
    update();
  }, [props.search]);
  const fetchMoreData = async () => {
    setpage(page + 1);
    let url = "";
    if (props.typeofnews === "everything" && props.search == null) {
      url = `https://newsapi.org/v2/everything?q=apple&from=2023-05-26&to=2023-05-26&sortBy=popularity&pageSize=${props.pageSize}&apiKey=b8349d88f6ba4c26940927e94654898b&page=${page}`;
    } else if (props.search != null){
      url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${props.pageSize}&category=${props.category}&apiKey=b8349d88f6ba4c26940927e94654898b&lang=en&page=${page}&q=${props.search}`;
    }
    else{
      url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${props.pageSize}&category=${props.category}&apiKey=b8349d88f6ba4c26940927e94654898b&lang=en&page=${page}`;
    }
    setLoading(true);
    let data = await fetch(url);
    let parsed = await data.json();
    setarticles(articles.concat(parsed.articles));
    setTotal(parsed.totalResults);
    setLoading(false);
    if (articles.length != total) {
      setSpiner(false);
    }
  };
  return (
    <>
      <h1 className="text-center" style={{ margin: "80px 0px 20px" }}>
        NewsMonkey -{" "}
        {props.typeofnews === "everything"
          ? "Top News of Every Sector"
          : props.typeofnews === "top-headlines"
          ? "Top Headlines"
          : `Top ${props.typeofnews === ""?props.typeofnews:capitalize(props.typeofnews)} Stories`}
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length != total}
        loader={<Spiner status={forspiner} />}
      >
        <div className="container">
          <div className="row">
            {total && articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title}
                    Description={element.description}
                    urltonews={element.url}
                    imageurl={element.urlToImage}
                    author={element.author}
                    time={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
            {searchhand && <SearchRes/>}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

MainNews.defaultProps = {
  category: "general",
  pageSize: 8,
  typeofnews: "",
};
MainNews.propTypes = {
  category: PropTypes.string,
  pageSize: PropTypes.number,
  typeofnews: PropTypes.string,
};

export default MainNews;
