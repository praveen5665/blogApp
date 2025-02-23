import React from 'react'
import { formatISO9075 } from 'date-fns';
import {Link} from 'react-router-dom'

const Post = ({_id, title, summary, cover, content, createdAt,author}) => {
  return (
    <div className="post">
      <Link to={`/post/${_id}`}>
      <div className="image">
            {cover ? (
              <img src={'http://localhost:4000/'+cover} alt="Post Cover" />
            ) : (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '200px', 
                backgroundColor: '#f0f0f0', 
              }}>{title}</div>
            )}
          </div>  
      </Link>
          <div className="texts">
            <Link to={`/post/${_id}`}>
              <h2>{title}</h2>
            </Link>
            <div className="info">
            <div className="author">{author ? author.username : 'Unknown Author'}</div>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </div>
            <div className="summary">
              {summary}
            </div>
          </div>
        </div>
  )
}

export default Post