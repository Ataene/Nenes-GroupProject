import React, {useState} from 'react'

export const Add = () => {
    const [query, setQuery] = useState("");

    const onChange = (e) => {
        e.preventDefault();

        setQuery(e.target.value);
    }

  return (
      <div className="add-page">
          <div className="container">
              <div className="add-content">
                  <div className="input-wrapper">
                      <input type="text" placeholder="Search for a items..."
                          value={query}
                          onChange={onChange}
                      />
                  </div>
              </div>
          </div>
      </div>
  )
}
