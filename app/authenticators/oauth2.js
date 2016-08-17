import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'web/config/environment';


// export default OAuth2PasswordGrant.extend();
export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: ENV['ember-simple-auth'].serverTokenEndpoint
});
