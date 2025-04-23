import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Card = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('https://www.reddit.com/r/reactjs.json');
        setData(res?.data?.data?.children);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container my-4 card-wrapper">
      <h1 className="text-center mb-4">Reddit Posts</h1>
      <div className="row">
        {data &&
          data.map((i, index) => {
            const post = i.data;
            return (
              <div className="col-md-4 mb-4" key={post.id || index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text text-truncate">{post.selftext || 'No description added.'}</p>
                    <a
                      href={`https://reddit.com${post.permalink}`}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Post
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Card;
