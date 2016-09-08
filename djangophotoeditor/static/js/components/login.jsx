import React from 'react';

const Login = () => {
  return (
    <div id="facebook-login">
      <a href="/login/facebook/?next=/" className="btn btn-primary">
          Login with Facebook
        </a>
    </div>
  );
}

module.exports = Login;
