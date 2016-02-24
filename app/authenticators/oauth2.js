import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'web/config/environment';

// console.log(ENV);

// export default OAuth2PasswordGrant.extend();
export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: ENV['ember-simple-auth'].serverTokenEndpoint
});
// export default OAuth2PasswordGrant.extend({ serverTokenEndpoint: 'http://localhost:3000' });
