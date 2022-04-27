const passport = require("passport")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

let GOOGLE_CLIENT_ID = '322467529196-nauon1l4c9of3omau8ptbigsgpn8r13r.apps.googleusercontent.com'
let GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3200/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    
    return done(null, profile);//This is what happens when someone successfully loggedin               
  }
));

passport.serializeUser((user, done)=>{
    done(null, user);
})


passport.deserializeUser((user, done)=>{
    done(null, user);
})
