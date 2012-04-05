(function(window,undefined){

  var App = Backbone.Router.extend({
    routes : {
      ''      : 'index',
      'club/:name/' : 'club'
    },

    initialize: function(){
      var self = this;

      self.appScreens = new AppScreens();

      self.appScreens.addScreen({
        name: 'index',
        template: 'tpl-index-screen',
        getContext : function(){
          return { 'caption':'My Favorite Football Clubs' }
        }
      })

      self.appScreens.addScreen({
        name: 'fcdk',
        template: 'tpl-club-screen',
        getContext: function(){
          return {
            name: 'FC Dynamo Kyiv',
            emblem: './img/fcdk.png',
            info: 'FC Dynamo Kyiv (Ukrainian: ФК «Динамо» Київ) is a professional football club based in the Ukrainian capital city of Kyiv. Founded in 1927, the club currently participates in the Ukrainian Premier League and has spent its entire history in the top league of Soviet and later Ukrainian football. Dynamo Kyiv has won thirteen league titles, nine Ukrainian Cups, one UEFA Super Cup and two UEFA Cup Winners Cups, and played three times in the semi-final of the UEFA Champions League.'
          }
        }
      })

      self.appScreens.addScreen({
        name: 'fcok',
        template: 'tpl-club-screen',
        getContext: function(){
          return {
            name: 'FC Obolon Kyiv',
            emblem: './img/fcok.png',
            info: 'FC Obolon Kyiv is a Ukrainian professional football club based in Kiev (Obolon Raion). It plays home matches at Obolon Arena. Its home colors are green shirts and white shorts; while its away uniforms are white shirts and green shorts. They also have an all yellow kit as backup. Its main sponsor has been the brewery Obolon since 1999.'
          }
        }
      })

      self.appScreens.addScreen({
        name: 'acm',
        template: 'tpl-club-screen',
        getContext: function(){
          return {
            name: 'AC Milan',
            emblem: './img/acm.png',
            info: 'Associazione Calcio Milan, commonly referred to as A.C. Milan or simply Milan (Italian pronunciation: [ˈmiːlan]), is a professional Italian football club based in Milan, Lombardy, that plays in the Serie A. Milan was founded in 1899 by English lace-maker Herbert Kilpin and businessman Alfred Edwards among others.[2][6] The club has spent its entire history, with the exception of the 1980–81 and 1982-83 seasons, in the top-flight of Italian football, known as Serie A since 1929-30.[2]'
          }
        }
      })
    },

    index : function(){
      this.appScreens.switchTo('index');
    },

    club : function(name){
      this.appScreens.switchTo(name);
    }
  });


  $(function(){
    var app = new App();
    Backbone.history.start();
  });

})(this);