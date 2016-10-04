import React, { Component } from 'react';
import request from 'superagent';

export default class Login extends Component {


  constructor() {
    super();
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.redirectToDashboard = this.redirectToDashboard.bind(this);
    this.setAuthenticationToken = this.setAuthenticationToken.bind(this);
    this.state = {
      token: ''
    }
  }


  componentDidMount() {

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1516688595023754',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.7'
      });
    }
  }


  loginWithFacebook(event) {
    event.preventDefault();
    FB.login(function(response){
      if (response.status === 'connected') {
        var fbAccessToken = response.authResponse.accessToken;
        this.getUserUsername(fbAccessToken)
        this.setAuthenticationToken(fbAccessToken);
      }
    }.bind(this));
    }

    setAuthenticationToken (fbAccessToken) {
      request
       .post('api/v1/auth/convert-token/')
       .type('form')
       .send({grant_type: 'convert_token',
            token: fbAccessToken,
            client_id: 'wiDWuTqTgnf0wsHWhmyw9unnjQIpMFwg1BHS180x',
            client_secret: '66SdZQV0aVZFl6WRQO0o6SO0mhNaJP1x7bjDmv8qscUbbs50aHxSAwfwkLROK17a9zDlufZQuN5cR4rjJX1zP2j816fhr0ZgPzGET63JTJm9lALW4M8Ma9DrRNWyO1xf',
            backend: 'facebook'
          })
       .end((err, result) => {
         console.log(result)
        if (result.status == 200) {
          localStorage.setItem('token', result.body.access_token);
          localStorage.setItem('isAuthenticated', true)
          return this.redirectToDashboard()
          }
       });
    }

  redirectToDashboard() {
    this.context.router.push('dashboard')
  }

  getUserUsername(fbAccessToken) {
    request
     .get('https://graph.facebook.com/v2.7/1234977009885803/?access_token=1516688595023754|zCeQIjzrRPA_xhTNKv8iUW3ilbo')
     .type('form')
     .end((err, result) => {
       if (result.status === 200) {
         localStorage.setItem('username', result.body.name)
       }
     });
  }
  render() {
    return (
      <div id="facebook-login">
        <a onClick={this.loginWithFacebook} className="btn btn-primary">
            Login with Facebook
        </a>
      </div>
    );
  }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};
