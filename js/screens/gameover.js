game.GameOverScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.audio.stopTrack();
        
        me.game.world.addChild(new me.ColorLayer("background", "#000000", 0));
        
        // add a new renderable component with the scrolling text
        me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init : function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
                this.font = new me.Font("This Night", 96, "#920606", "center");
                debugger;
                //~ var tween = new me.Tween(font.).to({y: 200}, 3000).onComplete(myFunc);
                //~ tween.easing(me.Tween.Easing.Bounce.Out);
                //~ tween.start();
            },

            update : function (dt) {
                return true;
            },

            draw : function (renderer) {
                this.font.draw(renderer, "LOOSER", me.video.renderer.getWidth() / 2, 250);
            },

            onDestroyEvent : function() {
            }
        })), 2);
        
        me.audio.play("looser");
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
    }
});
