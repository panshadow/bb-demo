(function(window, undefined){

  var AppScreens = Backbone.Model.extend({
    defaults: {
      current: null
    },
    initialize : function(){
      var self = this;
      self.screens = new ScreenList();
      self.hscreens = {}

      self.el = $('#screenlist');

      self.bind('change:current',function(mod,curr){
        if( curr == null || curr in self.hscreens ){
          var prev = mod.previous('current');
          if( prev in self.hscreens ){
            var prevScreen = self.hscreens[ prev ];
            self.screens.at(prevScreen).set('active',false);
          }

          if( curr !== null ){
            var nextScreen = self.hscreens[curr];
            self.screens.at(nextScreen).set('active',true);
          }
        }
      });

      self.screens.bind('add',function(screen){
        var screenName = screen.get('name');
        var screenView = new ScreenView({ model: screen, id: screenName+'-screen' });

        $(self.el).append( screenView.render().el );
        $(self.el).addClass('extended');
        self.hscreens[ screenName ] = self.screens.indexOf(screen);

        screen.on('change:active',function(mod,act){
          var current = self.get('current');
          var modName = mod.get('name');

          if(act){
            self.set('current',modName);
          }
          else{
            if( modName == current ){
              self.set('current',null);
            }
          }
        })
      });
    },

    validate: function(attribute){
      var self = this;
      if( !( attribute.current == null || attribute.current in self.hscreens ) ) {
        return 'screen not found';
      }
    },

    addScreen: function(scr){
      this.screens.add(scr);
    },

    switchTo: function(name){
      this.set('current',name);
    }
  });



  var ScreenModel = Backbone.Model.extend({
    defaults: {
      name : null,
      active: false
    },
  });

  var ScreenView = Backbone.View.extend({
    tagName: 'li',
    className: 'screen',

    initialize : function(){
      var self = this;
      self.model.on('change:active',function(mod,act){
        if( act ){
          $(self.el)
            .css({'z-index': 100,'opacity':'0'})
            .addClass('active')
            .animate({'opacity':'1'},'slow',function(){ $(this).css({'z-index':0}); });
        }
        else{
          $(self.el)
            .css({'opacity':1})
            .animate({'opacity':0},'slow',function(){
              $(this).removeClass('active');
            });
        }
      })

      self.template = _.template( $('#'+self.model.get('template')).html() );
    },

    render : function(){
      this.el.innerHTML = this.template(this.model.get('getContext')() );

      return this;
    }
  })

  var ScreenList = Backbone.Collection.extend({
    model: ScreenModel,

  })

  window.AppScreens = AppScreens;
})(this);