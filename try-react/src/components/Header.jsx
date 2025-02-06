/* eslint-disable react/prop-types */
function Header({ name }) {
    return (
        <h1>Hello {name ? name : 'Fauzan'}</h1>
    );
  }

  export default Header