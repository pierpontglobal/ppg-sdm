import React from 'react';

let searchBox = null;

function search(e) {
  if (e.key === 'Enter') {
    window.location.href = `/marketplace?q=${searchBox.value}`;
  }
}

function SearchInput({ defaultValue }) {
  return (


    <div style={{
      display: 'flex', flexGrow: 3, flexDirection: 'row',
    }}
    >
      <div style={{
        height: '41px',
        width: '41px',
        backgroundColor: '#FFFFF',
        fontSize: '16px',
        textAlign: 'center',
        lineHeight: '41px',
        fontWeight: 900,
        borderRadius: '5px 0 0 5px',
        borderTop: 'rgba(0,0,0,0.54) solid 1px',
        borderBottom: 'rgba(0,0,0,0.54) solid 1px',
        borderLeft: 'rgba(0,0,0,0.54) solid 1px',
      }}
      >
        <i
          style={{
            fontSize: '16px',
            textAlign: 'center',
            lineHeight: '41px',
            fontWeight: 900,
            color: 'rgba(0,0,0,0.54)',
          }}
          className="fas fa-search"
        />
      </div>
      <input
        style={{
          backgroundColor: '#FFFFFF',
          textAlign: 'left',
          border: 0,
          width: '100%',
          borderTop: 'rgba(0,0,0,0.54) solid 1px',
          borderBottom: 'rgba(0,0,0,0.54) solid 1px',
          borderRight: 'rgba(0,0,0,0.54) solid 1px',
          color: 'rgba(0,0,0,0.54)',
        }}
        className="input-single-amount"
        placeholder="Search"
        type="text"
        defaultValue={defaultValue}
        ref={(node) => { searchBox = node; }}
        onKeyPress={search}
      />
    </div>

  );
}

export default SearchInput;
