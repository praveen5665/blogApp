import React from 'react'

const Post = () => {
  return (
    <div className="post">
          <div className="image">
            <img
              src="https://ischoolonline.berkeley.edu/wp-content/uploads/sites/37/2021/01/4430_whatismachinelearning_hero.jpg"
              alt="Machiner learning Image"
            />
          </div>
          <div className="texts">
            <h2>What Is Machine Learning? Definition, Types, Applications.</h2>
            <div className="info">
            <div className="author">Praveen Kumar</div>
              <time>2025-02-13 21:38</time>
            </div>
            <div className="summary">
              Machine learning (ML) is defined as a discipline of artificial
              intelligence (AI) that provides machines the ability to
              automatically learn from data...
            </div>
          </div>
        </div>
  )
}

export default Post