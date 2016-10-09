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
        this.getUserUsername(response.authResponse.userID)
        this.setAuthenticationToken(response.authResponse.accessToken);
      }
    }.bind(this));
    }

    setAuthenticationToken (fbAccessToken) {
      console.log(fbAccessToken);
      request
       .post('api/v1/auth/convert-token/')
       .send({grant_type: 'convert_token',
            token: fbAccessToken,
            client_id: 'H4LvS3PFO119U8R0k650NlIjhnsAWfhfyrykyjPE',
            client_secret: 'dlfkqHwGaPw4Flqjl7QinphcTlpi1svS8237mFY64ljs3piYZp9xiYHSMJyZjAHSLpgAiyTmSrfrzMDuyuCZjXVtkwUEurfhSS0EcieHnkr26OErTZegVWMlXGfRMjEB',
            backend: 'facebook'
          })
       .end((err, result) => {
        if (result.status == 200) {
          localStorage.setItem('token', result.body.access_token);
          localStorage.setItem('isAuthenticated', true);
          return this.redirectToDashboard();
          }
       });
    }

  redirectToDashboard() {
    this.context.router.push('dashboard/folders')
  }

  getUserUsername(userID) {
    request
     .get('https://graph.facebook.com/v2.7/'+userID+'/?access_token=1516688595023754|zCeQIjzrRPA_xhTNKv8iUW3ilbo')
     .end((err, result) => {
       if (result.status === 200) {
         localStorage.setItem('username', result.body.name)
       }
     });
  }
  render() {
    return (
      <div id="facebook-login">
        <div className="app-caption">
        Upload, Edit and Share your photos
        </div>
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
