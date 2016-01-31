
/**
* A title screen
**/
game.TitleScreen = me.ScreenObject.extend({
    // reset function
    onResetEvent: function() {
        // title screen
        me.game.world.addChild(
            new me.Sprite(
                0,0, {
                    image: me.loader.getImage('title_screen')
                }
            ),
            1
        );

        // add a new renderable component with the scrolling text
        me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init : function() {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
                // font for the scrolling text
                this.font = new me.BitmapFont("32x32_font", 32);
                this.font.set("center");
            },

            update : function (dt) {
                return true;
            },

            draw : function (renderer) {
                this.font.draw(renderer, "PRESS ENTER TO PLAY", me.video.renderer.getWidth() / 2, 350);
            },

            onDestroyEvent : function() {
            }
        })), 2);

        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
                // play something on tap / enter
                // this will unlock audio on mobile devices
                me.audio.play("cling");
                me.state.change(me.state.PLAY);
            }
        });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.mouse.LEFT);
        me.event.unsubscribe(this.handler);
   }
});
